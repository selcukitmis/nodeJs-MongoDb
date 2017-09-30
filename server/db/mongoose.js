let mongoose = require("mongoose");
let mongoUrl = process.argv.MONGODB_URI || "mongodb://localhost:27017/TodoApp";
mongoose.Promise = global.Promise;

mongoose.connect(mongoUrl, { useMongoClient: true });

module.exports = {
  mongoose
};
