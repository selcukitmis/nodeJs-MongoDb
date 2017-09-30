const expect = require("expect");
const request = require("supertest");

const app = require("../server");
const { Todo } = require("./../models/todo");

const todos = [
  {
    text: "Todo 1"
  },
  {
    text: "Todo 2"
  },
  {
    text: "Todo 3"
  }
];

beforeEach(done => {
  Todo.remove({})
    .then(() => {
      return Todo.insertMany(todos);
    })
    .then(() => {
      done();
    });
});

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
