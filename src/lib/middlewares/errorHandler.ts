import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";
import { HttpError } from "../../types/error";

export const errorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong. Try again later";
  logger.error(`status: ${status}: ${message}`);
  res.status(status).json({ message });
};
