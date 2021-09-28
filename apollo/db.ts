import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable undefined.');
}

// The connection is cached in `global` across hot reloads in development.
// Ignoring complaints that `global` has no index signature.
// @ts-ignore
let cached = global.mongoose;

if (!cached) {
  // @ts-ignore
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Returns a connection to MongoDB, either from cache or by opening a new connection.
 */
export const connectToDb = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;

  return cached.conn;
};
