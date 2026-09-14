import { LeadModel, ILead, LeadType } from '../models/Lead.ts';
import { inMemoryDB, InMemoryLead } from '../db/inMemoryStore.ts';
import { isDbConnected } from '../db/connection.ts';

export interface CreateLeadDTO {
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
  metadata?: Record<string, any>;
}

export class LeadService {
  async createLead(data: CreateLeadDTO) {
    if (isDbConnected()) {
      return await LeadModel.create({
        leadType: data.leadType,
        phone: data.phone?.trim(),
        name: data.name?.trim(),
        email: data.email?.toLowerCase().trim(),
        vehicleModel: data.vehicleModel,
        vehicleModelCode: data.vehicleModelCode,
        city: data.city || 'Motihari',
        dealerBranch: data.dealerBranch || 'Tara Nissan Motihari (NH28)',
        sourceUrl: data.sourceUrl,
        referrer: data.referrer,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
        message: data.message,
        metadata: data.metadata || {},
        status: 'new',
      });
    } else {
      const memoryLead: InMemoryLead = {
        id: `lead_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        leadType: data.leadType,
        phone: data.phone?.trim(),
        name: data.name?.trim(),
        email: data.email?.toLowerCase().trim(),
        vehicleModel: data.vehicleModel,
        vehicleModelCode: data.vehicleModelCode,
        city: data.city || 'Motihari',
        dealerBranch: data.dealerBranch || 'Tara Nissan Motihari (NH28)',
        sourceUrl: data.sourceUrl,
        referrer: data.referrer,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
        message: data.message,
        metadata: data.metadata || {},
        status: 'new',
        createdAt: new Date().toISOString(),
      };
      inMemoryDB.leads.unshift(memoryLead);
      return memoryLead;
    }
  }

  async trackCall(params: {
    phone?: string;
    sourceUrl?: string;
    referrer?: string;
    ipAddress?: string;
    userAgent?: string;
    vehicleModel?: string;
  }) {
    return await this.createLead({
      leadType: 'direct_call',
      phone: params.phone || '9031005087',
      name: 'Direct Hotline Caller',
      vehicleModel: params.vehicleModel || 'General Inquiry',
      city: 'Motihari',
      dealerBranch: 'Tara Nissan Motihari (NH28)',
      sourceUrl: params.sourceUrl,
      referrer: params.referrer,
      ipAddress: params.ipAddress,
      userAgent: params.userAgent,
      message: 'Customer clicked direct dialer CTA to official showroom number: +91 9031005087 (9:00 AM - 7:30 PM)',
      metadata: { targetNumber: '+91 9031005087', action: 'direct_call_initiated' },
    });
  }

  async trackWhatsApp(params: {
    phone?: string;
    name?: string;
    vehicleModel?: string;
    message?: string;
    sourceUrl?: string;
    referrer?: string;
    ipAddress?: string;
    userAgent?: string;
  }) {
    return await this.createLead({
      leadType: 'whatsapp_inquiry',
      phone: params.phone,
      name: params.name || 'WhatsApp Visitor',
      vehicleModel: params.vehicleModel || 'All-New Nissan Range',
      city: 'Motihari',
      dealerBranch: 'Tara Nissan Motihari (NH28)',
      message: params.message || 'WhatsApp chat bubble activated with showroom concierge',
      sourceUrl: params.sourceUrl,
      referrer: params.referrer,
      ipAddress: params.ipAddress,
      userAgent: params.userAgent,
      metadata: { targetWhatsApp: '+91 9031005087', action: 'whatsapp_bubble_click' },
    });
  }

  async getRecentLeads(limit = 50) {
    if (isDbConnected()) {
      return await LeadModel.find().sort({ createdAt: -1 }).limit(limit);
    } else {
      return inMemoryDB.leads.slice(0, limit);
    }
  }

  async getLeadStats() {
    if (isDbConnected()) {
      const [total, calls, whatsapp, testDrives, brochures] = await Promise.all([
        LeadModel.countDocuments(),
        LeadModel.countDocuments({ leadType: 'direct_call' }),
        LeadModel.countDocuments({ leadType: 'whatsapp_inquiry' }),
        LeadModel.countDocuments({ leadType: 'test_drive' }),
        LeadModel.countDocuments({ leadType: 'brochure_download' }),
      ]);
      return { total, calls, whatsapp, testDrives, brochures };
    } else {
      return {
        total: inMemoryDB.leads.length,
        calls: inMemoryDB.leads.filter((l) => l.leadType === 'direct_call').length,
        whatsapp: inMemoryDB.leads.filter((l) => l.leadType === 'whatsapp_inquiry').length,
        testDrives: inMemoryDB.leads.filter((l) => l.leadType === 'test_drive').length,
        brochures: inMemoryDB.leads.filter((l) => l.leadType === 'brochure_download').length,
      };
    }
  }
}

export const leadService = new LeadService();
