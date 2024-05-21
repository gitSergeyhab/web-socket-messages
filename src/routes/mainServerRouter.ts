import { Router } from "express";
import { reSendEvent } from "../controllers/events";

const mainServerRouter = Router();
mainServerRouter.post("/event/", reSendEvent);

export { mainServerRouter };
