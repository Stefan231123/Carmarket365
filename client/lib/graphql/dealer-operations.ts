// client/lib/graphql/dealer-operations.ts
import { gql } from '@apollo/client';

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

// Query to get dealer's own listings
export const GET_DEALER_LISTINGS = gql`
  query GetDealerListings($status: String, $searchTerm: String) {
    getDealerListings(status: $status, searchTerm: $searchTerm) {
      id
      title
      price
      status
      imageUrls
      year
      mileage
      createdAt
      updatedAt
      carMake {
        id
        name
      }
      carModel {
        id
        name
      }
    }
  }
`;

// Query to get dealer dashboard stats
export const GET_DEALER_STATS = gql`
  query GetDealerStats {
    getDealerStats {
      activeListings
      totalViews
      totalInquiries
      revenue
      newInquiriesThisWeek
      viewsThisMonth
      responseRate
    }
  }
`;

// Query to get dealer performance metrics
export const GET_DEALER_PERFORMANCE = gql`
  query GetDealerPerformance {
    getDealerPerformance {
      salesThisMonth
      salesLastMonth
      averageTimeToSell
      conversionRate
      averageListingViews
      averageResponseTime
    }
  }
`;

// Query to get dealer's inquiries
export const GET_DEALER_INQUIRIES = gql`
  query GetDealerInquiries {
    getDealerInquiries {
      id
      type
      message
      customerName
      customerEmail
      customerPhone
      status
      dealerResponse
      respondedAt
      createdAt
      car {
        id
        title
        carMake {
          name
        }
        carModel {
          name
        }
      }
      customer {
        id
        name
        email
      }
    }
  }
`;

// Query to get recent inquiries for overview
export const GET_RECENT_DEALER_INQUIRIES = gql`
  query GetRecentDealerInquiries($limit: Int) {
    getRecentDealerInquiries(limit: $limit) {
      id
      type
      message
      customerName
      customerEmail
      status
      createdAt
      car {
        id
        title
        carMake {
          name
        }
        carModel {
          name
        }
      }
      customer {
        name
        email
      }
    }
  }
`;

// Query to get popular listings for analytics
export const GET_DEALER_POPULAR_LISTINGS = gql`
  query GetDealerPopularListings($limit: Int) {
    getDealerPopularListings(limit: $limit) {
      id
      title
      price
      status
      imageUrls
      carMake {
        name
      }
      carModel {
        name
      }
    }
  }
`;

// Query to get express sale opportunities
export const GET_EXPRESS_SALE_OPPORTUNITIES = gql`
  query GetExpressSaleOpportunities {
    getExpressSaleOpportunities {
      id
      vehicleDescription
      details
      askingPrice
      location
      imageUrls
      status
      createdAt
      seller {
        id
        name
        email
      }
      interestedDealers {
        id
        dealerName
        email
      }
    }
  }
`;

// Mutation to update inquiry status
export const UPDATE_INQUIRY_STATUS = gql`
  mutation UpdateInquiryStatus($id: String!, $updateData: UpdateInquiryStatusInput!) {
    updateInquiryStatus(id: $id, updateData: $updateData) {
      id
      status
      dealerResponse
      respondedAt
    }
  }
`;

// Mutation to create a new inquiry
export const CREATE_CAR_INQUIRY = gql`
  mutation CreateCarInquiry($createCarInquiryInput: CreateCarInquiryInput!) {
    createCarInquiry(createCarInquiryInput: $createCarInquiryInput) {
      id
      type
      message
      status
      createdAt
    }
  }
`;