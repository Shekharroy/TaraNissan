import mongoose, { Schema, Document } from 'mongoose';

export interface ISavedConfiguration extends Document {
  userId?: string;
  customerPhone?: string;
  customerEmail?: string;
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
  savedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const SavedConfigurationSchema = new Schema<ISavedConfiguration>(
  {
    userId: { type: String },
    customerPhone: { type: String, trim: true },
    customerEmail: { type: String, trim: true, lowercase: true },
    vehicleModelId: { type: String, required: true },
    vehicleName: { type: String, required: true },
    variantGrade: { type: String, required: true },
    transmission: { type: String, required: true },
    fuelType: { type: String, required: true },
    colorName: { type: String, required: true },
    colorHex: { type: String, required: true },
    exShowroomPrice: { type: Number, required: true },
    onRoadPriceEstimateMotihari: { type: Number, required: true },
    monthlyEmiEstimate: { type: Number, required: true },
    selectedAccessories: [{ type: String }],
    savedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    collection: 'saved_configurations',
  }
);

SavedConfigurationSchema.index({ customerPhone: 1, createdAt: -1 });
SavedConfigurationSchema.index({ userId: 1, createdAt: -1 });

export const SavedConfigurationModel: mongoose.Model<ISavedConfiguration> =
  (mongoose.models.SavedConfiguration as mongoose.Model<ISavedConfiguration>) ||
  mongoose.model<ISavedConfiguration>('SavedConfiguration', SavedConfigurationSchema);
