import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware.ts';
import { inMemoryDB } from '../db/inMemoryStore.ts';
import { isDbConnected } from '../db/connection.ts';
import { SavedConfigurationModel } from '../models/SavedConfiguration.ts';
import { GSTInvoiceModel } from '../models/GSTInvoice.ts';
import { TestDriveModel } from '../models/TestDrive.ts';
import { ServiceAppointmentModel } from '../models/ServiceAppointment.ts';

export class CustomerController {
  async getDashboard(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      const userPhone = req.query.phone?.toString() || (user as any)?.phone || (user as any)?.phoneNumber || '9876543210';
      const userId = user?.userId || 'usr_demo_customer';

      if (isDbConnected()) {
        const [testDrives, serviceBookings, configurations, invoices] = await Promise.all([
          TestDriveModel.find({ $or: [{ phone: userPhone }, { customerPhone: userPhone }] }).sort({ createdAt: -1 }),
          ServiceAppointmentModel.find({ $or: [{ phone: userPhone }, { customerPhone: userPhone }] }).sort({ createdAt: -1 }),
          SavedConfigurationModel.find({ $or: [{ userId }, { customerPhone: userPhone }] }).sort({ createdAt: -1 }),
          GSTInvoiceModel.find({ customerPhone: userPhone }).sort({ invoiceDate: -1 }),
        ]);

        res.status(200).json({
          success: true,
          data: {
            user: {
              name: user?.name || 'Vikram Mehta',
              phone: userPhone,
              email: user?.email || 'vikram.mehta@taranissan.in',
            },
            testDrives,
            serviceBookings,
            configurations,
            invoices,
          },
        });
      } else {
        // In-Memory store
        const testDrives = inMemoryDB.testDrives.filter(
          (td) => td.phone === userPhone || td.customerPhone === userPhone || !userPhone
        );
        const serviceBookings = inMemoryDB.serviceAppointments.filter(
          (sb) => sb.phone === userPhone || sb.customerPhone === userPhone || !userPhone
        );
        const configurations = inMemoryDB.savedConfigurations.filter(
          (cfg) => cfg.customerPhone === userPhone || cfg.userId === userId || !userPhone
        );
        const invoices = inMemoryDB.invoices.filter(
          (inv) => inv.customerPhone === userPhone || !userPhone
        );

        res.status(200).json({
          success: true,
          data: {
            user: {
              name: user?.name || 'Vikram Mehta',
              phone: userPhone,
              email: user?.email || 'vikram.mehta@taranissan.in',
            },
            testDrives,
            serviceBookings,
            configurations,
            invoices,
          },
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async saveConfiguration(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const {
        vehicleModelId,
        vehicleName,
        variantGrade,
        transmission,
        fuelType,
        colorName,
        colorHex,
        exShowroomPrice,
        onRoadPriceEstimateMotihari,
        monthlyEmiEstimate,
        selectedAccessories,
        customerPhone,
      } = req.body;

      const userId = req.user?.userId || 'usr_demo_customer';
      const phone = customerPhone || (req.user as any)?.phone || '9876543210';

      const configData = {
        userId,
        customerPhone: phone,
        vehicleModelId: vehicleModelId || 'nissan-tekton',
        vehicleName: vehicleName || 'All-New Nissan Tekton',
        variantGrade: variantGrade || 'T760 Premium CVT',
        transmission: transmission || 'CVT Automatic',
        fuelType: fuelType || '1.0L Turbo Petrol',
        colorName: colorName || 'Flare Garnet Red',
        colorHex: colorHex || '#b31b26',
        exShowroomPrice: Number(exShowroomPrice) || 1499000,
        onRoadPriceEstimateMotihari: Number(onRoadPriceEstimateMotihari) || 1685000,
        monthlyEmiEstimate: Number(monthlyEmiEstimate) || 17499,
        selectedAccessories: selectedAccessories || ['Illuminated Scuff Plates'],
        savedAt: new Date().toISOString(),
      };

      if (isDbConnected()) {
        const created = await SavedConfigurationModel.create(configData);
        res.status(201).json({
          success: true,
          message: 'Vehicle configuration saved to your Tara Nissan Garage.',
          data: created,
        });
      } else {
        const newRecord = {
          id: `cfg_${Date.now()}`,
          ...configData,
        };
        inMemoryDB.savedConfigurations.unshift(newRecord);
        res.status(201).json({
          success: true,
          message: 'Vehicle configuration saved to your Tara Nissan Garage.',
          data: newRecord,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  async deleteConfiguration(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (isDbConnected()) {
        await SavedConfigurationModel.findByIdAndDelete(id);
      } else {
        inMemoryDB.savedConfigurations = inMemoryDB.savedConfigurations.filter((c) => c.id !== id);
      }
      res.status(200).json({
        success: true,
        message: 'Saved configuration removed successfully.',
      });
    } catch (err) {
      next(err);
    }
  }

  async getInvoices(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const phone = req.query.phone?.toString() || '9876543210';
      if (isDbConnected()) {
        const invoices = await GSTInvoiceModel.find({ customerPhone: phone });
        res.status(200).json({ success: true, data: invoices });
      } else {
        const invoices = inMemoryDB.invoices.filter((i) => i.customerPhone === phone || !phone);
        res.status(200).json({ success: true, data: invoices });
      }
    } catch (err) {
      next(err);
    }
  }
}

export const customerController = new CustomerController();
