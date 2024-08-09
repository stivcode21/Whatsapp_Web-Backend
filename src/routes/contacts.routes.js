import { Router } from "express";
import ContactsController from "../controllers/contacts.controller.js";

const contactsRouter = Router()

contactsRouter.post("/add", ContactsController.add)

export default contactsRouter