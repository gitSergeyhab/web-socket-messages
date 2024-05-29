import { Request, Response } from "express";
import { io } from "../";
import { WebinarEventWithId } from "../types/event";

export const reSendEvent = (req: Request, res: Response) => {
  const { webinar, ...restData } = req.body as WebinarEventWithId;
  io.to(String(webinar)).emit("event", restData);
  res.status(201).json({ message: "event has been sent" });
};
