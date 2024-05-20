import mongoose from "mongoose";

export const mongoConnect = () =>
  mongoose
    .connect(process.env.MONGO_URI!)
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });
