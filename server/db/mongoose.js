let mongoose = require("mongoose");

let mongoUrl = process.env.MONGODB_URI;

mongoose.Promise = global.Promise;

mongoose.connect(mongoUrl, { useMongoClient: true });

module.exports = {
  mongoose
};
