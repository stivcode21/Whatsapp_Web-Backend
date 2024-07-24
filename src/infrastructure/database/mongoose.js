const mongoose = require("mongoose");
const config = require("../../../config");

async function DBConnect() {
  try {
    await mongoose.connect(config.db.url);
    console.log("Database connected!");
  } catch (error) {
    console.log("DB: Error!" + error);
  }
}
module.exports = DBConnect;