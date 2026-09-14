import { Router } from 'express';
import { adminController } from '../controllers/adminController.ts';
import { optionalJWT, requireRole } from '../middleware/authMiddleware.ts';

const router = Router();

// Staff and Admin routes
router.get('/leads', optionalJWT as any, adminController.getLeads);
router.patch('/leads/:id', optionalJWT as any, adminController.updateLead);

router.get('/test-drives', optionalJWT as any, adminController.getTestDrives);
router.patch('/test-drives/:id', optionalJWT as any, adminController.updateTestDrive);

router.get('/services', optionalJWT as any, adminController.getServices);
router.patch('/services/:id', optionalJWT as any, adminController.updateServiceStatus);
router.patch('/services/:id/status', optionalJWT as any, adminController.updateServiceStatus);

router.get('/stats', optionalJWT as any, adminController.getStats);

export default router;
