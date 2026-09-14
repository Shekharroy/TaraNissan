import { Router } from 'express';
import { authController } from '../controllers/authController.ts';
import { validateSchema } from '../middleware/validationMiddleware.ts';
import { authenticateJWT } from '../middleware/authMiddleware.ts';

const router = Router();

// POST /api/v1/auth/register & /api/v1/auth/signup
router.post(
  '/register',
  authController.register
);

router.post(
  '/signup',
  authController.register
);

// POST /api/v1/auth/login
router.post(
  '/login',
  authController.login
);

// POST /api/v1/auth/demo-switch (Quick testing for Customer & RBAC Admin/Staff)
router.post('/demo-switch', authController.demoSwitch);

// GET /api/v1/auth/me
router.get('/me', authenticateJWT as any, authController.getCurrentUser);

export default router;
