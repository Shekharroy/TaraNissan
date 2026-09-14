import mongoose, { Schema, Document } from 'mongoose';

export interface ITestDrive extends Document {
  bookingRef: string;
  bookingReference?: string;
  vehicleModel: string;
  vehicleModelCode?: string;
  fullName: string;
  customerName?: string;
  phone: string;
  customerPhone?: string;
  email: string;
  dealership: string;
  dealershipCity: string;
  bookingDate: string;
  preferredDate?: string;
  timeSlot: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  locationType: 'showroom' | 'doorstep';
  driveType?: string;
  address?: string;
  pickupAddress?: string;
  assignedSalesperson?: string;
  assignedAdvisor?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TestDriveSchema = new Schema<ITestDrive>(
  {
    bookingRef: { type: String, required: true, unique: true, uppercase: true },
    bookingReference: { type: String, uppercase: true },
    vehicleModel: { type: String, required: true },
    vehicleModelCode: { type: String },
    fullName: { type: String, required: true, trim: true },
    customerName: { type: String, trim: true },
    phone: { type: String, required: true, trim: true },
    customerPhone: { type: String, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    dealership: { type: String, default: 'Bankat NH28, Motihari' },
    dealershipCity: { type: String, default: 'Motihari' },
    bookingDate: { type: String, required: true },
    preferredDate: { type: String },
    timeSlot: { type: String, default: '10:30 AM' },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'confirmed',
    },
    locationType: {
      type: String,
      enum: ['showroom', 'doorstep'],
      default: 'showroom',
    },
    driveType: { type: String, default: 'Showroom Visit (Bankat NH28)' },
    address: { type: String },
    pickupAddress: { type: String },
    assignedSalesperson: { type: String, default: 'Sanjay Singh (Tara Nissan Sales Team)' },
    assignedAdvisor: { type: String, default: 'Sanjay Singh (Tara Nissan Sales Team)' },
    notes: { type: String },
  },
  {
    timestamps: true,
    collection: 'test_drives',
  }
);

// Compound indexing for fast retrieval by phone + status, and vehicle + booking date
TestDriveSchema.index({ phone: 1, status: 1 });
TestDriveSchema.index({ customerPhone: 1, status: 1 });
TestDriveSchema.index({ vehicleModel: 1, bookingDate: 1 });
TestDriveSchema.index({ assignedAdvisor: 1, status: 1 });
TestDriveSchema.index({ dealershipCity: 1, status: 1 });
TestDriveSchema.index({ createdAt: -1 });

export const TestDriveModel: mongoose.Model<ITestDrive> = (mongoose.models.TestDrive as mongoose.Model<ITestDrive>) || mongoose.model<ITestDrive>('TestDrive', TestDriveSchema);
