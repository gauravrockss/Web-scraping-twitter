import express from 'express';
import { scrapeTwitterTrends } from '../controllers/scrapeController.js';

const router = express.Router();

// Route to trigger the scraping function
router.get('/scrape-trends', async (req, res, next) => {
    try {
        const trends = await scrapeTwitterTrends();
        res.json({ success: true, trends });
    } catch (e) {
        next(e);
    }
});

export default router;
