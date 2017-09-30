let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("./db/mongoose");
let { Todo } = require("./models/todo");
let { User } = require("./models/user");
let { ObjectID } = require("mongodb");
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

app.get("/todos", (req, res) => {
  Todo.find({})
    .then(todos => {
      res.send(todos);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.get("/todos/:id", (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(400).send();
  }
  Todo.findById(id)
    .then(todo => {
      if (!todo) {
      res.status(400).send();
      }
      res.send({todo});
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.listen(3000, () => {
  console.log("Server is started");
});

module.exports = app;
