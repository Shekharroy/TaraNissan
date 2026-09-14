import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/authService.ts';
import { AuthenticatedRequest } from '../middleware/authMiddleware.ts';

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, fullName, email, phone, phoneNumber, password, role, city, pincode, preferredVehicle } = req.body;
      const result = await authService.register({
        name: (fullName || name || '').trim(),
        email,
        phone: (phoneNumber || phone || '').trim(),
        password,
        role,
        city,
        pincode,
        preferredVehicle,
      });

      res.status(201).json({
        success: true,
        message: 'Account created successfully! Welcome to Tara Nissan Privileges.',
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { identifier, password } = req.body;
      const result = await authService.login({ identifier, password });

      res.status(200).json({
        success: true,
        message: 'Signed in successfully.',
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  async demoSwitch(req: Request, res: Response, next: NextFunction) {
    try {
      const { role } = req.body; // 'customer' | 'sales_advisor' | 'service_manager' | 'admin'
      const result = await authService.demoSwitch(role);
      res.status(200).json({
        success: true,
        message: `Switched session to ${result.user.role} role.`,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  async getCurrentUser(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user?.userId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }
      const user = await authService.getCurrentUser(req.user.userId);
      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (err) {
      next(err);
    }
  }
}

export const authController = new AuthController();
