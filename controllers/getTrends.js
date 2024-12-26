import Trend from '../models/Trend.js';

// Controller function to get trends
export async function getTrends(req, res) {
    try {
        // Fetch all trends from the database
        const trends = await Trend.find().sort({ timestamp: -1 }); // You can sort by timestamp or another field if needed
        res.status(200).json({
            success: true,
            data: trends,
        });
    } catch (error) {
        console.error('Error fetching trends:', error);
        res.status(500).json({
            success: false,
            error: 'Server error while fetching trends.',
        });
    }
}
