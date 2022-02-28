const express = require("express");
const cors = require("cors");
const pool = require("./db");

var app = express();

//middleware
app.use(cors());
app.use(express.json());

//Routes
//craete todo
app.post("/todo", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
    res.send("new todo added successfully");
  } catch (err) {
    console.log(err);
  }
});

//get all todos
app.get("/todos", async (req, res) => {
  console.log("asdasdas");
  const allTodos = await pool.query("SELECT * FROM todo");
  res.json(allTodos.rows);
});

app.listen(5000, () => {
  console.log("port running on 5000");
});
