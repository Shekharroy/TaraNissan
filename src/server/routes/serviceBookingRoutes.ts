import { Router } from 'express';
import { serviceBookingController } from '../controllers/serviceBookingController.ts';
import { validateSchema } from '../middleware/validationMiddleware.ts';

const router = Router();

// POST /api/v1/service-bookings and /api/v1/service/book
router.post(
  '/',
  serviceBookingController.book
);

router.post(
  '/book',
  serviceBookingController.book
);

// GET /api/v1/service-bookings/by-phone?phone=...
router.get('/by-phone', serviceBookingController.getByPhone);

// GET /api/v1/service-bookings/:ref
router.get('/:ref', serviceBookingController.getByRef);

export default router;
