import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

export const validate = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!schema) {
      return res.status(500).json({ error: "Invalid schema name" });
    }
    const { error } = schema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ error: error.details.map((d) => d.message).join(", ") });
    }
    next();
  };
};
