import express from 'express';
import {
  registerUser,
  bookVisit,
  getAllBookings,
  cancelBooking,
  addResidencyToFavorites,
  getAllFavorites,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/bookVisit/:id', bookVisit);
router.get('/getAllBookings', getAllBookings);
router.post('/cancelBooking/:id', cancelBooking);
router.post('/addResidencyToFavorites/:id', addResidencyToFavorites);
router.get('/getAllFavorites', getAllFavorites);

export { router as userRoutes };
