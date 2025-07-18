import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    // If the connection is already established, return it
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    // Create a new promise to establish a connection
    cached.promise = mongoose
      .connect(`${process.env.MONGODB_URI}/ecom-prac`, opts)
      .then((mongooseInstance) => mongooseInstance)
      .catch((error) => {
        cached.promise = null;
        throw error;
      });
  }

  // Wait for the connection to be established and return it
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
