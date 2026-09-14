import { Router } from 'express';
import { vehicleController } from '../controllers/vehicleController.ts';

const router = Router();

// GET /api/v1/vehicles
router.get('/', vehicleController.getVehicles);

// GET /api/v1/vehicles/compare?v1=TEKTON&v2=MAGNITE
router.get('/compare', vehicleController.compare);

// GET /api/v1/vehicles/:id
router.get('/:id', vehicleController.getVehicleById);

export default router;
