const expect = require("expect");
const request = require("supertest");
const app = require("../server");
const { Todo } = require("./../models/todo");
const { User } = require("./../models/user");
const { ObjectID } = require("mongodb");
const { todos, populateTodos, users, populateUsers } = require("./seed/seed");

beforeEach(populateTodos);
beforeEach(populateUsers);

describe("POST /todos", () => {
  it("Yeni todo kaydedileck", done => {
    var text = "Text of todo";
    request(app)
      .post("/todos")
      .send({ text })
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) return done(err);
        Todo.find({ text })
          .then(todos => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          })
          .catch(e => {
            done(e);
          });
      });
  });

  it("invalid data ile kaydedilemezse çalışacak", done => {
    request(app).post("/todos").send({}).expect(400).end((err, res) => {
      if (err) return done(err);

      Todo.find({})
        .then(todos => {
          expect(todos.length).toBe(3);
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });

  it("hepsini getirmeli", done => {
    request(app)
      .get("/todos")
      .expect(200)
      .expect(res => {
        console.log(res.body);
        expect(res.body.length).toBe(3);
      })
      .end(done);
  });
});

describe("GET todos/:id", () => {
  it("id ye göre todo getirmesi gerekir", done => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });
});

describe("DELETE todos/:id", () => {
  it("id ye göre todo getirmesi gerekir", done => {
    request(app)
      .delete(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });
});

describe("PATCH todos/:id", () => {
  it("todo güncellemesi gerekir", done => {
    var hexId = todos[1]._id.toHexString();
    var text = "Updated Text";

    request(app)
      .patch(`/todos/${hexId}`)
      .send({ text, completed: true })
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
      })
      .end(done);
  });
});

describe("GET /users/me", () => {
  it("should return user if authenticatid", done => {
    request(app)
      .get("/users/me")
      .set("x-auth", users[0].tokens[0].token)
      .expect(200)
      .expect(res => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });
  it("should return 401 if not authenticatid", done => {
    request(app)
      .get("/users/me")
      .expect(401)
      .expect(res => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});

describe("POST /users", () => {
  it("should create a user", done => {
    let email = "sss@sss.com";
    let password = "sssddd";
    request(app)
      .post("/users")
      .send({ email, password })
      .expect(200)
      .expect(response => {
        //expect(response.headers["x-auth"]).toExist();
        expect(response.body.email).toBe(email);
      })
      .end(err => {
        if (err) {
          return done(err);
        }
        User.findOne({ email }).then(result => {
          expect(result).toExist();
          expect(result.password).toNotBe(password);
          done();
        });
        done();
      });
  });

  it("should return validation errors if request invalid", done => {
    request(app)
      .post("/users")
      .send({ email: "aaa", password: "sss" })
      .expect(400)
      .end(done);
  });

  it("should not create user if email in use", done => {
    request(app)
      .post("/users")
      .send({ email: users[0].email, password: "sss" })
      .expect(400)
      .end(done);
  });
});
