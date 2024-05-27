import { Request, Response } from "express";
import { io } from "../";

export const reSendEvent = (req: Request, res: Response) => {
  const { event, webinar_id } = req.body;
  io.to(String(webinar_id)).emit("event", event);
  res.status(201).json({ message: "event has been sent" });
};
