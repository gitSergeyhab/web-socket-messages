import mongoose from "mongoose";
import { logger } from "./logger";

export const mongoConnect = () => {
  logger.info(
    `start mongo connection, hosts: ${process.env.ALLOWED_ORIGINS} / mon: ${process.env.MONGO_URI}`
  );
  mongoose
    .connect(process.env.MONGO_URI!)
    .then(() => logger.info(`MongoDB connected`))
    .catch((err) => logger.error(`MongoDB connection error:: ${err}`))
    .finally(() => logger.info("end mongo connection"));
};
