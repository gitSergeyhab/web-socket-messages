import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { errorHandler } from "./lib/utils/middlewares/errorHandler";
import { mongoConnect } from "./lib/utils/mongoConnect";
import { connectionHandler } from "./socketHandlers/connectionHandler";
import { router } from "./routes";

dotenv.config();

const app = express();

const server = http.createServer(app);

app.use(express.json());

const hosts = process.env.ALLOWED_ORIGINS?.split(",") || [];

// const origin = process.env.NODE_ENV === "development" ? hosts : "*";
const origin = "*";

app.use(
  cors({
    origin,
    methods: ["GET", "POST"],
  })
);

app.use("/api/v1", router);

export const io = new Server(server, { cors: { origin } });

app.use(errorHandler);

io.on("connection", (socket) => connectionHandler(io, socket));

mongoConnect();

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}, mode`);
});
