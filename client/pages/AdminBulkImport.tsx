import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Upload, CheckCircle2, AlertCircle, AlertTriangle,
  Loader2, FileSpreadsheet, Users, Car, X, Download,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// ── Types matching backend response ──────────────────────────────────────────

interface NormalizedCar {
  make: string; model: string; year: number; price: number; mileage: number;
  fuelType: string; transmission: string; vehicleType: string; location: string;
  sellerEmail: string; sellerName?: string; features: string[]; safetyFeatures: string[];
  imageUrls: string[]; color?: string; description?: string;
}

interface ParsedRow {
  rowNum: number;
  status: 'ok' | 'warning' | 'error';
  warnings: string[];
  errors: string[];
  normalized: NormalizedCar | null;
}

interface ImportPreview {
  total: number;
  rows: ParsedRow[];
  stats: { ok: number; warnings: number; errors: number; newUsers: number };
}

interface ImportResult {
  created: number; skipped: number; newUsers: number; errors: string[];
}

// ── Column reference shown in the UI ─────────────────────────────────────────

const REQUIRED_COLS = ['make', 'model', 'year', 'price', 'mileage', 'fuelType', 'transmission', 'location', 'seller_email'];
const OPTIONAL_COLS = [
  'vehicleType', 'condition', 'color', 'engineSize', 'horsePower', 'doors', 'seats',
  'drivetrain', 'variant', 'vin', 'description', 'features', 'safetyFeatures',
  'image_urls', 'priceNegotiable', 'previousOwners', 'hadAccident',
  'contactPhone', 'seller_name', 'seller_phone',
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function AdminBulkImport() {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const token = localStorage.getItem('authToken');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<ImportPreview | null>(null);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const baseUrl = import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL.replace('/graphql', '')
    : (import.meta.env.DEV ? 'http://localhost:3002' : '');

  async function callEndpoint(endpoint: string): Promise<any> {
    if (!file) return;
    const form = new FormData();
    form.append('file', file);
    const res = await fetch(`${baseUrl}/api/admin/bulk-import/${endpoint}`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      credentials: 'include',
      body: form,
    });
    if (!res.ok) {
      const text = await res.text();
      let msg = text;
      try { msg = JSON.parse(text).message ?? text; } catch {}
      throw new Error(msg);
    }
    return res.json();
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    setPreview(null);
    setResult(null);
    setError('');
  };

  const handlePreview = async () => {
    if (!file) return;
    setLoading(true); setError(''); setPreview(null); setResult(null);
    try {
      const data = await callEndpoint('preview');
      setPreview(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExecute = async () => {
    if (!file || !preview) return;
    setLoading(true); setError('');
    try {
      const data = await callEndpoint('execute');
      setResult(data);
      setPreview(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null); setPreview(null); setResult(null); setError('');
    if (fileRef.current) fileRef.current.value = '';
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/admin')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Bulk Import Listings</h1>
            <p className="text-sm text-muted-foreground">Upload an Excel file to mass-create car listings</p>
          </div>
        </div>

        {/* Column reference */}
        <Card>
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                <FileSpreadsheet className="h-4 w-4" />
                Required Excel columns
              </CardTitle>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="shrink-0"
              onClick={() => {
                const url = `${baseUrl}/api/admin/bulk-import/template`;
                const a = document.createElement('a');
                a.href = url;
                a.download = 'bulk-import-template.xlsx';
                // Send auth header via fetch, then create blob URL
                fetch(url, {
                  headers: token ? { Authorization: `Bearer ${token}` } : {},
                  credentials: 'include',
                }).then(r => r.blob()).then(blob => {
                  a.href = URL.createObjectURL(blob);
                  a.click();
                  URL.revokeObjectURL(a.href);
                });
              }}
            >
              <Download className="h-4 w-4 mr-2" />
              Download Template
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Required</p>
              <div className="flex flex-wrap gap-1.5">
                {REQUIRED_COLS.map(c => (
                  <Badge key={c} variant="default" className="font-mono text-xs">{c}</Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Optional</p>
              <div className="flex flex-wrap gap-1.5">
                {OPTIONAL_COLS.map(c => (
                  <Badge key={c} variant="secondary" className="font-mono text-xs">{c}</Badge>
                ))}
              </div>
            </div>
            <div className="text-xs text-muted-foreground space-y-0.5 pt-1">
              <p>• <strong>features</strong> / <strong>safetyFeatures</strong>: comma-separated (e.g. <code>Air Conditioning, Bluetooth</code>)</p>
              <p>• <strong>image_urls</strong>: comma-separated full URLs</p>
              <p>• <strong>fuelType</strong>: diesel / benzin / electric / hybrid / lpg (aliases accepted)</p>
              <p>• <strong>transmission</strong>: manual / automatic / dsg / cvt</p>
              <p>• <strong>vehicleType</strong>: sedan / hatchback / kombi / suv / van / coupe / cabrio</p>
              <p>• <strong>seller_email</strong>: existing users get the listing; new emails get an activation invite</p>
            </div>
          </CardContent>
        </Card>

        {/* Upload area */}
        <Card>
          <CardContent className="pt-6">
            <div
              className="border-2 border-dashed border-muted-foreground/30 rounded-2xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => fileRef.current?.click()}
            >
              {file ? (
                <div className="flex items-center justify-center gap-3">
                  <FileSpreadsheet className="h-6 w-6 text-primary" />
                  <span className="font-medium">{file.name}</span>
                  <span className="text-sm text-muted-foreground">({(file.size / 1024).toFixed(1)} KB)</span>
                  <button
                    className="ml-2 text-muted-foreground hover:text-foreground"
                    onClick={e => { e.stopPropagation(); handleReset(); }}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
                  <p className="font-medium">Click to select Excel file</p>
                  <p className="text-sm text-muted-foreground mt-1">.xlsx, .xls or .csv — max 10 MB</p>
                </>
              )}
              <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv" className="hidden" onChange={handleFileChange} />
            </div>

            {error && (
              <div className="mt-4 flex items-start gap-2 p-3 rounded-xl bg-destructive/10 text-destructive text-sm">
                <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {file && !preview && !result && (
              <Button className="mt-4 w-full" onClick={handlePreview} disabled={loading}>
                {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Parsing file...</> : 'Preview Import'}
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Preview results */}
        {preview && (
          <>
            {/* Stats bar */}
            <div className="grid grid-cols-4 gap-3">
              <Card>
                <CardContent className="pt-4 pb-4 text-center">
                  <p className="text-2xl font-bold">{preview.total}</p>
                  <p className="text-xs text-muted-foreground">Total rows</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4 pb-4 text-center">
                  <p className="text-2xl font-bold text-green-600">{preview.stats.ok}</p>
                  <p className="text-xs text-muted-foreground">Ready</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4 pb-4 text-center">
                  <p className="text-2xl font-bold text-yellow-600">{preview.stats.warnings}</p>
                  <p className="text-xs text-muted-foreground">Warnings</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4 pb-4 text-center">
                  <p className="text-2xl font-bold text-red-600">{preview.stats.errors}</p>
                  <p className="text-xs text-muted-foreground">Errors (skipped)</p>
                </CardContent>
              </Card>
            </div>

            {preview.stats.newUsers > 0 && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-sm">
                <Users className="h-4 w-4 shrink-0" />
                <span><strong>{preview.stats.newUsers}</strong> new seller accounts will be created and sent activation emails.</span>
              </div>
            )}

            {/* Row table */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Row preview</CardTitle>
                <CardDescription>Click a row to see details. Rows with errors will be skipped.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b">
                      <tr className="text-xs text-muted-foreground">
                        <th className="text-left px-4 py-2 w-12">#</th>
                        <th className="text-left px-4 py-2">Make / Model</th>
                        <th className="text-left px-4 py-2">Year</th>
                        <th className="text-left px-4 py-2">Price</th>
                        <th className="text-left px-4 py-2">Seller</th>
                        <th className="text-left px-4 py-2">Images</th>
                        <th className="text-left px-4 py-2 w-20">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {preview.rows.map(row => (
                        <>
                          <tr
                            key={row.rowNum}
                            className="border-b hover:bg-muted/50 cursor-pointer"
                            onClick={() => setExpandedRow(expandedRow === row.rowNum ? null : row.rowNum)}
                          >
                            <td className="px-4 py-2 text-muted-foreground">{row.rowNum}</td>
                            <td className="px-4 py-2 font-medium">
                              {row.normalized ? `${row.normalized.make} ${row.normalized.model}` : '—'}
                            </td>
                            <td className="px-4 py-2">{row.normalized?.year ?? '—'}</td>
                            <td className="px-4 py-2">{row.normalized ? `€${row.normalized.price.toLocaleString()}` : '—'}</td>
                            <td className="px-4 py-2 text-muted-foreground text-xs">{row.normalized?.sellerEmail ?? '—'}</td>
                            <td className="px-4 py-2">{row.normalized?.imageUrls.length ?? 0}</td>
                            <td className="px-4 py-2">
                              {row.status === 'ok' && <Badge variant="outline" className="text-green-600 border-green-300 text-xs">OK</Badge>}
                              {row.status === 'warning' && <Badge variant="outline" className="text-yellow-600 border-yellow-300 text-xs">Warn</Badge>}
                              {row.status === 'error' && <Badge variant="destructive" className="text-xs">Error</Badge>}
                            </td>
                          </tr>
                          {expandedRow === row.rowNum && (row.warnings.length > 0 || row.errors.length > 0) && (
                            <tr key={`${row.rowNum}-detail`} className="bg-muted/30">
                              <td colSpan={7} className="px-4 py-3">
                                {row.errors.map((e, i) => (
                                  <div key={i} className="flex items-start gap-2 text-xs text-red-600 mb-1">
                                    <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" /> {e}
                                  </div>
                                ))}
                                {row.warnings.map((w, i) => (
                                  <div key={i} className="flex items-start gap-2 text-xs text-yellow-600 mb-1">
                                    <AlertTriangle className="h-3.5 w-3.5 mt-0.5 shrink-0" /> {w}
                                  </div>
                                ))}
                              </td>
                            </tr>
                          )}
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Action buttons */}
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleReset} disabled={loading}>
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={handleExecute}
                disabled={loading || preview.stats.ok + preview.stats.warnings === 0}
              >
                {loading
                  ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Importing...</>
                  : `Import ${preview.stats.ok + preview.stats.warnings} listing${preview.stats.ok + preview.stats.warnings !== 1 ? 's' : ''}`
                }
              </Button>
            </div>
          </>
        )}

        {/* Final result */}
        {result && (
          <Card className="border-green-200 dark:border-green-800">
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-lg font-semibold">Import complete</p>
                  <p className="text-sm text-muted-foreground">
                    {result.created} listing{result.created !== 1 ? 's' : ''} created
                    {result.skipped > 0 ? `, ${result.skipped} skipped` : ''}
                    {result.newUsers > 0 ? `, ${result.newUsers} activation email${result.newUsers !== 1 ? 's' : ''} sent` : ''}
                  </p>
                </div>
              </div>

              {result.errors.length > 0 && (
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Skipped rows</p>
                  <div className="max-h-40 overflow-y-auto space-y-1">
                    {result.errors.map((e, i) => (
                      <div key={i} className="text-xs text-red-600 flex items-start gap-1.5">
                        <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" /> {e}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Button variant="outline" onClick={handleReset}>Import another file</Button>
                <Button onClick={() => navigate('/admin')}>
                  <Car className="h-4 w-4 mr-2" />Back to Admin
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
