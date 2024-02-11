import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(bodyParser.json());
app.use(cors());

var id_count = 0;
var todoList = [];

// get a todo
app.get("/todoList", (req, res) => {
  res.send(todoList);
});

// create or update todo
app.post("/todoList", (req, res) => {
  const type = req.body.type ?? "";
  if (type === "") return;

  // create a new todo
  if (type === "create") {
    const title = req.body.title ?? "n/a";
    const description = req.body.description ?? "";
    todoList.push({
      id: id_count,
      title: title,
      description: description,
      completed: false,
    });
    id_count++;
    res.send(todoList);
    return;
  }

  const id = req.body.id ?? -1;
  if (id === -1) return;

  // set a checkbox in a todo true/false
  if (type === "check") {
    const completed = req.body.completed ?? false;
    todoList.forEach((element, index) => {
      if (element.id === id) {
        todoList[index].completed = completed;
        return;
      }
    });
    res.send(todoList);
    return;
  }

  // change a todo's title/description
  if (type === "update") {
    const title = req.body.title ?? "n/a";
    const description = req.body.description ?? "";
    todoList.forEach((element, index) => {
      if (element.id === id) {
        todoList[index].title = title;
        todoList[index].description = description;
        return;
      }
    });
    res.send(todoList);
    return;
  }
});

// delete a todo
app.delete("/todoList", (req, res) => {
  const id = req.body.id ?? -1;
  if (id !== -1) {
    todoList = todoList.filter((item) => item.id !== id);
  }
  res.send(todoList);
});

app.listen(5000, () => {
  console.log("app is listening to port 5000");
});
