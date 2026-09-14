import { Request, Response, NextFunction } from 'express';
import { leadService } from '../services/leadService.ts';

export class LeadController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        leadType,
        phone,
        name,
        email,
        vehicleModel,
        vehicleModelCode,
        city,
        message,
        metadata,
      } = req.body;

      const ipAddress = req.ip || req.headers['x-forwarded-for']?.toString();
      const userAgent = req.headers['user-agent'];
      const referrer = req.headers['referer'] || req.headers['referrer']?.toString();
      const sourceUrl = req.headers['origin'] || req.headers['host']?.toString();

      const lead = await leadService.createLead({
        leadType: leadType || 'quote_request',
        phone,
        name,
        email,
        vehicleModel,
        vehicleModelCode,
        city,
        message,
        metadata,
        ipAddress,
        userAgent,
        referrer,
        sourceUrl,
      });

      res.status(201).json({
        success: true,
        message: 'Lead registered successfully. Tara Nissan advisor will connect with you.',
        data: lead,
      });
    } catch (err) {
      next(err);
    }
  }

  async trackCall(req: Request, res: Response, next: NextFunction) {
    try {
      const { phone, vehicleModel, sourceUrl: clientUrl } = req.body;
      const ipAddress = req.ip || req.headers['x-forwarded-for']?.toString();
      const userAgent = req.headers['user-agent'];
      const referrer = req.headers['referer'] || req.headers['referrer']?.toString();

      const lead = await leadService.trackCall({
        phone,
        vehicleModel,
        ipAddress,
        userAgent,
        referrer,
        sourceUrl: clientUrl || req.headers['origin'],
      });

      res.status(200).json({
        success: true,
        message: 'Call telemetry event logged into Tara Nissan MongoDB collection.',
        telemetry: {
          dialedNumber: '+91 9031005087',
          hours: '9:00 AM - 7:30 PM',
          loggedAt: new Date().toISOString(),
          leadId: (lead as any)._id || (lead as any).id,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async trackWhatsApp(req: Request, res: Response, next: NextFunction) {
    try {
      const { phone, name, vehicleModel, message, sourceUrl: clientUrl } = req.body;
      const ipAddress = req.ip || req.headers['x-forwarded-for']?.toString();
      const userAgent = req.headers['user-agent'];
      const referrer = req.headers['referer'] || req.headers['referrer']?.toString();

      const lead = await leadService.trackWhatsApp({
        phone,
        name,
        vehicleModel,
        message,
        ipAddress,
        userAgent,
        referrer,
        sourceUrl: clientUrl || req.headers['origin'],
      });

      res.status(200).json({
        success: true,
        message: 'WhatsApp interaction logged into Tara Nissan MongoDB collection.',
        telemetry: {
          whatsappNumber: '+91 9031005087',
          branch: 'Tara Nissan Motihari (NH28)',
          loggedAt: new Date().toISOString(),
          leadId: (lead as any)._id || (lead as any).id,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async trackClick(req: Request, res: Response, next: NextFunction) {
    try {
      const { channel, vehicleId, phone, name } = req.body;
      const ipAddress = req.ip || req.headers['x-forwarded-for']?.toString();
      const userAgent = req.headers['user-agent'];
      const referrer = req.headers['referer'] || req.headers['referrer']?.toString();

      let lead;
      if (channel === 'call') {
        lead = await leadService.trackCall({
          phone: phone || '+91 9031005087',
          vehicleModel: vehicleId,
          ipAddress,
          userAgent,
          referrer,
          sourceUrl: req.headers['origin'],
        });
      } else {
        lead = await leadService.trackWhatsApp({
          phone: phone || '+91 9031005087',
          name: name || 'Showroom Visitor',
          vehicleModel: vehicleId,
          message: `Inquiry regarding vehicle ${vehicleId || 'model'} at Bankat NH28 Motihari showroom`,
          ipAddress,
          userAgent,
          referrer,
          sourceUrl: req.headers['origin'],
        });
      }

      res.status(200).json({
        success: true,
        message: `Click tracked for channel: ${channel}`,
        data: {
          channel,
          vehicleId,
          leadId: (lead as any)?._id || (lead as any)?.id,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async getRecent(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = Number(req.query.limit) || 50;
      const leads = await leadService.getRecentLeads(limit);
      res.status(200).json({
        success: true,
        count: leads.length,
        data: leads,
      });
    } catch (err) {
      next(err);
    }
  }

  async getStats(req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await leadService.getLeadStats();
      res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (err) {
      next(err);
    }
  }
}

export const leadController = new LeadController();
