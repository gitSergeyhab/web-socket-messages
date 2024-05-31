import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { connectionHandler } from "./socketHandlers/connectionHandler";
import { router } from "./routes";
import morgan from "morgan";
import { logger } from "./lib/utils/logger";
import { mongoConnect } from "./lib/utils/mongoConnect";
import { errorHandler } from "./lib/middlewares/errorHandler";

dotenv.config();

const app = express();

const server = http.createServer(app);

app.use(express.json());

const hosts = process.env.ALLOWED_ORIGINS?.split(",") || [];

const origin = process.env.NODE_ENV === "development" ? hosts : "*";

app.use(
  cors({
    origin,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

app.use("/api/v1", router);

export const io = new Server(server, { cors: { origin } });

app.use(errorHandler);

io.on("connection", (socket) => connectionHandler(io, socket));

mongoConnect();

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
