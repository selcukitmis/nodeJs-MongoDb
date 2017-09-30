let mongoose = require("mongoose");

let mongoUrl =
"mongodb://heroku_68nrvdz3:7457hcjjfb641aatrt6bv0c4ko@ds157624.mlab.com:57624/heroku_68nrvdz3";

// let mongoUrl = process.argv.MONGODB_URI
// ? "mongodb://<dba>:<123123>@ds157624.mlab.com:57624/heroku_68nrvdz3"
// : "mongodb://localhost:27017/TodoApp";

mongoose.Promise = global.Promise;

mongoose.connect(mongoUrl, { useMongoClient: true });

module.exports = {
  mongoose
};
