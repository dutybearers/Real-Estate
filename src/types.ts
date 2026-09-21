export interface Property {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  priceFormatted: string;
  location: string;
  neighborhood: string;
  city: string;
  stateOrCountry: string;
  coordinates: [number, number]; // [lat, lng]
  propertyType: 'Architectural Villa' | 'Penthouse Suite' | 'Waterfront Estate' | 'Historic Brownstone' | 'Modern Compound' | 'Chalet';
  status: 'For Sale' | 'Exclusive Off-Market' | 'Private Treaty' | 'Pending Sale';
  beds: number;
  baths: number;
  sqft: number;
  lotSize?: string;
  yearBuilt: number;
  architect?: string;
  description: string;
  curatorNote: string;
  images: string[];
  amenities: string[];
  features: {
    label: string;
    value: string;
  }[];
  floorPlanUrl?: string;
  isFeatured?: boolean;
  hoaMonthly?: number;
  propertyTaxAnnual?: number;
}

export interface Neighborhood {
  id: string;
  name: string;
  region: string;
  description: string;
  image: string;
  averagePrice: string;
  propertyCount: number;
  coordinates: [number, number];
}

export interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  clientTitle: string;
  location: string;
  transaction: string;
  year: string;
  avatar: string;
}

export interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  icon: string;
}

export interface FilterState {
  searchQuery: string;
  propertyType: string;
  location: string;
  minPrice: number;
  maxPrice: number;
  beds: number | 'any';
  status: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'sqft-desc';
}

export interface LeadSubmission {
  id: string;
  type: 'contact' | 'tour' | 'valuation' | 'private-register';
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  preferredContact?: 'email' | 'phone' | 'whatsapp';
  timeframe?: string;
  budget?: string;
  propertyId?: string;
  propertyTitle?: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
  propertyDetails?: {
    address: string;
    propertyType: string;
    sqft: number;
    estimatedValue: number;
  };
  status: 'New' | 'Contacted' | 'Private Tour Scheduled' | 'Report Sent';
}
