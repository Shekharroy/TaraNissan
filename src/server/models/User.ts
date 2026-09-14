import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  fullName: string;
  name?: string;
  email: string;
  phoneNumber: string;
  phone?: string;
  passwordHash: string;
  password?: string;
  role: 'customer' | 'sales_advisor' | 'service_manager' | 'admin';
  pincode: string;
  city: string;
  preferredVehicle?: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    fullName: { type: String, required: true, trim: true },
    name: { type: String, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phoneNumber: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    passwordHash: { type: String, required: true },
    password: { type: String },
    role: {
      type: String,
      enum: ['customer', 'sales_advisor', 'service_manager', 'admin'],
      default: 'customer',
    },
    pincode: { type: String, default: '845402' },
    city: { type: String, default: 'Motihari' },
    preferredVehicle: { type: String, default: 'Tekton' },
    isVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    collection: 'users',
  }
);

// Compound indexing on phone, email, and role
UserSchema.index({ phoneNumber: 1, email: 1 });
UserSchema.index({ phone: 1, email: 1 });
UserSchema.index({ role: 1, createdAt: -1 });

export const UserModel: mongoose.Model<IUser> = (mongoose.models.User as mongoose.Model<IUser>) || mongoose.model<IUser>('User', UserSchema);
