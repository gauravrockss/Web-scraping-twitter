import express from 'express';
import { getTrends } from '../controllers/getTrends.js';

const router = express.Router();

// Define the route to fetch trends
router.get('/trends', getTrends);

export default router;
