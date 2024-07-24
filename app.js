require("dotenv").config();
const express = require("express");
const DBConnect = require("./src/infrastructure/database/mongoose");
const config = require("./config");
const PORT = config.port || 3000;
const routerUser = require("./src/routes/user.routes");

const app = express();

app.use(express.json());
//Router
app.use(routerUser);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  DBConnect();
});

module.exports = app;
