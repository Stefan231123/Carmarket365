import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as XLSX from 'xlsx';
import { randomBytes } from 'crypto';
import * as bcrypt from 'bcryptjs';
import { Car, VehicleType, FuelType, TransmissionType, CarCondition, DrivetrainType } from '../cars/car.entity';
import { CarImage } from '../cars/car-image.entity';
import { User, UserRole } from '../users/user.entity';
import { EmailService } from '../common/email/email.service';
import { CAR_DATA } from '../shared/car-data';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface ParsedRow {
  rowNum: number;
  status: 'ok' | 'warning' | 'error';
  warnings: string[];
  errors: string[];
  normalized: NormalizedCar | null;
}

export interface NormalizedCar {
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: FuelType;
  transmission: TransmissionType;
  vehicleType: VehicleType;
  condition: CarCondition;
  location: string;
  sellerEmail: string;
  sellerName?: string;
  sellerPhone?: string;
  color?: string;
  engineSize?: number;
  horsePower?: number;
  doors?: number;
  seats?: number;
  drivetrain?: DrivetrainType;
  description?: string;
  features: string[];
  safetyFeatures: string[];
  imageUrls: string[];
  priceNegotiable?: boolean;
  previousOwners?: number;
  hadAccident?: string;
  variant?: string;
  vin?: string;
  contactPhone?: string;
}

export interface ImportPreview {
  total: number;
  rows: ParsedRow[];
  stats: { ok: number; warnings: number; errors: number; newUsers: number };
}

export interface ImportResult {
  created: number;
  skipped: number;
  newUsers: number;
  errors: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Fuzzy normalizer helpers
// ─────────────────────────────────────────────────────────────────────────────

function norm(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

function bestMatch(input: string, candidates: string[]): { value: string; distance: number } {
  const normInput = norm(input);
  let best = { value: candidates[0], distance: Infinity };
  for (const c of candidates) {
    const d = levenshtein(normInput, norm(c));
    if (d < best.distance) best = { value: c, distance: d };
  }
  return best;
}

// ─────────────────────────────────────────────────────────────────────────────
// Enum mappers (handles common aliases/languages)
// ─────────────────────────────────────────────────────────────────────────────

const FUEL_MAP: Record<string, FuelType> = {
  diesel: FuelType.DIESEL, tdi: FuelType.DIESEL, tdci: FuelType.DIESEL, crd: FuelType.DIESEL,
  d: FuelType.DIESEL,
  benzin: FuelType.GASOLINE, petrol: FuelType.GASOLINE, gasoline: FuelType.GASOLINE,
  tsi: FuelType.GASOLINE, tfsi: FuelType.GASOLINE, gdi: FuelType.GASOLINE, mpi: FuelType.GASOLINE,
  bensin: FuelType.GASOLINE, benzine: FuelType.GASOLINE,
  electric: FuelType.ELECTRIC, elektrik: FuelType.ELECTRIC, ev: FuelType.ELECTRIC, bev: FuelType.ELECTRIC,
  elektriko: FuelType.ELECTRIC,
  hybrid: FuelType.HYBRID, hev: FuelType.HYBRID, hibrid: FuelType.HYBRID,
  pluginhybrid: FuelType.PLUGIN_HYBRID, phev: FuelType.PLUGIN_HYBRID, pluginhev: FuelType.PLUGIN_HYBRID,
  lpg: FuelType.LPG, gas: FuelType.LPG, autogas: FuelType.LPG,
  cng: FuelType.CNG, naturalgas: FuelType.CNG, erdgas: FuelType.CNG,
};

const TRANSMISSION_MAP: Record<string, TransmissionType> = {
  manual: TransmissionType.MANUAL, mechanic: TransmissionType.MANUAL, mechanik: TransmissionType.MANUAL,
  mt: TransmissionType.MANUAL, hand: TransmissionType.MANUAL, rucni: TransmissionType.MANUAL,
  '5speed': TransmissionType.MANUAL, '6speed': TransmissionType.MANUAL,
  automatic: TransmissionType.AUTOMATIC, auto: TransmissionType.AUTOMATIC,
  automatik: TransmissionType.AUTOMATIC, automat: TransmissionType.AUTOMATIC,
  dsg: TransmissionType.AUTOMATIC, tiptronic: TransmissionType.AUTOMATIC,
  cvt: TransmissionType.CVT, at: TransmissionType.AUTOMATIC,
  semiautomatik: TransmissionType.SEMI_AUTOMATIC, semiautomatic: TransmissionType.SEMI_AUTOMATIC,
  dct: TransmissionType.SEMI_AUTOMATIC,
};

const VEHICLE_TYPE_MAP: Record<string, VehicleType> = {
  sedan: VehicleType.SEDAN, limuzina: VehicleType.SEDAN, limousine: VehicleType.SEDAN, saloon: VehicleType.SEDAN,
  hatchback: VehicleType.HATCHBACK, hetch: VehicleType.HATCHBACK, hb: VehicleType.HATCHBACK,
  kombi: VehicleType.WAGON, wagon: VehicleType.WAGON, estate: VehicleType.WAGON, touring: VehicleType.WAGON,
  variant: VehicleType.WAGON, sw: VehicleType.WAGON,
  suv: VehicleType.SUV, crossover: VehicleType.SUV, '4x4': VehicleType.SUV, jeep: VehicleType.SUV,
  van: VehicleType.VAN, minivan: VehicleType.VAN, mpv: VehicleType.VAN, minibus: VehicleType.VAN,
  coupe: VehicleType.COUPE, kupe: VehicleType.COUPE,
  convertible: VehicleType.CONVERTIBLE, cabrio: VehicleType.CONVERTIBLE, kabriolet: VehicleType.CONVERTIBLE,
  roadster: VehicleType.CONVERTIBLE, spider: VehicleType.CONVERTIBLE, cabriolet: VehicleType.CONVERTIBLE,
  motorcycle: VehicleType.MOTORCYCLE, motocikl: VehicleType.MOTORCYCLE, moto: VehicleType.MOTORCYCLE,
  truck: VehicleType.TRUCK, kamion: VehicleType.TRUCK, tovornjak: VehicleType.TRUCK,
  car: VehicleType.CAR, auto: VehicleType.CAR, automobil: VehicleType.CAR,
};

const DRIVETRAIN_MAP: Record<string, DrivetrainType> = {
  fwd: DrivetrainType.FWD, prednji: DrivetrainType.FWD, front: DrivetrainType.FWD, '2wd': DrivetrainType.FWD,
  ff: DrivetrainType.FWD,
  rwd: DrivetrainType.RWD, zadnji: DrivetrainType.RWD, rear: DrivetrainType.RWD, fr: DrivetrainType.RWD,
  awd: DrivetrainType.AWD, allwheel: DrivetrainType.AWD, xdrive: DrivetrainType.AWD,
  quattro: DrivetrainType.AWD, syncro: DrivetrainType.AWD, '4motion': DrivetrainType.AWD,
  '4wd': DrivetrainType.FOUR_WD, '4x4': DrivetrainType.FOUR_WD,
};

const CANONICAL_FEATURES = [
  'Air Conditioning', 'Leather Seats', 'Heated Seats', 'Sunroof', 'GPS Navigation',
  'Backup Camera', 'Bluetooth', 'USB Ports', 'Premium Sound System', 'Keyless Entry',
  'Remote Start', 'Cruise Control', 'Parking Sensors', 'Blind Spot Monitoring',
];

const CANONICAL_SAFETY = [
  'ABS', 'ESP/ESC', 'Driver Airbag', 'Passenger Airbag', 'Side Airbags',
  'Head/Curtain Airbags', 'Blind Spot Monitor', 'Lane Departure Warning',
  'Emergency Braking', 'Parking Sensors', 'Backup Camera', '360° Camera', 'Tire Pressure Monitor',
];

function mapFeatures(raw: string, canonical: string[]): string[] {
  if (!raw?.trim()) return [];
  return raw.split(',').map(f => f.trim()).filter(Boolean).map(f => {
    const match = bestMatch(f, canonical);
    // Accept match if distance ≤ 4 or ≤ 30% of length
    if (match.distance <= 4 || match.distance / canonical[0].length <= 0.3) {
      return match.value;
    }
    return f; // Keep as-is if no good match
  });
}

function cell(row: Record<string, any>, key: string): string {
  const val = row[key];
  if (val === undefined || val === null) return '';
  return String(val).trim();
}

function cellNum(row: Record<string, any>, key: string): number | undefined {
  const v = cell(row, key);
  if (!v) return undefined;
  const n = parseFloat(v.replace(/[^\d.]/g, ''));
  return isNaN(n) ? undefined : n;
}

// ─────────────────────────────────────────────────────────────────────────────
// Service
// ─────────────────────────────────────────────────────────────────────────────

@Injectable()
export class BulkImportService {
  private readonly logger = new Logger(BulkImportService.name);
  private readonly allMakes = CAR_DATA.map(d => d.name);
  private readonly frontendUrl = process.env.FRONTEND_URL || 'https://www.carmarket365.com';

  constructor(
    @InjectRepository(Car) private readonly carRepo: Repository<Car>,
    @InjectRepository(CarImage) private readonly imageRepo: Repository<CarImage>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly emailService: EmailService,
  ) {}

  // ── Parse Excel buffer → array of raw row objects ──────────────────────────

  parseExcel(buffer: Buffer): Record<string, any>[] {
    const wb = XLSX.read(buffer, { type: 'buffer' });
    const ws = wb.Sheets[wb.SheetNames[0]];
    return XLSX.utils.sheet_to_json(ws, { defval: '' });
  }

  // ── Normalize a single raw row ──────────────────────────────────────────────

  normalizeRow(row: Record<string, any>, rowNum: number): ParsedRow {
    const warnings: string[] = [];
    const errors: string[] = [];

    // ── Required fields ──────────────────────────────────────────────────────

    const rawMake = cell(row, 'make');
    const rawModel = cell(row, 'model');
    const rawYear = cell(row, 'year');
    const rawPrice = cell(row, 'price');
    const rawMileage = cell(row, 'mileage');
    const rawFuel = cell(row, 'fuelType');
    const rawTrans = cell(row, 'transmission');
    const rawLocation = cell(row, 'location');
    const sellerEmail = cell(row, 'seller_email').toLowerCase();

    if (!rawMake) errors.push('Missing required field: make');
    if (!rawModel) errors.push('Missing required field: model');
    if (!rawYear) errors.push('Missing required field: year');
    if (!rawPrice) errors.push('Missing required field: price');
    if (!rawMileage) errors.push('Missing required field: mileage');
    if (!rawFuel) errors.push('Missing required field: fuelType');
    if (!rawTrans) errors.push('Missing required field: transmission');
    if (!rawLocation) errors.push('Missing required field: location');
    if (!sellerEmail) errors.push('Missing required field: seller_email');

    if (errors.length > 0) {
      return { rowNum, status: 'error', warnings, errors, normalized: null };
    }

    // ── Make normalization ───────────────────────────────────────────────────

    let make: string;
    const makeMatch = bestMatch(rawMake, this.allMakes);
    if (makeMatch.distance === 0) {
      make = makeMatch.value;
    } else if (makeMatch.distance <= 3) {
      make = makeMatch.value;
      warnings.push(`Make "${rawMake}" matched to "${makeMatch.value}" (distance: ${makeMatch.distance})`);
    } else {
      // Keep original if no good match — might be a niche brand
      make = rawMake;
      warnings.push(`Make "${rawMake}" not found in reference data — stored as-is`);
    }

    // ── Model normalization ──────────────────────────────────────────────────

    let model: string;
    const makeData = CAR_DATA.find(d => d.name === make);
    if (makeData) {
      const modelMatch = bestMatch(rawModel, makeData.models);
      if (modelMatch.distance === 0) {
        model = modelMatch.value;
      } else if (modelMatch.distance <= 3) {
        model = modelMatch.value;
        warnings.push(`Model "${rawModel}" matched to "${modelMatch.value}" (distance: ${modelMatch.distance})`);
      } else {
        model = rawModel;
        warnings.push(`Model "${rawModel}" not found for ${make} — stored as-is`);
      }
    } else {
      model = rawModel;
    }

    // ── Year ─────────────────────────────────────────────────────────────────

    const year = parseInt(rawYear);
    if (isNaN(year) || year < 1950 || year > new Date().getFullYear() + 1) {
      errors.push(`Invalid year: "${rawYear}"`);
    }

    // ── Price ────────────────────────────────────────────────────────────────

    const price = parseFloat(rawPrice.replace(/[^\d.]/g, ''));
    if (isNaN(price) || price <= 0) {
      errors.push(`Invalid price: "${rawPrice}"`);
    }

    // ── Mileage ──────────────────────────────────────────────────────────────

    const mileage = parseInt(rawMileage.replace(/[^\d]/g, ''));
    if (isNaN(mileage) || mileage < 0) {
      errors.push(`Invalid mileage: "${rawMileage}"`);
    }

    if (errors.length > 0) {
      return { rowNum, status: 'error', warnings, errors, normalized: null };
    }

    // ── Fuel type ────────────────────────────────────────────────────────────

    const fuelType = FUEL_MAP[norm(rawFuel)] ?? FuelType.GASOLINE;
    if (!FUEL_MAP[norm(rawFuel)]) {
      warnings.push(`Unknown fuelType "${rawFuel}" — defaulted to GASOLINE`);
    }

    // ── Transmission ─────────────────────────────────────────────────────────

    const transmission = TRANSMISSION_MAP[norm(rawTrans)] ?? TransmissionType.MANUAL;
    if (!TRANSMISSION_MAP[norm(rawTrans)]) {
      warnings.push(`Unknown transmission "${rawTrans}" — defaulted to MANUAL`);
    }

    // ── Vehicle type ─────────────────────────────────────────────────────────

    const rawVehicleType = cell(row, 'vehicleType');
    const vehicleType = rawVehicleType ? (VEHICLE_TYPE_MAP[norm(rawVehicleType)] ?? VehicleType.CAR) : VehicleType.CAR;

    // ── Drivetrain ────────────────────────────────────────────────────────────

    const rawDrive = cell(row, 'drivetrain');
    const drivetrain = rawDrive ? DRIVETRAIN_MAP[norm(rawDrive)] : undefined;

    // ── Condition ─────────────────────────────────────────────────────────────

    const rawCond = cell(row, 'condition').toLowerCase();
    const condMap: Record<string, CarCondition> = {
      new: CarCondition.NEW, novo: CarCondition.NEW, nev: CarCondition.NEW,
      used: CarCondition.USED, polovan: CarCondition.USED, rabljenavto: CarCondition.USED,
      certified: CarCondition.CERTIFIED,
      damaged: CarCondition.DAMAGED, ostecen: CarCondition.DAMAGED,
    };
    const condition = condMap[norm(rawCond)] ?? CarCondition.USED;

    // ── Boolean helpers ───────────────────────────────────────────────────────

    function parseBool(v: string): boolean | undefined {
      if (!v) return undefined;
      return ['yes', 'true', '1', 'da', 'po'].includes(v.toLowerCase());
    }

    // ── Seller info ───────────────────────────────────────────────────────────

    const rawSellerName = cell(row, 'seller_name');
    const sellerPhone = cell(row, 'seller_phone') || undefined;

    // ── Images ────────────────────────────────────────────────────────────────

    const rawImages = cell(row, 'image_urls');
    const imageUrls = rawImages
      ? rawImages.split(',').map(u => u.trim()).filter(u => u.startsWith('http'))
      : [];

    // ── Features ──────────────────────────────────────────────────────────────

    const features = mapFeatures(cell(row, 'features'), CANONICAL_FEATURES);
    const safetyFeatures = mapFeatures(cell(row, 'safetyFeatures'), CANONICAL_SAFETY);

    // ── Build normalized ──────────────────────────────────────────────────────

    const normalized: NormalizedCar = {
      make, model, year, price, mileage, fuelType, transmission, vehicleType,
      condition, location: rawLocation, sellerEmail,
      sellerName: rawSellerName || undefined,
      sellerPhone,
      color: cell(row, 'color') || undefined,
      engineSize: cellNum(row, 'engineSize') ? Math.round(cellNum(row, 'engineSize')!) : undefined,
      horsePower: cellNum(row, 'horsePower') ? Math.round(cellNum(row, 'horsePower')!) : undefined,
      doors: cellNum(row, 'doors') ? Math.round(cellNum(row, 'doors')!) : undefined,
      seats: cellNum(row, 'seats') ? Math.round(cellNum(row, 'seats')!) : undefined,
      drivetrain,
      description: cell(row, 'description') || undefined,
      features, safetyFeatures, imageUrls,
      priceNegotiable: parseBool(cell(row, 'priceNegotiable')),
      previousOwners: cellNum(row, 'previousOwners') !== undefined ? Math.round(cellNum(row, 'previousOwners')!) : undefined,
      hadAccident: (() => {
        const v = cell(row, 'hadAccident').toLowerCase();
        if (['yes', 'da', '1', 'true'].includes(v)) return 'YES';
        if (['no', 'ne', '0', 'false'].includes(v)) return 'NO';
        if (v) return 'UNKNOWN';
        return undefined;
      })(),
      variant: cell(row, 'variant') || undefined,
      vin: cell(row, 'vin') || undefined,
      contactPhone: cell(row, 'contactPhone') || undefined,
    };

    return {
      rowNum,
      status: warnings.length > 0 ? 'warning' : 'ok',
      warnings, errors,
      normalized,
    };
  }

  // ── Preview (no DB writes) ────────────────────────────────────────────────

  async preview(buffer: Buffer): Promise<ImportPreview> {
    const rawRows = this.parseExcel(buffer);
    const rows = rawRows.map((row, i) => this.normalizeRow(row, i + 2)); // row 1 = header

    // Count how many emails don't exist yet
    const emails = [...new Set(
      rows.filter(r => r.normalized).map(r => r.normalized!.sellerEmail)
    )];
    const existingUsers = await this.userRepo.find({ where: emails.map(e => ({ email: e })) });
    const existingEmails = new Set(existingUsers.map(u => u.email));
    const newUsers = emails.filter(e => !existingEmails.has(e)).length;

    return {
      total: rows.length,
      rows,
      stats: {
        ok: rows.filter(r => r.status === 'ok').length,
        warnings: rows.filter(r => r.status === 'warning').length,
        errors: rows.filter(r => r.status === 'error').length,
        newUsers,
      },
    };
  }

  // ── Execute (writes to DB) ────────────────────────────────────────────────

  async execute(buffer: Buffer): Promise<ImportResult> {
    const rawRows = this.parseExcel(buffer);
    const rows = rawRows.map((row, i) => this.normalizeRow(row, i + 2));

    const result: ImportResult = { created: 0, skipped: 0, newUsers: 0, errors: [] };

    // Build a map of email → user (find existing + create new)
    const emails = [...new Set(rows.filter(r => r.normalized).map(r => r.normalized!.sellerEmail))];
    const userMap = new Map<string, User>();

    for (const email of emails) {
      let user = await this.userRepo.findOne({ where: { email } });
      if (!user) {
        user = await this.createActivationUser(email, rows.find(r => r.normalized?.sellerEmail === email)?.normalized);
        result.newUsers++;
      }
      userMap.set(email, user);
    }

    // Create listings
    for (const row of rows) {
      if (row.status === 'error' || !row.normalized) {
        result.skipped++;
        result.errors.push(`Row ${row.rowNum}: ${row.errors.join(', ')}`);
        continue;
      }

      const n = row.normalized;
      const seller = userMap.get(n.sellerEmail);
      if (!seller) { result.skipped++; continue; }

      const car = this.carRepo.create({
        make: n.make, model: n.model, year: n.year, price: n.price, mileage: n.mileage,
        fuelType: n.fuelType, transmission: n.transmission, vehicleType: n.vehicleType,
        condition: n.condition, location: n.location, city: n.location,
        sellerId: seller.id,
        color: n.color,
        engineSize: n.engineSize,
        horsePower: n.horsePower,
        doors: n.doors,
        seats: n.seats,
        drivetrain: n.drivetrain,
        description: n.description,
        features: n.features,
        safetyFeatures: n.safetyFeatures,
        priceNegotiable: n.priceNegotiable,
        previousOwners: n.previousOwners,
        hadAccident: n.hadAccident,
        variant: n.variant,
        vin: n.vin,
        contactPhone: n.contactPhone ?? n.sellerPhone,
        contactEmail: n.sellerEmail,
        isAvailable: true,
      });

      const savedCar = await this.carRepo.save(car);

      // Save images
      for (let i = 0; i < n.imageUrls.length; i++) {
        await this.imageRepo.save(this.imageRepo.create({
          carId: savedCar.id,
          url: n.imageUrls[i],
          thumbnailUrl: n.imageUrls[i],
          sortOrder: i,
          isMain: i === 0,
        }));
      }

      result.created++;
    }

    return result;
  }

  // ── Create an inactive user with activation token ─────────────────────────

  private async createActivationUser(email: string, n?: NormalizedCar): Promise<User> {
    const activationToken = randomBytes(32).toString('hex');
    const dummyPassword = await bcrypt.hash(randomBytes(16).toString('hex'), 10);

    const nameParts = n?.sellerName?.split(' ') ?? [];
    const firstName = nameParts[0] || undefined;
    const lastName = nameParts.slice(1).join(' ') || undefined;

    const user = this.userRepo.create({
      email,
      password: dummyPassword,
      firstName,
      lastName,
      phone: n?.sellerPhone,
      role: UserRole.USER,
      isActive: false,
      isEmailVerified: false,
      passwordResetToken: activationToken,
      passwordResetExpires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    });

    const saved = await this.userRepo.save(user);

    // Send activation email
    const activationUrl = `${this.frontendUrl}/activate?token=${activationToken}`;
    await this.emailService.sendEmail({
      to: email,
      subject: 'Your car listing has been posted — activate your account',
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2>Your listing is live on CarMarket365</h2>
          <p>Hello${firstName ? ` ${firstName}` : ''},</p>
          <p>A car listing has been posted on your behalf on <strong>CarMarket365</strong>.</p>
          <p>To manage your listings, view inquiries, and set your own password, please activate your account:</p>
          <p style="text-align:center;margin:32px 0">
            <a href="${activationUrl}" style="background:#2563eb;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600">
              Activate My Account
            </a>
          </p>
          <p style="color:#666;font-size:13px">This link expires in 30 days. If you did not expect this email, please ignore it.</p>
          <hr style="margin:24px 0;border:none;border-top:1px solid #eee"/>
          <p style="color:#999;font-size:12px">CarMarket365 — The region's leading car marketplace</p>
        </div>
      `,
    });

    this.logger.log(`Created activation account for ${email}`);
    return saved;
  }
}
