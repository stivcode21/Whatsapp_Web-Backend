import StatusController from "../controllers/status.controller.js";
import { Router } from "express";
const statusRouter = Router();

statusRouter.post("/:user_id/add", StatusController.addNewStatus);

export default statusRouter;
