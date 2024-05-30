import { createLogger, format, transports } from "winston";

export const logger = createLogger({
  level: "debug",
  format: format.combine(
    format.timestamp({
      format: "DD.MM.YYYY HH:mm:ss",
    }),
    format.printf(
      (info) => `${info.timestamp} / ${info.level} : ${info.message}`
    )
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "log-file.log" }),
  ],
});
