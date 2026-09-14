import { Router } from 'express';
import authRoutes from './authRoutes.ts';
import vehicleRoutes from './vehicleRoutes.ts';
import testDriveRoutes from './testDriveRoutes.ts';
import serviceBookingRoutes from './serviceBookingRoutes.ts';
import leadRoutes from './leadRoutes.ts';
import customerRoutes from './customerRoutes.ts';
import adminRoutes from './adminRoutes.ts';
import { isDbConnected } from '../db/connection.ts';
import { inMemoryDB } from '../db/inMemoryStore.ts';

const apiRouter = Router();

// Health check endpoint
apiRouter.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'online',
    app: 'Tara Nissan Backend Application Layer',
    database: isDbConnected() ? 'MongoDB (Connected via Mongoose)' : 'Resilient In-Memory Data Store',
    telemetry: {
      activeVehicles: isDbConnected() ? 'MongoDB Atlas' : inMemoryDB.vehicles.length,
      leadsLogged: inMemoryDB.leads.length,
    },
    showroom: {
      name: 'Tara Nissan Motihari Showroom & Service Bay',
      highway: 'NH28 (Bapudham Motihari, Bihar - 845402)',
      officialPhone: '+91 9031005087',
      timings: '9:00 AM - 7:30 PM',
    },
    timestamp: new Date().toISOString(),
  });
});

// Mount MVC Routes
apiRouter.use('/auth', authRoutes);
apiRouter.use('/vehicles', vehicleRoutes);
apiRouter.use('/test-drives', testDriveRoutes);
apiRouter.use('/test-drive', testDriveRoutes); // Section 6 alias
apiRouter.use('/service-bookings', serviceBookingRoutes);
apiRouter.use('/service', serviceBookingRoutes); // Section 6 alias
apiRouter.use('/leads', leadRoutes);
apiRouter.use('/customer', customerRoutes); // Customer Dashboard
apiRouter.use('/admin', adminRoutes); // Staff & Admin RBAC

export default apiRouter;
