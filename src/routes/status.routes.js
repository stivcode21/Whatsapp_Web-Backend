import StatusController from "../controllers/status.controller.js";
import { Router } from "express";
const statusRouter = Router();

statusRouter.post("/:user_id/add", StatusController.addNewStatus);
statusRouter.delete(
  "/:user_id/delete/:status_id",
  StatusController.deleteStatusManually
);

export default statusRouter;
