import { Router } from 'express';
import { testDriveController } from '../controllers/testDriveController.ts';
import { validateSchema } from '../middleware/validationMiddleware.ts';

const router = Router();

// POST /api/v1/test-drives
router.post(
  '/',
  validateSchema([
    { field: 'vehicleModel', required: true, message: 'Vehicle model selection is required.' },
    { field: 'fullName', required: true, min: 2, message: 'Full name is required.' },
    { field: 'phone', required: true, type: 'phone', message: 'Valid 10-digit mobile number is required.' },
    { field: 'email', required: true, type: 'email', message: 'Valid email address is required.' },
    { field: 'bookingDate', required: true, message: 'Booking date is required.' },
    { field: 'timeSlot', required: true, message: 'Time slot selection is required.' },
  ]),
  testDriveController.book
);

// GET /api/v1/test-drives/by-phone?phone=...
router.get('/by-phone', testDriveController.getByPhone);

// GET /api/v1/test-drives/:ref
router.get('/:ref', testDriveController.getByRef);

export default router;
