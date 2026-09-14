export interface CarModel {
  id: string;
  name: string;
  badge?: string;
  tagline: string;
  subTagline: string;
  category: 'suv' | 'compact-suv' | 'luxury-suv' | 'cng' | 'special-edition';
  priceDisplay: string;
  priceRaw: number; // in Lakhs
  cardImage: string; // directly from https://www.nissan.in/
  heroBanner: string; // directly from https://www.nissan.in/
  additionalImages?: string[];
  description: string;
  mileage: string;
  engine: string;
  power: string;
  safetyRating: string;
  groundClearance: string;
  seatingCapacity: string;
  transmission: string[];
  fuelTypes: string[];
  colors: {
    name: string;
    hex: string;
    code: string;
  }[];
  variants: {
    name: string;
    price: string;
    transmission: string;
    fuel: string;
    keyFeatures: string[];
  }[];
  keyHighlights: string[];
  brochureUrl?: string;
}

export interface HeroSlide {
  id: string;
  vehicleId: string;
  title: string;
  subtitle: string;
  priceNote?: string;
  desktopBanner: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface Dealer {
  id: string;
  name: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  email: string;
  timing: string;
  isServiceCenter: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  imageUrl: string;
}

export interface UserProfile {
  id: string;
  name: string;
  fullName?: string;
  email: string;
  phone: string;
  phoneNumber?: string;
  role: 'customer' | 'sales_advisor' | 'service_manager' | 'admin';
  city?: string;
  pincode?: string;
  preferredCar?: string;
  isVerified?: boolean;
}

export interface CustomerTestDrive {
  id: string;
  bookingReference: string;
  bookingRef?: string;
  customerName: string;
  customerPhone: string;
  vehicleModel: string;
  vehicleModelCode?: string;
  preferredDate: string;
  driveType: string;
  pickupAddress?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  assignedAdvisor: string;
  dealershipLocation?: string;
  createdAt: string;
}

export interface CustomerServiceBooking {
  id: string;
  bookingRef: string;
  customerName: string;
  customerPhone: string;
  vehicleModel: string;
  registrationNumber: string;
  serviceType: string;
  dealershipLocation: string;
  appointmentDate: string;
  timeSlot: string;
  status: 'scheduled' | 'vehicle_inspected' | 'work_in_progress' | 'quality_checked' | 'ready_for_delivery' | 'delivered';
  currentStage: number; // 1 to 6
  estimatedDelivery?: string;
  assignedAdvisor?: string;
  createdAt: string;
}

export interface SavedCarConfiguration {
  id: string;
  userId?: string;
  vehicleModelId: string;
  vehicleName: string;
  variantGrade: string;
  transmission: string;
  fuelType: string;
  colorName: string;
  colorHex: string;
  exShowroomPrice: number;
  onRoadPriceEstimateMotihari: number;
  monthlyEmiEstimate: number;
  selectedAccessories?: string[];
  savedAt: string;
}

export interface GSTInvoice {
  id: string;
  invoiceNumber: string;
  invoiceDate: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  vehicleModel: string;
  vehicleVariant: string;
  chassisNumber: string;
  engineNumber: string;
  hsnCode: string; // 8703
  dealershipGstin: string; // 10AAACT7829M1ZQ
  dealershipAddress: string;
  exShowroomAmount: number;
  cgstRate: number; // 14%
  cgstAmount: number;
  sgstRate: number; // 14%
  sgstAmount: number;
  compensationCessRate?: number; // 1% or 3%
  compensationCessAmount?: number;
  roadTaxRTO: number;
  fastagInsurance: number;
  totalInvoiceValue: number;
  paymentStatus: 'PAID' | 'PROFORMA_ISSUED' | 'BOOKING_DEPOSIT_PAID';
  pdfDownloadUrl?: string;
}

export interface InboundLead {
  id: string;
  leadType: 'direct_call' | 'whatsapp_inquiry' | 'test_drive' | 'brochure_download' | 'emi_inquiry' | 'quote_request';
  name?: string;
  phone?: string;
  email?: string;
  vehicleModel?: string;
  vehicleModelCode?: string;
  city?: string;
  dealerBranch?: string;
  message?: string;
  status: 'new' | 'contacted' | 'test_drive_scheduled' | 'quote_sent' | 'closed';
  assignedAdvisor?: string;
  createdAt: string;
}

