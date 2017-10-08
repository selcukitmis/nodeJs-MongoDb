//https://docs.mongodb.com/manual/reference/operator/update/

const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
  if (err) {
    console.log("Unable to connect to MongoDb server");
  }
  console.log("Connected to MongoDb server");

  // db
  //   .collection("Users")
  //   .findOneAndUpdate(
  //     {
  //       _id: new ObjectID("59cd6c049b8c3070893a831d")
  //     },
  //     {
  //       $set: {
  //         age: 30
  //       }
  //     },
  //     {
  //       returnOriginal: true
  //     }
  //   )
  //   .then(result => {
  //     console.log(result);
  //   });

  db
    .collection("Users")
    .findOneAndUpdate(
      {
        _id: new ObjectID("59cd6c049b8c3070893a831d")
      },
      {
        $set: {
          name: "Test"
        },
        $inc: {
          age: 5 // age field ını 5 arttırır
        }
      },
      {
        returnOriginal: false
      }
    )
    .then(result => {
    });

  //db.close();
});
