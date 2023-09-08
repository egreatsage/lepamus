import express from 'express'
const router = express.Router();
import { protect} from '../middleware/authMiddleware.js';
import { addBooking } from '../controllers/bookingController.js';




router.post('/addbooking',addBooking)

export default router;