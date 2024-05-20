import { Request, Response, NextFunction } from "express";

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
  res.status(status).json({ message });
};
