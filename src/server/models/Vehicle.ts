import mongoose, { Schema, Document } from 'mongoose';

export interface IVehicleVariant {
  grade: string;
  price: number;
  transmission: string;
}

export interface IVehicle extends Document {
  modelId?: string;
  modelCode: string;
  name: string;
  tagline: string;
  badge?: string;
  category: 'SUV' | 'Compact SUV' | 'Flagship SUV' | 'Concept' | 'Sedan';
  startingPrice: number;
  topPrice?: number;
  onRoadPriceEstimateMotihari?: number;
  priceDisplay: string;
  emiDisplay: string;
  fuelType: string;
  fuelTypes?: string[];
  mileage: string;
  transmission: string;
  transmissions?: string[];
  engine: string;
  power: string;
  groundClearance: string;
  safetyRating: string;
  heroBanner: string;
  brochureUrl?: string;
  keyFeatures: string[];
  features?: string[];
  variants?: IVehicleVariant[];
  colors: Array<{ name: string; hex: string }>;
  isAvailable: boolean;
  isAvailableInShowroom?: boolean;
  dealershipLocation?: string;
  stockCount: number;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const VehicleSchema = new Schema<IVehicle>(
  {
    modelId: { type: String, trim: true },
    modelCode: { type: String, required: true, unique: true, uppercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    tagline: { type: String, default: 'Innovation that Excites' },
    badge: { type: String },
    category: { type: String, required: true, enum: ['SUV', 'Compact SUV', 'Flagship SUV', 'Concept', 'Sedan'], default: 'SUV' },
    startingPrice: { type: Number, required: true },
    topPrice: { type: Number },
    onRoadPriceEstimateMotihari: { type: Number },
    priceDisplay: { type: String, required: true },
    emiDisplay: { type: String, default: 'EMI starts ₹8,999/mo*' },
    fuelType: { type: String, default: 'Petrol' },
    fuelTypes: [{ type: String }],
    mileage: { type: String, default: '19.35 kmpl' },
    transmission: { type: String, default: 'Manual / CVT' },
    transmissions: [{ type: String }],
    engine: { type: String, default: '1.0L Turbo / 1.0L Naturally Aspirated' },
    power: { type: String, default: '100 PS' },
    groundClearance: { type: String, default: '205 mm' },
    safetyRating: { type: String, default: '5-Star ASEAN NCAP' },
    heroBanner: { type: String, required: true },
    brochureUrl: { type: String },
    keyFeatures: [{ type: String }],
    features: [{ type: String }],
    variants: [
      {
        grade: { type: String, required: true },
        price: { type: Number, required: true },
        transmission: { type: String, required: true },
      },
    ],
    colors: [
      {
        name: { type: String },
        hex: { type: String },
      },
    ],
    isAvailable: { type: Boolean, default: true },
    isAvailableInShowroom: { type: Boolean, default: true },
    dealershipLocation: { type: String, default: 'Bankat NH28, Motihari' },
    stockCount: { type: Number, default: 5 },
    featured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    collection: 'vehicles',
  }
);

// Compound indexing on vehicle model code & availability, plus category & starting price
VehicleSchema.index({ modelCode: 1, isAvailable: 1 });
VehicleSchema.index({ category: 1, startingPrice: 1 });
VehicleSchema.index({ featured: 1, isAvailable: 1 });

export const VehicleModel: mongoose.Model<IVehicle> = (mongoose.models.Vehicle as mongoose.Model<IVehicle>) || mongoose.model<IVehicle>('Vehicle', VehicleSchema);
