const { ObjectID } = require("mongodb");
const { mongoose } = require("./../server/db/mongoose");
const { Todo } = require("./../server/models/todo");
const { User } = require("./../server/models/user");
var id = "59cfaea4513b58d49e755b59";

if (!ObjectID.isValid(id)) {
  console.log("Id not valid");
}

Todo.find({
  _id: id
}).then(todos => {
  console.log("Todos", todos);
});

Todo.findOne({
  _id: id
}).then(todos => {
  console.log("Todo", todos);
});

Todo.findById(id).then(todos => {
  console.log("Todo By Id", todos);
});
