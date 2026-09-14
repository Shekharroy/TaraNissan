// In-memory resilient storage for development sandbox when MongoDB cluster is offline
import bcrypt from 'bcryptjs';

export interface InMemoryUser {
  id: string;
  fullName: string;
  name: string;
  email: string;
  phoneNumber: string;
  phone: string;
  passwordHash: string;
  role: 'customer' | 'sales_advisor' | 'service_manager' | 'admin';
  pincode: string;
  city: string;
  preferredVehicle: string;
  isVerified: boolean;
  createdAt: string;
}

export interface InMemoryVehicle {
  id: string;
  modelId?: string;
  modelCode: string;
  name: string;
  tagline: string;
  badge?: string;
  category: string;
  startingPrice: number;
  topPrice: number;
  onRoadPriceEstimateMotihari?: number;
  priceDisplay: string;
  emiDisplay: string;
  fuelType: string;
  fuelTypes?: string[];
  mileage: string;
  transmission: string;
  transmissions?: string[];
  engine: string;
  power: string;
  groundClearance: string;
  safetyRating: string;
  heroBanner: string;
  brochureUrl: string;
  keyFeatures: string[];
  features?: string[];
  variants?: Array<{ grade: string; price: number; transmission: string }>;
  colors: Array<{ name: string; hex: string }>;
  isAvailable: boolean;
  isAvailableInShowroom?: boolean;
  dealershipLocation?: string;
  stockCount: number;
  featured: boolean;
}

export interface InMemoryTestDrive {
  id: string;
  bookingRef: string;
  bookingReference: string;
  vehicleModel: string;
  vehicleModelCode?: string;
  fullName: string;
  customerName: string;
  phone: string;
  customerPhone: string;
  email: string;
  dealership: string;
  dealershipCity: string;
  bookingDate: string;
  preferredDate: string;
  timeSlot: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  locationType: 'showroom' | 'doorstep';
  driveType: string;
  address?: string;
  pickupAddress?: string;
  assignedAdvisor: string;
  assignedSalesperson?: string;
  createdAt: string;
}

export interface InMemoryServiceAppointment {
  id: string;
  bookingRef: string;
  fullName: string;
  customerName?: string;
  phone: string;
  customerPhone?: string;
  email?: string;
  vehicleModel: string;
  registrationNumber: string;
  serviceType: string;
  dealershipLocation: string;
  dealershipCity: string;
  appointmentDate: string;
  timeSlot: string;
  pickupDropRequired: boolean;
  status: 'scheduled' | 'vehicle_inspected' | 'work_in_progress' | 'quality_checked' | 'ready_for_delivery' | 'delivered';
  currentStage: number; // 1 to 6
  estimatedDelivery?: string;
  assignedAdvisor?: string;
  createdAt: string;
}

export interface InMemorySavedConfiguration {
  id: string;
  userId?: string;
  customerPhone?: string;
  vehicleModelId: string;
  vehicleName: string;
  variantGrade: string;
  transmission: string;
  fuelType: string;
  colorName: string;
  colorHex: string;
  exShowroomPrice: number;
  onRoadPriceEstimateMotihari: number;
  monthlyEmiEstimate: number;
  selectedAccessories: string[];
  savedAt: string;
}

export interface InMemoryGSTInvoice {
  id: string;
  invoiceNumber: string;
  invoiceDate: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  vehicleModel: string;
  vehicleVariant: string;
  chassisNumber: string;
  engineNumber: string;
  hsnCode: string;
  dealershipGstin: string;
  dealershipAddress: string;
  exShowroomAmount: number;
  cgstRate: number;
  cgstAmount: number;
  sgstRate: number;
  sgstAmount: number;
  compensationCessRate: number;
  compensationCessAmount: number;
  roadTaxRTO: number;
  fastagInsurance: number;
  totalInvoiceValue: number;
  paymentStatus: 'PAID' | 'PROFORMA_ISSUED' | 'BOOKING_DEPOSIT_PAID';
  pdfDownloadUrl?: string;
}

export interface InMemoryLead {
  id: string;
  leadType: 'direct_call' | 'whatsapp_inquiry' | 'test_drive' | 'brochure_download' | 'emi_inquiry' | 'quote_request';
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
  status: 'new' | 'contacted' | 'test_drive_scheduled' | 'quote_sent' | 'closed' | 'qualified';
  assignedAdvisor?: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

class InMemoryDatabase {
  public users: InMemoryUser[] = [];
  public vehicles: InMemoryVehicle[] = [];
  public testDrives: InMemoryTestDrive[] = [];
  public serviceAppointments: InMemoryServiceAppointment[] = [];
  public savedConfigurations: InMemorySavedConfiguration[] = [];
  public invoices: InMemoryGSTInvoice[] = [];
  public leads: InMemoryLead[] = [];

  constructor() {
    this.seedDefaultData();
  }

  private seedDefaultData() {
    const defaultPasswordHash = bcrypt.hashSync('Nissan@123', 10);

    // Seed Demo Users for RBAC
    this.users.push(
      {
        id: 'usr_demo_customer',
        fullName: 'Vikram Mehta',
        name: 'Vikram Mehta',
        email: 'vikram.mehta@taranissan.in',
        phoneNumber: '9876543210',
        phone: '9876543210',
        passwordHash: defaultPasswordHash,
        role: 'customer',
        pincode: '845401',
        city: 'Motihari',
        preferredVehicle: 'Tekton',
        isVerified: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'usr_staff_advisor',
        fullName: 'Sanjay Singh',
        name: 'Sanjay Singh',
        email: 'sanjay.singh@taranissan.in',
        phoneNumber: '9031005087',
        phone: '9031005087',
        passwordHash: defaultPasswordHash,
        role: 'sales_advisor',
        pincode: '845402',
        city: 'Motihari',
        preferredVehicle: 'Tekton',
        isVerified: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'usr_staff_service',
        fullName: 'Ramesh Thakur',
        name: 'Ramesh Thakur',
        email: 'ramesh.service@taranissan.in',
        phoneNumber: '9835012399',
        phone: '9835012399',
        passwordHash: defaultPasswordHash,
        role: 'service_manager',
        pincode: '845402',
        city: 'Motihari',
        preferredVehicle: 'Magnite',
        isVerified: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'usr_dealership_admin',
        fullName: 'Tara Nissan Admin',
        name: 'Tara Nissan Admin',
        email: 'admin@taranissan.in',
        phoneNumber: '9031005088',
        phone: '9031005088',
        passwordHash: defaultPasswordHash,
        role: 'admin',
        pincode: '845402',
        city: 'Motihari',
        preferredVehicle: 'Patrol',
        isVerified: true,
        createdAt: new Date().toISOString(),
      }
    );

    // Seed Vehicles
    this.vehicles = [
      {
        id: 'nissan-tekton',
        modelId: 'tekton-2026',
        modelCode: 'TEKTON',
        name: 'All-New Nissan Tekton',
        tagline: 'The Premium SUV Inspired by the Legendary Patrol',
        badge: 'ALL-NEW PREMIERE',
        category: 'SUV',
        startingPrice: 1049000,
        topPrice: 1499000,
        onRoadPriceEstimateMotihari: 1195000,
        priceDisplay: 'Starting from ₹ 10.49 Lakh*',
        emiDisplay: 'EMI starts ₹12,499/mo*',
        fuelType: 'Petrol / Turbo-Petrol',
        fuelTypes: ['Petrol', 'Turbo-Petrol'],
        mileage: '19.4 kmpl*',
        transmission: 'Manual / CVT Automatic',
        transmissions: ['Manual', 'CVT Automatic'],
        engine: '1.0L Turbo / 1.5L Dual-VVT',
        power: '120 PS / 160 Nm',
        groundClearance: '208 mm',
        safetyRating: 'Engineered for 5-Star NCAP',
        heroBanner: 'https://www.nissan.in/content/dam/Nissan/in/vehicles/takton/100500_Nissan-Tekton-September-Pace-Banner-Desktop-3000-x-1300.jpg.ximg.full.hero.jpg',
        brochureUrl: '/brochures/nissan-tekton-official.pdf',
        keyFeatures: ['Level 2 ADAS (11 Functions)', 'Dual 10.25-inch Screens', 'Around View 360° Monitor', 'Panoramic Skyroof'],
        features: ['10.25-inch Touchscreen', 'Around View Monitor 360', 'Wireless CarPlay', 'E20 Compliant'],
        variants: [
          { grade: 'T280', price: 1049000, transmission: 'Manual' },
          { grade: 'T760 Premium', price: 1499000, transmission: 'Automatic' },
        ],
        colors: [
          { name: 'Pearl White', hex: '#f6f6f6' },
          { name: 'Blade Silver', hex: '#b5b7b9' },
          { name: 'Onyx Black', hex: '#111111' },
          { name: 'Flare Red', hex: '#b31b26' },
        ],
        isAvailable: true,
        isAvailableInShowroom: true,
        dealershipLocation: 'Bankat NH28, Motihari',
        stockCount: 8,
        featured: true,
      },
      {
        id: 'nissan-magnite',
        modelId: 'magnite-2026',
        modelCode: 'MAGNITE',
        name: 'Nissan Magnite',
        tagline: 'BIG. BOLD. BEAUTIFUL.',
        badge: 'BESTSELLER',
        category: 'Compact SUV',
        startingPrice: 599000,
        topPrice: 1150000,
        onRoadPriceEstimateMotihari: 685000,
        priceDisplay: 'Starting from ₹ 5.99 Lakh*',
        emiDisplay: 'EMI starts ₹6,999/mo*',
        fuelType: 'Petrol',
        fuelTypes: ['Petrol', 'Turbo-Petrol'],
        mileage: '20.0 kmpl*',
        transmission: 'Manual / EZ-Shift AMT / CVT',
        transmissions: ['Manual', 'EZ-Shift AMT', 'CVT'],
        engine: '1.0L B4D Naturally Aspirated & HRA0 Turbo',
        power: '100 PS / 160 Nm',
        groundClearance: '205 mm',
        safetyRating: '4-Star Global NCAP',
        heroBanner: 'https://www.nissan.in/content/dam/Nissan/in/vehicles/magnite/my24/launch/home-desktop.jpg.ximg.full.hero.jpg',
        brochureUrl: '/brochures/nissan-magnite-official.pdf',
        keyFeatures: ['Wireless Apple CarPlay & Android Auto', 'Around View Monitor', 'Cruise Control', 'Class-Leading Legroom'],
        features: ['Around View Monitor', 'Wireless CarPlay', 'LED Bi-Projector Headlamps', 'E20 Compliant'],
        variants: [
          { grade: 'Visia', price: 599000, transmission: 'Manual' },
          { grade: 'Acenta', price: 714000, transmission: 'Manual / AMT' },
          { grade: 'N-Connecta', price: 786000, transmission: 'Manual / CVT' },
          { grade: 'Tekna+', price: 1150000, transmission: 'CVT' },
        ],
        colors: [
          { name: 'Flare Garnet Red', hex: '#9b1b21' },
          { name: 'Vivid Blue', hex: '#104f9f' },
          { name: 'Storm White', hex: '#f2f2f2' },
          { name: 'Blade Silver', hex: '#9e9e9e' },
        ],
        isAvailable: true,
        isAvailableInShowroom: true,
        dealershipLocation: 'Bankat NH28, Motihari',
        stockCount: 12,
        featured: true,
      },
      {
        id: 'nissan-magnite-kuro',
        modelCode: 'MAGNITE_KURO',
        name: 'Magnite KURO',
        tagline: 'THE DARKER SIDE OF BOLD',
        badge: 'SPECIAL EDITION',
        category: 'Compact SUV',
        startingPrice: 827000,
        topPrice: 1046000,
        priceDisplay: 'Starting from ₹ 8.27 Lakh*',
        emiDisplay: 'EMI starts ₹8,899/mo*',
        fuelType: 'Petrol',
        mileage: '19.7 kmpl*',
        transmission: 'Manual / X-Tronic CVT',
        engine: '1.0L Turbo Charged Engine',
        power: '100 PS / 160 Nm',
        groundClearance: '205 mm',
        safetyRating: '4-Star Global NCAP',
        heroBanner: 'https://www.nissan.in/content/dam/Nissan/in/vehicles/magnite/my24/launch/kuro-banner.jpg.ximg.full.hero.jpg',
        brochureUrl: '/brochures/nissan-magnite-kuro-official.pdf',
        keyFeatures: ['All-Black Gloss Finish Grille & Alloys', 'Midnight Interior Theme', 'Wireless Smartphone Charger', 'Red Brake Calipers'],
        colors: [
          { name: 'Midnight Black', hex: '#0a0a0a' },
          { name: 'Tourmaline Metallic', hex: '#1c1f24' },
        ],
        isAvailable: true,
        stockCount: 5,
        featured: false,
      },
      {
        id: 'nissan-x-trail',
        modelCode: 'X_TRAIL',
        name: 'X-Trail',
        tagline: 'LUXURY REDEFINED WITH INTELLIGENT 4x4',
        badge: 'FLAGSHIP SUV',
        category: 'Flagship SUV',
        startingPrice: 4992000,
        topPrice: 4992000,
        priceDisplay: 'Starting from ₹ 49.92 Lakh*',
        emiDisplay: 'EMI starts ₹58,000/mo*',
        fuelType: '1.5L Turbo Petrol with Mild Hybrid',
        mileage: '13.7 kmpl*',
        transmission: '3rd Gen Shift-by-Wire X-Tronic CVT',
        engine: '1.5L 12V Variable Compression Turbo (VC-Turbo)',
        power: '163 PS / 300 Nm Torque',
        groundClearance: '210 mm',
        safetyRating: '5-Star Euro NCAP',
        heroBanner: 'https://www.nissan.in/content/dam/Nissan/in/vehicles/x-trail/t33/launch/overview/Xtrail_desk_1800x700.jpg.ximg.full.hero.jpg',
        brochureUrl: '/brochures/nissan-x-trail-official.pdf',
        keyFeatures: ['World-First VC-Turbo Engine', 'Dual Panoramic Sunroof', '12.3-inch Digital TFT Display', 'Hands-Free Power Liftgate'],
        colors: [
          { name: 'Diamond Black', hex: '#141414' },
          { name: 'Champagne Silver', hex: '#d4cebe' },
          { name: 'Solid White', hex: '#fafafa' },
        ],
        isAvailable: true,
        stockCount: 3,
        featured: true,
      },
      {
        id: 'nissan-patrol',
        modelCode: 'PATROL',
        name: 'Patrol',
        tagline: 'THE LEGENDARY CONQUEROR OF ALL TERRAINS',
        badge: 'ICONIC LUXURY 4x4',
        category: 'Flagship SUV',
        startingPrice: 12000000,
        topPrice: 15000000,
        priceDisplay: 'Starting from ₹ 1.20 Cr*',
        emiDisplay: 'Price on Request',
        fuelType: 'High Output V8 Petrol',
        mileage: '8.5 kmpl*',
        transmission: '7-Speed Automatic with Manual Mode',
        engine: '5.6L 32-Valve Endurance V8 Engine',
        power: '405 PS / 560 Nm Torque',
        groundClearance: '273 mm',
        safetyRating: '5-Star Safety Architecture',
        heroBanner: 'https://www.nissan.in/content/dam/Nissan/in/vehicles/patrol/hero-banner-patrol-desktop.jpg.ximg.full.hero.jpg',
        brochureUrl: '/brochures/nissan-patrol-official.pdf',
        keyFeatures: ['Hydraulic Body Motion Control (HBMC)', 'All-Mode 4x4 System', 'Diamond-Stitched Leather Seating', 'Bose Premium 13-Speaker Audio'],
        colors: [
          { name: 'Black Obsidian', hex: '#0f0f0f' },
          { name: 'Hermosa Blue', hex: '#16284e' },
          { name: 'Pearl White', hex: '#f5f5f5' },
        ],
        isAvailable: true,
        stockCount: 1,
        featured: false,
      },
    ];

    // Seed Initial Test Drives
    this.testDrives.push(
      {
        id: 'td_sample_01',
        bookingRef: 'TN-TD-202609-0842',
        bookingReference: 'TN-TD-202609-0842',
        vehicleModel: 'All-New Nissan Tekton',
        vehicleModelCode: 'TEKTON',
        fullName: 'Vikram Mehta',
        customerName: 'Vikram Mehta',
        phone: '9876543210',
        customerPhone: '9876543210',
        email: 'vikram.mehta@taranissan.in',
        dealership: 'Tara Nissan Motihari Showroom, Bankat NH28',
        dealershipCity: 'Motihari',
        bookingDate: '2026-09-18',
        preferredDate: '2026-09-18T10:30:00.000Z',
        timeSlot: 'Morning (10:30 AM)',
        status: 'confirmed',
        locationType: 'showroom',
        driveType: 'Showroom Visit (Bankat NH28)',
        pickupAddress: 'Near Central University, Bankat, Motihari',
        assignedAdvisor: 'Sanjay Singh (Tara Nissan Sales Team)',
        assignedSalesperson: 'Sanjay Singh (Tara Nissan Sales Team)',
        createdAt: '2026-09-12T06:00:00.000Z',
      },
      {
        id: 'td_sample_02',
        bookingRef: 'TN-TD-89214',
        bookingReference: 'TN-TD-89214',
        vehicleModel: 'Nissan Magnite KURO',
        vehicleModelCode: 'MAGNITE_KURO',
        fullName: 'Ramesh Kumar',
        customerName: 'Ramesh Kumar',
        phone: '9801234567',
        customerPhone: '9801234567',
        email: 'ramesh.kumar@example.com',
        dealership: 'Bankat NH28, Motihari',
        dealershipCity: 'Motihari',
        bookingDate: '2026-09-21',
        preferredDate: '2026-09-21T14:00:00.000Z',
        timeSlot: 'Afternoon (02:00 PM)',
        status: 'confirmed',
        locationType: 'doorstep',
        driveType: 'Doorstep VIP Drive',
        pickupAddress: 'Chatauni Chowk, Motihari, Bihar - 845401',
        assignedAdvisor: 'Sanjay Singh (Tara Nissan Sales Team)',
        assignedSalesperson: 'Sanjay Singh (Tara Nissan Sales Team)',
        createdAt: '2026-09-13T04:15:00.000Z',
      }
    );

    // Seed Active Service Bookings
    this.serviceAppointments.push(
      {
        id: 'srv_01',
        bookingRef: 'TN-SRV-4091',
        fullName: 'Vikram Mehta',
        customerName: 'Vikram Mehta',
        phone: '9876543210',
        customerPhone: '9876543210',
        email: 'vikram.mehta@taranissan.in',
        vehicleModel: 'Nissan Magnite Turbo CVT',
        registrationNumber: 'BR-05-AB-4029',
        serviceType: '20,000 KM Periodic Maintenance & AC Disinfection',
        dealershipLocation: 'Tara Nissan Authorized Workshop, Bankat NH28, Motihari',
        dealershipCity: 'Motihari',
        appointmentDate: '2026-09-14',
        timeSlot: '11:00 AM - 01:30 PM',
        pickupDropRequired: true,
        status: 'work_in_progress',
        currentStage: 3, // 1: scheduled, 2: vehicle_inspected, 3: work_in_progress, 4: quality_checked, 5: ready_for_delivery, 6: delivered
        estimatedDelivery: 'Today, 04:30 PM',
        assignedAdvisor: 'Ramesh Thakur (Service Head)',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: 'srv_02',
        bookingRef: 'TN-SRV-4092',
        fullName: 'Anil Prasad',
        customerName: 'Anil Prasad',
        phone: '9835012399',
        customerPhone: '9835012399',
        email: 'anil.prasad@example.com',
        vehicleModel: 'Nissan Kicks 1.3L Turbo',
        registrationNumber: 'BR-05-CD-9182',
        serviceType: 'Brake Pad Replacement & Suspension Audit',
        dealershipLocation: 'Bankat NH28, Motihari',
        dealershipCity: 'Motihari',
        appointmentDate: '2026-09-15',
        timeSlot: '02:00 PM',
        pickupDropRequired: false,
        status: 'scheduled',
        currentStage: 1,
        estimatedDelivery: 'Tomorrow, 05:00 PM',
        assignedAdvisor: 'Ramesh Thakur (Service Head)',
        createdAt: new Date().toISOString(),
      }
    );

    // Seed Customer Saved Car Configurations
    this.savedConfigurations.push(
      {
        id: 'cfg_01',
        userId: 'usr_demo_customer',
        customerPhone: '9876543210',
        vehicleModelId: 'nissan-tekton',
        vehicleName: 'All-New Nissan Tekton',
        variantGrade: 'T760 Premium CVT',
        transmission: 'X-Tronic CVT Automatic',
        fuelType: '1.0L Turbo Petrol',
        colorName: 'Flare Garnet Red',
        colorHex: '#b31b26',
        exShowroomPrice: 1499000,
        onRoadPriceEstimateMotihari: 1685000,
        monthlyEmiEstimate: 17499,
        selectedAccessories: ['Illuminated Scuff Plates', 'All-Weather 7D Cabin Mats', 'Dashcam Dual Channel', 'Front & Rear Mud Flaps'],
        savedAt: '2026-09-12T14:30:00.000Z',
      },
      {
        id: 'cfg_02',
        userId: 'usr_demo_customer',
        customerPhone: '9876543210',
        vehicleModelId: 'nissan-magnite',
        vehicleName: 'Nissan Magnite',
        variantGrade: 'XV Premium Turbo CVT',
        transmission: 'CVT Automatic',
        fuelType: '1.0L Turbo',
        colorName: 'Blade Silver with Onyx Black Roof',
        colorHex: '#b5b7b9',
        exShowroomPrice: 998000,
        onRoadPriceEstimateMotihari: 1115000,
        monthlyEmiEstimate: 11450,
        selectedAccessories: ['Wireless Phone Charger Ambient Pack', 'Nissan Signature Body Graphics'],
        savedAt: '2026-09-10T09:15:00.000Z',
      }
    );

    // Seed Downloadable GST Invoices
    this.invoices.push(
      {
        id: 'inv_01',
        invoiceNumber: 'TN-GST-2026-0814',
        invoiceDate: '2026-05-18',
        customerName: 'Vikram Mehta',
        customerPhone: '9876543210',
        customerAddress: 'Ward No. 14, Rajendra Nagar, Motihari, Bihar - 845401',
        vehicleModel: 'Nissan Magnite 1.0L Turbo CVT',
        vehicleVariant: 'XV Premium Dual Tone',
        chassisNumber: 'MDHBA16K7PN849201',
        engineNumber: 'HRA0T104829',
        hsnCode: '8703',
        dealershipGstin: '10AAACT7829M1ZQ',
        dealershipAddress: 'Tara Nissan Authorized Dealership, NH28 Bankat, Bapudham Motihari, Bihar - 845402',
        exShowroomAmount: 965000,
        cgstRate: 14,
        cgstAmount: 135100,
        sgstRate: 14,
        sgstAmount: 135100,
        compensationCessRate: 1,
        compensationCessAmount: 9650,
        roadTaxRTO: 86850,
        fastagInsurance: 34500,
        totalInvoiceValue: 1366200,
        paymentStatus: 'PAID',
        pdfDownloadUrl: '/invoices/TN-GST-2026-0814.pdf',
      },
      {
        id: 'inv_02',
        invoiceNumber: 'TN-PROFORMA-2026-1092',
        invoiceDate: '2026-09-12',
        customerName: 'Vikram Mehta',
        customerPhone: '9876543210',
        customerAddress: 'Ward No. 14, Rajendra Nagar, Motihari, Bihar - 845401',
        vehicleModel: 'All-New Nissan Tekton',
        vehicleVariant: 'T760 Premium CVT (Booking Token)',
        chassisNumber: 'ALLOCATION-PENDING-TEKTON-2026',
        engineNumber: '1.0L-TURBO-BATCH-01',
        hsnCode: '8703',
        dealershipGstin: '10AAACT7829M1ZQ',
        dealershipAddress: 'Tara Nissan Authorized Dealership, NH28 Bankat, Bapudham Motihari, Bihar - 845402',
        exShowroomAmount: 1499000,
        cgstRate: 14,
        cgstAmount: 209860,
        sgstRate: 14,
        sgstAmount: 209860,
        compensationCessRate: 1,
        compensationCessAmount: 14990,
        roadTaxRTO: 134910,
        fastagInsurance: 45000,
        totalInvoiceValue: 2113620,
        paymentStatus: 'BOOKING_DEPOSIT_PAID',
        pdfDownloadUrl: '/invoices/TN-PROFORMA-2026-1092.pdf',
      }
    );

    // Seed Initial Leads
    this.leads.push(
      {
        id: 'lead_01',
        leadType: 'direct_call',
        phone: '9031005087',
        name: 'Showroom Direct Caller',
        vehicleModel: 'Nissan Magnite',
        city: 'Motihari',
        dealerBranch: 'Tara Nissan Motihari (Bankat NH28)',
        status: 'qualified',
        assignedAdvisor: 'Sanjay Singh (Tara Nissan Sales Team)',
        createdAt: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: 'lead_02',
        leadType: 'whatsapp_inquiry',
        phone: '9835112233',
        name: 'Rajesh Kumar',
        vehicleModel: 'All-New Nissan Tekton',
        city: 'Motihari',
        message: 'Hello Tara Nissan, I am interested in knowing the on-road price and delivery timeline of the Nissan Tekton in Motihari (845402).',
        dealerBranch: 'Tara Nissan Motihari (Bankat NH28)',
        status: 'new',
        assignedAdvisor: 'Sanjay Singh (Tara Nissan Sales Team)',
        createdAt: new Date(Date.now() - 7200000).toISOString(),
      },
      {
        id: 'lead_03',
        leadType: 'quote_request',
        phone: '9801234567',
        name: 'Ramesh Kumar',
        vehicleModel: 'Nissan Magnite KURO',
        city: 'Motihari',
        message: 'Need exchange quote for 2018 Swift against Magnite KURO CVT with zero-dep insurance.',
        dealerBranch: 'Tara Nissan Motihari (Bankat NH28)',
        status: 'test_drive_scheduled',
        assignedAdvisor: 'Sanjay Singh (Tara Nissan Sales Team)',
        createdAt: new Date(Date.now() - 14400000).toISOString(),
      },
      {
        id: 'lead_04',
        leadType: 'brochure_download',
        phone: '9835012345',
        name: 'Rahul Verma',
        vehicleModel: 'All-New Nissan Tekton',
        city: 'Motihari',
        message: 'Downloaded digital brochure for All-New Nissan Tekton from Tara Nissan Portal.',
        dealerBranch: 'Tara Nissan Motihari (Bankat NH28)',
        status: 'contacted',
        assignedAdvisor: 'Sanjay Singh (Tara Nissan Sales Team)',
        createdAt: new Date(Date.now() - 28800000).toISOString(),
      }
    );
  }
}

export const inMemoryDB = new InMemoryDatabase();
