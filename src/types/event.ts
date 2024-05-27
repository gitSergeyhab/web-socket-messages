export type EventType = "SURVEY" | "DOWNLOAD" | "ANNOUNCED_COURSE";

export interface WebinarEvent {
  id: number;
  type: EventType;
  showing_time_start: string;
  showing_seconds_duration: number;
  event_data: unknown;
}

export interface WebinarEventWithId {
  event: WebinarEvent;
  webinar_id: number;
}
