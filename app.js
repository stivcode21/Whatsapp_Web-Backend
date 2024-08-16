import express from "express";
import cors from "cors";
import { connectDB } from "./src/infrastructure/database/connection.js";
import userRouter from "./src/routes/user.routes.js";
import { PORT } from "./config.js";
import cookieParser from "cookie-parser";

import {
  User,
  Contacts,
  Chats,
  Messages,
  Status,
} from "./src/domain/models/index.js";

import contactsRouter from "./src/routes/contacts.routes.js";
import statusRouter from "./src/routes/status.routes.js";

const app = express();

// Middlewares

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "1mb",
  })
);

app.use(cookieParser());

// Routes

app.use("/user", userRouter);
app.use("/contacts", contactsRouter);
app.use("/status", statusRouter);

// DataBase

connectDB();

try {
  await User.sync();
  console.log("Table Users created");
  await Contacts.sync();
  console.log("Table Contacts created");
  await Chats.sync();
  console.log("Table Chats created");
  await Messages.sync();
  console.log("Table Messages created");
  await Status.sync();
  console.log("Table Status Created");
} catch (error) {
  console.log(error);
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
