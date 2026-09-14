import mongoose, { Schema, Document } from 'mongoose';

export interface IServiceAppointment extends Document {
  bookingRef: string;
  fullName: string;
  phone: string;
  email?: string;
  vehicleModel: string;
  registrationNumber: string;
  serviceType: 'periodic_maintenance' | 'general_repair' | 'ac_service' | 'express_wash' | 'body_paint';
  dealershipLocation: string;
  dealershipCity: string;
  appointmentDate: string;
  timeSlot: string;
  pickupDropRequired: boolean;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  estimatedCost?: number;
  remarks?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceAppointmentSchema = new Schema<IServiceAppointment>(
  {
    bookingRef: { type: String, required: true, unique: true, uppercase: true },
    fullName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    vehicleModel: { type: String, required: true },
    registrationNumber: { type: String, required: true, uppercase: true, trim: true },
    serviceType: {
      type: String,
      enum: ['periodic_maintenance', 'general_repair', 'ac_service', 'express_wash', 'body_paint'],
      default: 'periodic_maintenance',
    },
    dealershipLocation: { type: String, default: 'Tara Nissan Authorized Workshop, NH28 Motihari' },
    dealershipCity: { type: String, default: 'Motihari' },
    appointmentDate: { type: String, required: true },
    timeSlot: { type: String, required: true },
    pickupDropRequired: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ['scheduled', 'in_progress', 'completed', 'cancelled'],
      default: 'scheduled',
    },
    estimatedCost: { type: Number },
    remarks: { type: String },
  },
  {
    timestamps: true,
    collection: 'service_bookings',
  }
);

// Compound indexing on phone and status, and appointmentDate + timeSlot
ServiceAppointmentSchema.index({ phone: 1, status: 1 });
ServiceAppointmentSchema.index({ appointmentDate: 1, timeSlot: 1 });
ServiceAppointmentSchema.index({ registrationNumber: 1, status: 1 });

export const ServiceAppointmentModel: mongoose.Model<IServiceAppointment> =
  (mongoose.models.ServiceAppointment as mongoose.Model<IServiceAppointment>) ||
  mongoose.model<IServiceAppointment>('ServiceAppointment', ServiceAppointmentSchema);
