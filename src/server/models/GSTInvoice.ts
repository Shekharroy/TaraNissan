import mongoose, { Schema, Document } from 'mongoose';

export interface IGSTInvoice extends Document {
  invoiceNumber: string;
  invoiceDate: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
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
  compensationCessRate?: number;
  compensationCessAmount?: number;
  roadTaxRTO: number;
  fastagInsurance: number;
  totalInvoiceValue: number;
  paymentStatus: 'PAID' | 'PROFORMA_ISSUED' | 'BOOKING_DEPOSIT_PAID';
  pdfDownloadUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const GSTInvoiceSchema = new Schema<IGSTInvoice>(
  {
    invoiceNumber: { type: String, required: true, unique: true, uppercase: true },
    invoiceDate: { type: String, required: true },
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    customerEmail: { type: String },
    customerAddress: { type: String, default: 'Motihari, East Champaran, Bihar - 845401' },
    vehicleModel: { type: String, required: true },
    vehicleVariant: { type: String, required: true },
    chassisNumber: { type: String, required: true },
    engineNumber: { type: String, required: true },
    hsnCode: { type: String, default: '8703' },
    dealershipGstin: { type: String, default: '10AAACT7829M1ZQ' },
    dealershipAddress: {
      type: String,
      default: 'Tara Nissan Authorized Dealership, NH28 Bankat, Bapudham Motihari, Bihar - 845402',
    },
    exShowroomAmount: { type: Number, required: true },
    cgstRate: { type: Number, default: 14 },
    cgstAmount: { type: Number, required: true },
    sgstRate: { type: Number, default: 14 },
    sgstAmount: { type: Number, required: true },
    compensationCessRate: { type: Number, default: 1 },
    compensationCessAmount: { type: Number, default: 0 },
    roadTaxRTO: { type: Number, required: true },
    fastagInsurance: { type: Number, required: true },
    totalInvoiceValue: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ['PAID', 'PROFORMA_ISSUED', 'BOOKING_DEPOSIT_PAID'],
      default: 'PROFORMA_ISSUED',
    },
    pdfDownloadUrl: { type: String },
  },
  {
    timestamps: true,
    collection: 'gst_invoices',
  }
);

GSTInvoiceSchema.index({ customerPhone: 1, invoiceDate: -1 });
GSTInvoiceSchema.index({ invoiceNumber: 1 });

export const GSTInvoiceModel: mongoose.Model<IGSTInvoice> =
  (mongoose.models.GSTInvoice as mongoose.Model<IGSTInvoice>) ||
  mongoose.model<IGSTInvoice>('GSTInvoice', GSTInvoiceSchema);
