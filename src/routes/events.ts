import { Router } from "express";
import { reSendEvent } from "../controllers/events";
import { webinarEventWithIdSchema } from "../lib/validation/event";
import { validate } from "../lib/middlewares/validate";

const eventsRouter = Router();
eventsRouter.post("/new/", validate(webinarEventWithIdSchema), reSendEvent);

export { eventsRouter };
