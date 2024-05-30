import { Router } from "express";
import { reSendEvent } from "../controllers/events";
import { eventSchema } from "../lib/validation/event";
import { validate } from "../lib/middlewares/validate";

const eventsRouter = Router();
eventsRouter.post("/new/", validate(eventSchema), reSendEvent);

export { eventsRouter };
