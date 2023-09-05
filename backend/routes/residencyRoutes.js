import express from 'express';
import {
  createResidency,
  getResidencies,
  getResidencyById,
} from '../controllers/residencyController.js';

const router = express.Router();

router.post('/create', createResidency);
router.get('/getAllRes', getResidencies);
router.get('/:id', getResidencyById);

export { router as residencyRoutes };
