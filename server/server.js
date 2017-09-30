let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("./db/mongoose");
let { Todo } = require("./models/todo");
let { User } = require("./models/user");
let app = express();

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then(
    doc => {
      res.send(doc);
    },
    error => {
      res.status(400).send(error);
    }
  );
  console.log(req.body);
});

app.listen(3000, () => {
  console.log("Server is started");
});

module.exports = app;
