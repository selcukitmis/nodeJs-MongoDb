const { MongoClient, ObjectID } = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
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
