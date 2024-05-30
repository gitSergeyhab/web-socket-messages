import Joi from "joi";
import { WebinarEventWithId } from "../../types/event";

export const eventSchema = Joi.object<WebinarEventWithId>({
  id: Joi.number().required(),
  type: Joi.string().valid("SURVEY", "DOWNLOAD", "ANNOUNCED_COURSE").required(),
  showing_time_start: Joi.string().isoDate().required(),
  showing_seconds_duration: Joi.number().positive().required(),
  event_data: Joi.any().required(),
  webinar: Joi.number().required(),
});
