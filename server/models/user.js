var mongoose = require("mongoose");

var User = mongoose.model("User", {
    email: {
      type: String,
      required: true,
      trim: true,
      max: 30,
      min: 5,
      unique: true
    }
  });

module.exports = {
    User
};