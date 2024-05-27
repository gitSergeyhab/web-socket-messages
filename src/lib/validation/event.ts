import Joi from "joi";
import { WebinarEventWithId } from "../../types/event";

export const eventSchema = Joi.object({
  id: Joi.number().required(),
  type: Joi.string().valid("SURVEY", "DOWNLOAD", "ANNOUNCED_COURSE").required(),
  showing_time_start: Joi.string().isoDate().required(),
  showing_seconds_duration: Joi.number().positive().required(),
  event_data: Joi.any().required(),
});

export const webinarEventWithIdSchema = Joi.object<WebinarEventWithId>({
  event: eventSchema.required(),
  webinar_id: Joi.number().integer().positive().required(),
});
