const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    lastName: String,
    email: String,
  },
  {
    versionKey: false,
  }
);
const User = mongoose.model("Users", userSchema);

module.exports = User;
