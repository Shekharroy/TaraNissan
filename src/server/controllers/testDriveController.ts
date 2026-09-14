import { Request, Response, NextFunction } from 'express';
import { testDriveService } from '../services/testDriveService.ts';

export class TestDriveController {
  async book(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        vehicleModel,
        vehicleModelCode,
        fullName,
        phone,
        email,
        dealership,
        dealershipCity,
        bookingDate,
        timeSlot,
        locationType,
        address,
        notes,
      } = req.body;

      const result = await testDriveService.bookTestDrive({
        vehicleModel,
        vehicleModelCode,
        fullName,
        phone,
        email,
        dealership,
        dealershipCity,
        bookingDate,
        timeSlot,
        locationType,
        address,
        notes,
      });

      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }

  async getByRef(req: Request, res: Response, next: NextFunction) {
    try {
      const { ref } = req.params;
      const testDrive = await testDriveService.getTestDriveByRef(ref);
      res.status(200).json({
        success: true,
        data: testDrive,
      });
    } catch (err) {
      next(err);
    }
  }

  async getByPhone(req: Request, res: Response, next: NextFunction) {
    try {
      const { phone } = req.query;
      if (!phone) {
        res.status(400).json({ success: false, message: 'Phone query parameter is required.' });
        return;
      }
      const bookings = await testDriveService.getTestDrivesByPhone(String(phone));
      res.status(200).json({
        success: true,
        data: bookings,
      });
    } catch (err) {
      next(err);
    }
  }
}

export const testDriveController = new TestDriveController();
