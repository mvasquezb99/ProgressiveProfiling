import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  mongoose.set('debug', (collectionName, methodName, arg1, arg2, arg3) => {
    console.log(`[Mongoose Debug] ${collectionName}.${methodName}`, arg1, arg2, arg3);
  });

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  console.log('✅ Connected to MongoDB');
  return cached.conn;
}

export default dbConnect;
