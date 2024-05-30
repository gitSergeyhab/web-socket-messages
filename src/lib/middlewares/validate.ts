import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";
import { HttpError } from "../../types/error";

export const validate = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!schema) {
      throw new Error("Invalid schema name");
    }
    const { error } = schema.validate(req.body);
    if (error) {
      const httpError: HttpError = {
        message: error.details.map((d) => d.message).join(", "),
        status: 400,
        name: "Bad Request",
      };
      throw httpError;
    }
    next();
  };
};
