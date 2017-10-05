const { Todo } = require("./../../models/todo");
const { User } = require("./../../models/user");
const { ObjectID } = require("mongodb");
const jwt = require("jsonwebtoken");

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const todos = [
  {
    _id: new ObjectID(),
    text: "Todo 1",
    _creator: userOneId
  },
  {
    _id: new ObjectID(),
    text: "Todo 2",
    _creator: userOneId
  },
  {
    _id: new ObjectID(),
    text: "Todo 3",
    _creator: userTwoId
  }
];

const populateTodos = done => {
  Todo.remove({})
    .then(() => {
      return Todo.insertMany(todos);
    })
    .then(() => {
      done();
    });
};

const users = [
  {
    _id: userOneId,
    email: "andreq@example.com",
    password: "onepass",
    tokens: [
      {
        access: "auth",
        token: jwt
          .sign({ _id: userOneId.toHexString(), access: "auth" }, process.env.JWT_SECRET)
          .toString()
      }
    ]
  },
  {
    _id: userTwoId,
    email: "andrew@example.com",
    password: "twopass",
    tokens: [
      {
        access: "auth",
        token: jwt
          .sign({ _id: userTwoId.toHexString(), access: "auth" }, process.env.JWT_SECRET)
          .toString()
      }
    ]
  }
];

const populateUsers = done => {
  User.remove({})
    .then(() => {
      let userOne = new User(users[0]).save();
      let userTwo = new User(users[1]).save();
      return Promise.all([userOne, userTwo]);
    })
    .then(() => {
      done();
    });
};

module.exports = {
  todos,
  populateTodos,
  users,
  populateUsers
};
