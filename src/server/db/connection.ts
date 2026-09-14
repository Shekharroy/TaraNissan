import 'dotenv/config';
import mongoose from 'mongoose';

let isConnected = false;
let connectionAttempted = false;

const DEFAULT_MONGODB_URI = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.9.2';

export async function connectDB(): Promise<boolean> {
  if (isConnected) {
    return true;
  }

  const mongoUri = process.env.MONGODB_URI || DEFAULT_MONGODB_URI;

  try {
    connectionAttempted = true;
    console.log(`[Database] Attempting MongoDB connection to: ${mongoUri.replace(/\/\/.*@/, '//***:***@')}`);

    // Set connection timeout to 2000ms so server responds swiftly
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 2000,
      connectTimeoutMS: 2000,
    });

    isConnected = true;
    console.log('[Database] MongoDB connected successfully via Mongoose ODM.');

    mongoose.connection.on('error', (err) => {
      console.error('[Database] MongoDB connection runtime error:', err.message);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('[Database] MongoDB disconnected. Falling back to resilient active buffer.');
      isConnected = false;
    });

    return true;
  } catch (error: any) {
    console.warn(`[Database] MongoDB server not available (${error.message}). Running in resilient fallback store mode with in-memory persistence.`);
    isConnected = false;
    return false;
  }
}

export function isDbConnected(): boolean {
  return isConnected && mongoose.connection.readyState === 1;
}
