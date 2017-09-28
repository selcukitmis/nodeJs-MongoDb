const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/TodoApp");

var todo = mongoose.model("Todo", {
  text: { type: String },
  completed: { type: Boolean },
  completedAt: { type: Number }
});

// var newTodo = new todo({
//   text: "Cook Dinner"
// });

// newTodo.save().then(
//   doc => {
//     console.log("Saved doc: ", doc);
//   },
//   error => {
//     console.log("Unable to the server");
//   }
// );


var newTodo2 = new todo({
    text: "Cook Dinner",
    completed:false,
    completedAt:234
  });
  
  newTodo2.save().then(
    doc => {
      console.log("Saved doc: ", doc);
    },
    error => {
      console.log("Unable to the server");
    }
  );
  