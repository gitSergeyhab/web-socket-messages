import mongoose from "mongoose";
import { logger } from "./logger";

export const mongoConnect = () =>
  mongoose
    .connect(process.env.MONGO_URI!)
    .then(() => logger.info(`MongoDB connected`))
    .catch((err) => logger.error(`MongoDB connection error:: ${err}`));
