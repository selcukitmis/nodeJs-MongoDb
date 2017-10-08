const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
  if (err) {
    console.log("Unable to connect to MongoDb server");
  }
  console.log("Connected to MongoDb server");

  db
    .collection("Users")
    .find({
      //_id: new ObjectId("59cc248124d9d56ccb88609b")
    })
    .toArray()
    .then(
      docs => {
        console.log(JSON.stringify(docs, undefined, 2));
      },
      err => {
        console.log("We have error: ", err);
      }
    );

  db.close();
});
