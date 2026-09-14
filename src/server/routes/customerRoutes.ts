import { Router } from 'express';
import { customerController } from '../controllers/customerController.ts';
import { optionalJWT, authenticateJWT } from '../middleware/authMiddleware.ts';

const router = Router();

// GET /api/v1/customer/dashboard
router.get('/dashboard', optionalJWT as any, customerController.getDashboard);

// POST /api/v1/customer/configurations
router.post('/configurations', optionalJWT as any, customerController.saveConfiguration);

// DELETE /api/v1/customer/configurations/:id
router.delete('/configurations/:id', optionalJWT as any, customerController.deleteConfiguration);

// GET /api/v1/customer/invoices
router.get('/invoices', optionalJWT as any, customerController.getInvoices);

export default router;
