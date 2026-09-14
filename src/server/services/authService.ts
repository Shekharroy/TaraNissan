import bcrypt from 'bcryptjs';
import { UserModel, IUser } from '../models/User.ts';
import { inMemoryDB, InMemoryUser } from '../db/inMemoryStore.ts';
import { isDbConnected } from '../db/connection.ts';
import { generateToken, AuthUserPayload } from '../middleware/authMiddleware.ts';

export interface RegisterDTO {
  name: string;
  fullName?: string;
  email: string;
  phone: string;
  phoneNumber?: string;
  password: string;
  role?: 'customer' | 'sales_advisor' | 'service_manager' | 'admin';
  city?: string;
  pincode?: string;
  preferredVehicle?: string;
}

export interface LoginDTO {
  identifier: string; // email or phone
  password: string;
}

export class AuthService {
  async register(data: RegisterDTO) {
    const emailLower = data.email.toLowerCase().trim();
    const phoneTrim = (data.phoneNumber || data.phone).trim();
    const displayName = (data.fullName || data.name).trim();
    const userRole = data.role || 'customer';
    const userCity = data.city || 'Motihari';
    const userPincode = data.pincode || '845402';

    if (isDbConnected()) {
      const existingUser = await UserModel.findOne({
        $or: [{ email: emailLower }, { phone: phoneTrim }, { phoneNumber: phoneTrim }],
      });

      if (existingUser) {
        throw { statusCode: 409, message: 'A user with this email or phone number is already registered.' };
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.password, salt);

      const newUser = await UserModel.create({
        fullName: displayName,
        name: displayName,
        email: emailLower,
        phoneNumber: phoneTrim,
        phone: phoneTrim,
        passwordHash: hashedPassword,
        password: hashedPassword,
        city: userCity,
        pincode: userPincode,
        preferredVehicle: data.preferredVehicle || 'Tekton',
        role: userRole,
        isVerified: true,
      });

      const tokenPayload: AuthUserPayload = {
        userId: newUser._id.toString(),
        email: newUser.email,
        role: newUser.role,
        name: newUser.fullName || newUser.name,
      };

      const token = generateToken(tokenPayload);

      return {
        user: {
          id: newUser._id.toString(),
          name: newUser.name,
          fullName: newUser.fullName,
          email: newUser.email,
          phone: newUser.phone,
          phoneNumber: newUser.phoneNumber,
          city: newUser.city,
          pincode: newUser.pincode,
          preferredVehicle: newUser.preferredVehicle,
          role: newUser.role,
        },
        token,
      };
    } else {
      // Fallback in-memory
      const existing = inMemoryDB.users.find(
        (u) => u.email.toLowerCase() === emailLower || u.phone === phoneTrim || u.phoneNumber === phoneTrim
      );

      if (existing) {
        throw { statusCode: 409, message: 'A user with this email or phone number is already registered.' };
      }

      const passwordHash = await bcrypt.hash(data.password, 10);
      const newUser: InMemoryUser = {
        id: `usr_${Date.now()}`,
        name: displayName,
        fullName: displayName,
        email: emailLower,
        phone: phoneTrim,
        phoneNumber: phoneTrim,
        passwordHash,
        city: userCity,
        pincode: userPincode,
        preferredVehicle: data.preferredVehicle || 'Tekton',
        role: userRole,
        isVerified: true,
        createdAt: new Date().toISOString(),
      };

      inMemoryDB.users.push(newUser);

      const tokenPayload: AuthUserPayload = {
        userId: newUser.id,
        email: newUser.email,
        role: newUser.role,
        name: newUser.name,
      };

      const token = generateToken(tokenPayload);

      return {
        user: {
          id: newUser.id,
          name: newUser.name,
          fullName: newUser.fullName,
          email: newUser.email,
          phone: newUser.phone,
          phoneNumber: newUser.phoneNumber,
          city: newUser.city,
          pincode: newUser.pincode,
          preferredVehicle: newUser.preferredVehicle,
          role: newUser.role,
        },
        token,
      };
    }
  }

  async login(data: LoginDTO) {
    const identLower = data.identifier.toLowerCase().trim();

    if (isDbConnected()) {
      const user = await UserModel.findOne({
        $or: [{ email: identLower }, { phone: data.identifier.trim() }, { phoneNumber: data.identifier.trim() }],
      });

      if (!user) {
        throw { statusCode: 401, message: 'Invalid credentials. User profile not found.' };
      }

      const isMatch = await bcrypt.compare(data.password, user.passwordHash || user.password || '');
      if (!isMatch) {
        throw { statusCode: 401, message: 'Invalid password. Please verify and try again.' };
      }

      const tokenPayload: AuthUserPayload = {
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
        name: user.fullName || user.name,
      };

      const token = generateToken(tokenPayload);

      return {
        user: {
          id: user._id.toString(),
          name: user.name || user.fullName,
          fullName: user.fullName || user.name,
          email: user.email,
          phone: user.phone || user.phoneNumber,
          phoneNumber: user.phoneNumber || user.phone,
          city: user.city,
          pincode: user.pincode,
          preferredVehicle: user.preferredVehicle,
          role: user.role,
        },
        token,
      };
    } else {
      // In-memory lookup
      const user = inMemoryDB.users.find(
        (u) =>
          u.email.toLowerCase() === identLower ||
          u.phone === data.identifier.trim() ||
          u.phoneNumber === data.identifier.trim()
      );

      if (!user) {
        throw { statusCode: 401, message: 'Invalid credentials. User profile not found.' };
      }

      const isMatch = await bcrypt.compare(data.password, user.passwordHash);
      if (!isMatch) {
        throw { statusCode: 401, message: 'Invalid password. Please verify and try again.' };
      }

      const tokenPayload: AuthUserPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      };

      const token = generateToken(tokenPayload);

      return {
        user: {
          id: user.id,
          name: user.name,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          phoneNumber: user.phoneNumber,
          city: user.city,
          pincode: user.pincode,
          preferredVehicle: user.preferredVehicle,
          role: user.role,
        },
        token,
      };
    }
  }

  async demoSwitch(targetRole: 'customer' | 'sales_advisor' | 'service_manager' | 'admin') {
    const roleToFind = targetRole || 'customer';
    const demoUser = inMemoryDB.users.find((u) => u.role === roleToFind) || inMemoryDB.users[0];

    const tokenPayload: AuthUserPayload = {
      userId: demoUser.id,
      email: demoUser.email,
      role: demoUser.role,
      name: demoUser.fullName || demoUser.name,
    };

    const token = generateToken(tokenPayload);

    return {
      user: {
        id: demoUser.id,
        name: demoUser.name,
        fullName: demoUser.fullName,
        email: demoUser.email,
        phone: demoUser.phone,
        phoneNumber: demoUser.phoneNumber,
        city: demoUser.city,
        pincode: demoUser.pincode,
        preferredVehicle: demoUser.preferredVehicle,
        role: demoUser.role,
      },
      token,
    };
  }

  async getCurrentUser(userId: string) {
    if (isDbConnected()) {
      const user = await UserModel.findById(userId).select('-password');
      if (!user) {
        throw { statusCode: 404, message: 'User not found.' };
      }
      return user;
    } else {
      const user = inMemoryDB.users.find((u) => u.id === userId);
      if (!user) {
        throw { statusCode: 404, message: 'User not found.' };
      }
      const { passwordHash, ...rest } = user;
      return rest;
    }
  }
}

export const authService = new AuthService();
