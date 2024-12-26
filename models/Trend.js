import mongoose from 'mongoose';

const trendSchema = new mongoose.Schema({
    topics: { type: [String], required: true }, // Array of topics
    requestId: { type: String, required: true },
    ipAddress: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

const Trend = mongoose.model('Trend', trendSchema);

export default Trend;
