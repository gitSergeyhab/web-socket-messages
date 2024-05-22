import mongoose from "mongoose";
import { io } from "../..";

export const mongoConnect = () =>
  mongoose
    .connect(process.env.MONGO!)
    .then(() => {
      console.log("MongoDB connected");
      io.emit("log", "MongoDB connected");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
      io.emit("log", `"MongoDB connection error:", ${err},`);
    })
    .finally(() => io.emit("log", `process.env.MONGO: ${process.env.MONGO}`));
