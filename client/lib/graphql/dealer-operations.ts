// client/lib/graphql/dealer-operations.ts
// Types for dealer dashboard data

export interface DealerStats {
  activeListings: number;
  totalViews: number;
  totalInquiries: number;
  revenue: number;
  newInquiriesThisWeek: number;
  viewsThisMonth: number;
  responseRate: number;
}

export interface DealerPerformance {
  salesThisMonth: number;
  salesLastMonth: number;
  averageTimeToSell: number;
  conversionRate: number;
  averageListingViews: number;
  averageResponseTime: number;
}

export interface CarListing {
  id: string;
  title: string;
  price: number;
  status: 'ACTIVE' | 'PENDING_APPROVAL' | 'SOLD' | 'DRAFT';
  imageUrls: string[];
  year: number;
  mileage: number;
  createdAt: string;
  updatedAt: string;
  carMake: {
    id: string;
    name: string;
  };
  carModel: {
    id: string;
    name: string;
  };
}

export interface CarInquiry {
  id: string;
  type: 'VIEWING' | 'PRICE' | 'FINANCING' | 'TEST_DRIVE' | 'GENERAL';
  message: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  status: 'NEW' | 'RESPONDED' | 'CLOSED';
  dealerResponse?: string;
  respondedAt?: string;
  createdAt: string;
  car: {
    id: string;
    title: string;
    carMake: {
      name: string;
    };
    carModel: {
      name: string;
    };
  };
  customer?: {
    id: string;
    name?: string;
    email: string;
  };
}

export interface ExpressSaleListing {
  id: string;
  vehicleDescription: string;
  details: string;
  askingPrice?: number;
  location: string;
  imageUrls: string[];
  status: 'ACTIVE' | 'SOLD' | 'CLOSED';
  createdAt: string;
  seller: {
    id: string;
    name?: string;
    email: string;
  };
  interestedDealers: Array<{
    id: string;
    dealerName?: string;
    email: string;
  }>;
}
