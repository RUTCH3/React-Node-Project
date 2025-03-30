import { connect } from 'mongoose';

const connectDB = async () => {
    try {
        await connect('mongodb://localhost:27017/Activities');
        console.log('MongoDB Connected...');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

export default connectDB;
