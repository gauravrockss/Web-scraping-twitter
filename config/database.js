import { connect } from 'mongoose';

async function connectDB() {
    try {
        const connectionString = process.env.MONGODB_CONNECTION_STRING;

        if (!connectionString) return console.log('connection failed: Connection string must be specified');

        await connect(connectionString);
        console.log('MongoDB Connected');
    } catch (error) {}
}

export default connectDB;
