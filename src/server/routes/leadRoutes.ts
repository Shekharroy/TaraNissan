import { Router } from 'express';
import { leadController } from '../controllers/leadController.ts';

const router = Router();

// POST /api/v1/leads (general lead creation)
router.post('/', leadController.create);

// POST /api/v1/leads/track-call (Telephony CTA Click telemetry)
router.post('/track-call', leadController.trackCall);

// POST /api/v1/leads/track-whatsapp (WhatsApp Click telemetry)
router.post('/track-whatsapp', leadController.trackWhatsApp);

// POST /api/v1/leads/track-click (Section 6 Click Telemetry: channel: "whatsapp" | "call", vehicleId)
router.post('/track-click', leadController.trackClick);

// GET /api/v1/leads (recent leads for audit/dashboard)
router.get('/', leadController.getRecent);

// GET /api/v1/leads/stats (conversion counts)
router.get('/stats', leadController.getStats);

export default router;
