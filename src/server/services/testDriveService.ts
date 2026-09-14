import { TestDriveModel, ITestDrive } from '../models/TestDrive.ts';
import { inMemoryDB, InMemoryTestDrive } from '../db/inMemoryStore.ts';
import { isDbConnected } from '../db/connection.ts';
import { leadService } from './leadService.ts';

export interface BookTestDriveDTO {
  vehicleModel: string;
  vehicleModelCode?: string;
  fullName: string;
  phone: string;
  email: string;
  dealership?: string;
  dealershipCity?: string;
  bookingDate: string;
  timeSlot: string;
  locationType?: 'showroom' | 'doorstep';
  address?: string;
  notes?: string;
}

export class TestDriveService {
  private generateBookingRef(): string {
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    return `TN-TD-${randomDigits}`;
  }

  async bookTestDrive(data: BookTestDriveDTO) {
    const bookingRef = this.generateBookingRef();

    const dealership = data.dealership || 'Tara Nissan Motihari Showroom, Bankat NH28';
    const dealershipCity = data.dealershipCity || 'Motihari';
    const driveType = data.locationType === 'doorstep' ? 'Doorstep VIP Drive' : 'Showroom Visit (Bankat NH28)';
    const assignedAdvisor = 'Sanjay Singh (Tara Nissan Sales Team)';

    let savedRecord: any;

    if (isDbConnected()) {
      savedRecord = await TestDriveModel.create({
        bookingRef,
        bookingReference: bookingRef,
        vehicleModel: data.vehicleModel,
        vehicleModelCode: data.vehicleModelCode || data.vehicleModel.toUpperCase(),
        fullName: data.fullName.trim(),
        customerName: data.fullName.trim(),
        phone: data.phone.trim(),
        customerPhone: data.phone.trim(),
        email: data.email.toLowerCase().trim(),
        dealership,
        dealershipCity,
        bookingDate: data.bookingDate,
        preferredDate: new Date(data.bookingDate).toISOString(),
        timeSlot: data.timeSlot,
        locationType: data.locationType || 'showroom',
        driveType,
        address: data.address,
        pickupAddress: data.address || 'Showroom Visit, Bankat NH28 Motihari',
        assignedAdvisor,
        notes: data.notes,
        status: 'confirmed',
      });
    } else {
      const memoryRecord: InMemoryTestDrive = {
        id: `td_${Date.now()}`,
        bookingRef,
        bookingReference: bookingRef,
        vehicleModel: data.vehicleModel,
        vehicleModelCode: data.vehicleModelCode || data.vehicleModel.toUpperCase(),
        fullName: data.fullName.trim(),
        customerName: data.fullName.trim(),
        phone: data.phone.trim(),
        customerPhone: data.phone.trim(),
        email: data.email.toLowerCase().trim(),
        dealership,
        dealershipCity,
        bookingDate: data.bookingDate,
        preferredDate: new Date(data.bookingDate).toISOString(),
        timeSlot: data.timeSlot,
        locationType: data.locationType || 'showroom',
        driveType,
        address: data.address,
        pickupAddress: data.address || 'Showroom Visit, Bankat NH28 Motihari',
        assignedAdvisor,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      };
      inMemoryDB.testDrives.unshift(memoryRecord);
      savedRecord = memoryRecord;
    }

    // Also register lead entry
    await leadService.createLead({
      leadType: 'test_drive',
      name: data.fullName,
      phone: data.phone,
      email: data.email,
      vehicleModel: data.vehicleModel,
      city: dealershipCity,
      message: `Test Drive booked for ${data.vehicleModel} on ${data.bookingDate} (${data.timeSlot}) at ${dealership}`,
      metadata: { bookingRef, locationType: data.locationType },
    });

    return {
      bookingRef,
      status: 'confirmed',
      message: `Test drive successfully scheduled for ${data.vehicleModel}! Tara Nissan dealership concierge will contact you on ${data.phone}.`,
      details: savedRecord,
    };
  }

  async getTestDriveByRef(bookingRef: string) {
    const ref = bookingRef.toUpperCase().trim();

    if (isDbConnected()) {
      const record = await TestDriveModel.findOne({ bookingRef: ref });
      if (!record) {
        throw { statusCode: 404, message: `No test drive booking found with reference ${ref}` };
      }
      return record;
    } else {
      const record = inMemoryDB.testDrives.find((td) => td.bookingRef.toUpperCase() === ref);
      if (!record) {
        throw { statusCode: 404, message: `No test drive booking found with reference ${ref}` };
      }
      return record;
    }
  }

  async getTestDrivesByPhone(phone: string) {
    const cleanPhone = phone.trim();

    if (isDbConnected()) {
      return await TestDriveModel.find({ phone: cleanPhone }).sort({ createdAt: -1 });
    } else {
      return inMemoryDB.testDrives.filter((td) => td.phone === cleanPhone);
    }
  }
}

export const testDriveService = new TestDriveService();
