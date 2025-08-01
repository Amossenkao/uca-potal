import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: 'uca',
    });
    isConnected = true;
    console.log("Connected to MongoDB with Mongoose");
  } catch (err) {
    console.error(" MongoDB connection error:", err);
    throw err;
  }
};
