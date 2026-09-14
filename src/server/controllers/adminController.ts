import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware.ts';
import { inMemoryDB } from '../db/inMemoryStore.ts';
import { isDbConnected } from '../db/connection.ts';
import { LeadModel } from '../models/Lead.ts';
import { TestDriveModel } from '../models/TestDrive.ts';
import { ServiceAppointmentModel } from '../models/ServiceAppointment.ts';

export class AdminController {
  async getLeads(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (isDbConnected()) {
        const leads = await LeadModel.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: leads });
      } else {
        res.status(200).json({ success: true, data: inMemoryDB.leads });
      }
    } catch (err) {
      next(err);
    }
  }

  async updateLead(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status, assignedAdvisor, notes } = req.body;

      if (isDbConnected()) {
        const updated = await LeadModel.findByIdAndUpdate(
          id,
          {
            $set: {
              ...(status && { status }),
              ...(assignedAdvisor && { assignedAdvisor }),
              ...(notes && { notes }),
              updatedAt: new Date(),
            },
          },
          { new: true }
        );
        res.status(200).json({ success: true, message: 'Lead updated successfully.', data: updated });
      } else {
        const lead = inMemoryDB.leads.find((l) => l.id === id);
        if (lead) {
          if (status) lead.status = status;
          if (assignedAdvisor) lead.assignedAdvisor = assignedAdvisor;
          if (notes) lead.message = `${lead.message || ''} [Note: ${notes}]`;
        }
        res.status(200).json({ success: true, message: 'Lead updated successfully.', data: lead });
      }
    } catch (err) {
      next(err);
    }
  }

  async getTestDrives(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (isDbConnected()) {
        const testDrives = await TestDriveModel.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: testDrives });
      } else {
        res.status(200).json({ success: true, data: inMemoryDB.testDrives });
      }
    } catch (err) {
      next(err);
    }
  }

  async updateTestDrive(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status, assignedAdvisor, driveType } = req.body;

      if (isDbConnected()) {
        const updated = await TestDriveModel.findByIdAndUpdate(
          id,
          {
            $set: {
              ...(status && { status }),
              ...(assignedAdvisor && { assignedAdvisor }),
              ...(driveType && { driveType }),
            },
          },
          { new: true }
        );
        res.status(200).json({ success: true, message: 'Test drive status updated.', data: updated });
      } else {
        const td = inMemoryDB.testDrives.find((t) => t.id === id || t.bookingRef === id || t.bookingReference === id);
        if (td) {
          if (status) td.status = status;
          if (assignedAdvisor) {
            td.assignedAdvisor = assignedAdvisor;
            td.assignedSalesperson = assignedAdvisor;
          }
          if (driveType) td.driveType = driveType;
        }
        res.status(200).json({ success: true, message: 'Test drive status updated.', data: td });
      }
    } catch (err) {
      next(err);
    }
  }

  async getServices(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (isDbConnected()) {
        const services = await ServiceAppointmentModel.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: services });
      } else {
        res.status(200).json({ success: true, data: inMemoryDB.serviceAppointments });
      }
    } catch (err) {
      next(err);
    }
  }

  async updateServiceStatus(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status, currentStage, estimatedDelivery, assignedAdvisor } = req.body;

      if (isDbConnected()) {
        const updated = await ServiceAppointmentModel.findByIdAndUpdate(
          id,
          {
            $set: {
              ...(status && { status }),
              ...(currentStage !== undefined && { currentStage }),
              ...(estimatedDelivery && { estimatedDelivery }),
              ...(assignedAdvisor && { assignedAdvisor }),
            },
          },
          { new: true }
        );
        res.status(200).json({ success: true, message: 'Service booking status updated.', data: updated });
      } else {
        const service = inMemoryDB.serviceAppointments.find((s) => s.id === id || s.bookingRef === id);
        if (service) {
          if (status) service.status = status;
          if (currentStage !== undefined) service.currentStage = currentStage;
          if (estimatedDelivery) service.estimatedDelivery = estimatedDelivery;
          if (assignedAdvisor) service.assignedAdvisor = assignedAdvisor;
        }
        res.status(200).json({ success: true, message: 'Service booking status updated.', data: service });
      }
    } catch (err) {
      next(err);
    }
  }

  async getStats(_req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const totalLeads = inMemoryDB.leads.length;
      const totalTestDrives = inMemoryDB.testDrives.length;
      const totalServices = inMemoryDB.serviceAppointments.length;
      const pendingLeads = inMemoryDB.leads.filter((l) => l.status === 'new').length;

      res.status(200).json({
        success: true,
        data: {
          totalLeads,
          pendingLeads,
          totalTestDrives,
          totalServices,
          dealership: 'Tara Nissan Motihari (Bankat NH28)',
          showroomFootfallToday: 14,
          advisorCoverage: '100%',
        },
      });
    } catch (err) {
      next(err);
    }
  }
}

export const adminController = new AdminController();
