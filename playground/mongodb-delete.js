const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
  if (err) {
    console.log("Unable to connect to MongoDb server");
  }
  console.log("Connected to MongoDb server");

  // deleteMany

  // db.collection("Todos").deleteMany({ text: "Some text" }).then(result => {
  //   console.log(result);
  // });

  // deleteOne

  // db.collection("Todos").deleteOne({ text: "Some text" }).then(result => {
  //   console.log(result);
  // });

  //findOneAndDelete

  // db.collection("Todos").findOneAndDelete({ completed:true }).then(result => {
  //   console.log(result);
  // });

  db.collection("Users").deleteMany({ _id: new ObjectID("59cc248124d9d56ccb88609b") }).then(result => {
    console.log(result);
  });

  //db.close();
});
