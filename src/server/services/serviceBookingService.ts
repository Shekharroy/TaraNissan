import { ServiceAppointmentModel } from '../models/ServiceAppointment.ts';
import { inMemoryDB, InMemoryServiceAppointment } from '../db/inMemoryStore.ts';
import { isDbConnected } from '../db/connection.ts';
import { leadService } from './leadService.ts';

export interface BookServiceDTO {
  fullName: string;
  phone: string;
  email?: string;
  vehicleModel: string;
  registrationNumber: string;
  serviceType: 'periodic_maintenance' | 'general_repair' | 'ac_service' | 'express_wash' | 'body_paint';
  dealershipLocation?: string;
  dealershipCity?: string;
  appointmentDate: string;
  timeSlot: string;
  pickupDropRequired?: boolean;
  remarks?: string;
}

export class ServiceBookingService {
  private generateBookingRef(): string {
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    return `TN-SB-${randomDigits}`;
  }

  async bookServiceAppointment(data: BookServiceDTO) {
    const bookingRef = this.generateBookingRef();
    const dealershipLocation = data.dealershipLocation || 'Tara Nissan Authorized Workshop, NH28 Motihari';
    const dealershipCity = data.dealershipCity || 'Motihari';

    let savedRecord: any;

    if (isDbConnected()) {
      savedRecord = await ServiceAppointmentModel.create({
        bookingRef,
        fullName: data.fullName.trim(),
        phone: data.phone.trim(),
        email: data.email?.toLowerCase().trim(),
        vehicleModel: data.vehicleModel,
        registrationNumber: data.registrationNumber.toUpperCase().trim(),
        serviceType: data.serviceType || 'periodic_maintenance',
        dealershipLocation,
        dealershipCity,
        appointmentDate: data.appointmentDate,
        timeSlot: data.timeSlot,
        pickupDropRequired: Boolean(data.pickupDropRequired),
        remarks: data.remarks,
        status: 'scheduled',
      });
    } else {
      const memoryRecord: InMemoryServiceAppointment = {
        id: `sb_${Date.now()}`,
        bookingRef,
        fullName: data.fullName.trim(),
        phone: data.phone.trim(),
        email: data.email?.toLowerCase().trim(),
        vehicleModel: data.vehicleModel,
        registrationNumber: data.registrationNumber.toUpperCase().trim(),
        serviceType: data.serviceType || 'periodic_maintenance',
        dealershipLocation,
        dealershipCity,
        appointmentDate: data.appointmentDate,
        timeSlot: data.timeSlot,
        pickupDropRequired: Boolean(data.pickupDropRequired),
        status: 'scheduled',
        currentStage: 1,
        createdAt: new Date().toISOString(),
      };
      inMemoryDB.serviceAppointments.unshift(memoryRecord);
      savedRecord = memoryRecord;
    }

    // Lead tracking
    await leadService.createLead({
      leadType: 'quote_request',
      name: data.fullName,
      phone: data.phone,
      email: data.email,
      vehicleModel: data.vehicleModel,
      city: dealershipCity,
      message: `Service bay slot booked for ${data.registrationNumber} (${data.serviceType}) on ${data.appointmentDate}`,
      metadata: { bookingRef, serviceType: data.serviceType },
    });

    return {
      bookingRef,
      status: 'scheduled',
      message: `Service appointment scheduled for vehicle ${data.registrationNumber}. Workshop team will be ready for check-in on ${data.appointmentDate}.`,
      details: savedRecord,
    };
  }

  async getBookingByRef(bookingRef: string) {
    const ref = bookingRef.toUpperCase().trim();

    if (isDbConnected()) {
      const record = await ServiceAppointmentModel.findOne({ bookingRef: ref });
      if (!record) {
        throw { statusCode: 404, message: `No service appointment found with reference ${ref}` };
      }
      return record;
    } else {
      const record = inMemoryDB.serviceAppointments.find((sb) => sb.bookingRef.toUpperCase() === ref);
      if (!record) {
        throw { statusCode: 404, message: `No service appointment found with reference ${ref}` };
      }
      return record;
    }
  }

  async getBookingsByPhone(phone: string) {
    const cleanPhone = phone.trim();

    if (isDbConnected()) {
      return await ServiceAppointmentModel.find({ phone: cleanPhone }).sort({ appointmentDate: -1 });
    } else {
      return inMemoryDB.serviceAppointments.filter((sb) => sb.phone === cleanPhone);
    }
  }
}

export const serviceBookingService = new ServiceBookingService();
