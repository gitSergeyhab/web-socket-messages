import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { errorHandler } from "./lib/utils/middlewares/errorHandler";
import { mongoConnect } from "./lib/utils/mongoConnect";
import { connectionHandler } from "./socketHandlers/connectionHandler";

dotenv.config();

const app = express();

const server = http.createServer(app);

app.use(express.json());

const origin = process.env.ALLOWED_ORIGINS?.split(",") || [];

const io = new Server(server, {
  cors: {
    origin,
    methods: ["GET", "POST", "DELETE"],
  },
});

app.use(errorHandler);

io.on("connection", (socket) => connectionHandler(io, socket));

mongoConnect();

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
