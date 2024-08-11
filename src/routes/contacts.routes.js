import { Router } from "express";
import ContactsController from "../controllers/contacts.controller.js";

const contactsRouter = Router()

contactsRouter.post("/filter", ContactsController.filter)
contactsRouter.post("/add", ContactsController.add)

export default contactsRouter