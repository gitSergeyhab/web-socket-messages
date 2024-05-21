import { Router } from "express";
import { mainServerRouter } from "./mainServerRouter";

const router = Router();

router.use("/server", mainServerRouter);

export { router };
