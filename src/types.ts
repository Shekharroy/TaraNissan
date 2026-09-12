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
  email: string;
  phone: string;
  city?: string;
  preferredCar?: string;
}

