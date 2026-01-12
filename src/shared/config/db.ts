import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        const uri = process.env.MONGO_URI;

        if (!uri) {
            throw new Error('MONGO_URI is not defined');
        }

        await mongoose.connect(uri)

        console.log('✅ MongoDB connected')
    } catch (error) {
        console.error('❌ Mongo DB connection error', error);
        process.exit(1);
    }
};