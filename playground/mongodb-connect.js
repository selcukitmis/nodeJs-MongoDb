const { MongoClient, ObjectID } = require("mongodb").MongoClient;

let mongoUrl =
  "mongodb://heroku_68nrvdz3:7457hcjjfb641aatrt6bv0c4ko@ds157624.mlab.com:57624/heroku_68nrvdz3";

// let mongoUrl = process.argv.MONGODB_URI
// ? "mongodb://<dba>:<123123>@ds157624.mlab.com:57624/heroku_68nrvdz3"
// : "mongodb://localhost:27017/TodoApp";

MongoClient.connect(mongoUrl, (err, db) => {
  if (err) {
    console.log("Unable to connect to MongoDb server");
  }
  console.log("Connected to MongoDb server");

  //   db.collection("Todos").insertOne({
  //     text: "Some text",
  //     completed: false
  //   }, (err, result) => {
  //     if (err) console.log("unable to insert todo");
  //     console.log(JSON.stringify(result.ops));
  //   });

  //   db.collection("Users").insertOne({
  //     name: "Selçuk İTMİŞ",
  //     age: 29,
  //     location:"İstanbul"
  //   }, (err, result) => {
  //     if (err) console.log("unable to insert member");
  //     console.log(JSON.stringify(result.ops));
  //   });

  db.close();
});
