import mongoose from "mongoose";

let isConnected = false;

const dbConnection = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("MongoDB is already connected");
    return
  }

  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/next-ecommerce`);
    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

export default dbConnection;
