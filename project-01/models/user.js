const { default: mongoose, mongo } = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
  });

const User = mongoose.model("user", userSchema);

module.exports = User;