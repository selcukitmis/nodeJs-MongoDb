require("./config/config");
let _ = require("lodash");
let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("./db/mongoose");
let { Todo } = require("./models/todo");
let { User } = require("./models/user");
let { ObjectID } = require("mongodb");
let app = express();

const port = process.env.PORT;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send({
    type: process.env.MONGODB_URI
  });
});

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
      res.send({ todo });
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(400).send();
  }
  Todo.findByIdAndRemove(id)
    .then(todo => {
      if (!todo) {
        res.status(400).send();
      }
      res.send({ todo });
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.patch("/todos/:id", (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(400).send();
  }
  var body = _.pick(req.body, ["text", "completed"]);
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }
  Todo.findOneAndUpdate(id, { $set: body }, { new: true })
    .then(todo => {
      if (!todo) {
        res.status(400).send();
      }
      res.send({ todo });
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.listen(port, () => {
  console.log("Server is started");
});

module.exports = app;
