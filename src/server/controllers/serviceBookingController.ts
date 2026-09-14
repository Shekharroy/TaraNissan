import { Request, Response, NextFunction } from 'express';
import { serviceBookingService } from '../services/serviceBookingService.ts';

export class ServiceBookingController {
  async book(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        fullName,
        phone,
        email,
        vehicleModel,
        registrationNumber,
        serviceType,
        dealershipLocation,
        dealershipCity,
        appointmentDate,
        timeSlot,
        pickupDropRequired,
        remarks,
      } = req.body;

      const result = await serviceBookingService.bookServiceAppointment({
        fullName,
        phone,
        email,
        vehicleModel,
        registrationNumber,
        serviceType,
        dealershipLocation,
        dealershipCity,
        appointmentDate,
        timeSlot,
        pickupDropRequired,
        remarks,
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
      const booking = await serviceBookingService.getBookingByRef(ref);
      res.status(200).json({
        success: true,
        data: booking,
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
      const bookings = await serviceBookingService.getBookingsByPhone(String(phone));
      res.status(200).json({
        success: true,
        data: bookings,
      });
    } catch (err) {
      next(err);
    }
  }
}

export const serviceBookingController = new ServiceBookingController();
