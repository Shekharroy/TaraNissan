import mongoose, { Schema, Document } from 'mongoose';

export type LeadType = 
  | 'direct_call'
  | 'whatsapp_inquiry'
  | 'test_drive'
  | 'brochure_download'
  | 'emi_inquiry'
  | 'quote_request';

export interface ILead extends Document {
  leadType: LeadType;
  phone?: string;
  name?: string;
  email?: string;
  vehicleModel?: string;
  vehicleModelCode?: string;
  city?: string;
  dealerBranch?: string;
  sourceUrl?: string;
  referrer?: string;
  ipAddress?: string;
  userAgent?: string;
  message?: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'dropped';
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    leadType: {
      type: String,
      required: true,
      enum: ['direct_call', 'whatsapp_inquiry', 'test_drive', 'brochure_download', 'emi_inquiry', 'quote_request'],
      default: 'direct_call',
    },
    phone: { type: String, trim: true },
    name: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    vehicleModel: { type: String },
    vehicleModelCode: { type: String },
    city: { type: String, default: 'Motihari' },
    dealerBranch: { type: String, default: 'Tara Nissan Motihari (NH28)' },
    sourceUrl: { type: String },
    referrer: { type: String },
    ipAddress: { type: String },
    userAgent: { type: String },
    message: { type: String },
    status: {
      type: String,
      enum: ['new', 'contacted', 'qualified', 'converted', 'dropped'],
      default: 'new',
    },
    metadata: { type: Schema.Types.Mixed, default: {} },
  },
  {
    timestamps: true,
    collection: 'leads',
  }
);

// Compound indexing on query fields
LeadSchema.index({ phone: 1, leadType: 1 });
LeadSchema.index({ createdAt: -1, status: 1 });
LeadSchema.index({ leadType: 1, createdAt: -1 });

export const LeadModel: mongoose.Model<ILead> = (mongoose.models.Lead as mongoose.Model<ILead>) || mongoose.model<ILead>('Lead', LeadSchema);
