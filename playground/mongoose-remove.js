const { ObjectID } = require("mongodb");
const { mongoose } = require("./../server/db/mongoose");
const { Todo } = require("./../server/models/todo");
const { User } = require("./../server/models/user");
var id = "59d00d95518ca5e2e4d4d06a";

// Todo.remove({}).then(res => {
//   console.log(res);
// });

// Todo.findByIdAndRemove(id).then(res => {
//   console.log("Todo Removed", res);
// });

Todo.findOneAndRemove({ _id: id }).then(res => {
  console.log("Todo Removed", res);
});
