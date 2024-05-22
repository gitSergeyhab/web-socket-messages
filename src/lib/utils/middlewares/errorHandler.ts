import { Request, Response, NextFunction } from "express";
import { logger } from "../logger";

interface HttpError extends Error {
  status?: number;
  statusCode?: number;
}

export const errorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err);
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Something went wrong. Try again later";
  logger.error(`status: ${status}: ${message}`);
  res.status(status).json({ message });
};
