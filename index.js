const express = require("express");
const cors = require("cors");
const pool = require("./db");

var app = express();

//middleware
app.use(cors());
app.use(express.json());

//Routes
//create todo
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
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.log(err);
  }
});

//get single todo
app.get("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    if (todo) {
      res.json(todo.rows[0]);
    } else {
      res.json("No such Todo found");
    }
  } catch (err) {
    console.log(err);
  }
});

//update todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updatedTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id=$2 RETURNING *",
      [description, id]
    );
    res.json("Todo Was updated");
  } catch (e) {
    console.log(e);
  }
});

//delete todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await pool.query(
      "DELETE FROM todo WHERE todo_id = $1 RETURNING *",
      [id]
    );
    res.json("Todo was deleted");
  } catch (e) {
    console.log(e);
  }
});

app.listen(5000, () => {
  console.log("port running on 5000");
});
