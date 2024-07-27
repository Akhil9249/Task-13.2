const express = require("express");
const app = express();
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

app.use(cors());
app.use(express.json());


const todoList = [];

app.get("/api/todo", (req, res) => {
    res.json(todoList);
});
app.post("/api/todo", (req, res) => {
    const { todo } = req.body;
    if (!("todo" in req.body)) {
        return res.status(400).json({
            message: `${JSON.stringify(req.boy)}:This attribute is not accepted, Required attributes:todo`,
        });
    }
    const newItem = { id: uuidv4(), text: todo, crossLine: false };
    todoList.push(newItem);
    res.json(todoList);
});
app.put("/api/todo", (req, res) => {
    const { id, text, crossLine } = req.body;

    const isExist = todoList.find((data) => data.id === id);

    if (isExist) {
        todoList.forEach((todoItem) => {
            if (todoItem.id == id) {
                (todoItem.text = text), (todoItem.crossLine = crossLine);
            }
        });

        return res.json(todoList);
    }

    res.status(404).json({
        message: `Item with id:${id} does not exist`,
    });
});

app.put("/api/todo/mark", (req, res) => {
    const { id, crossLine } = req.body;

    const isExist = todoList.find((data) => data.id === id);

    if (isExist) {
        todoList.forEach((todoItem) => {
            if (todoItem.id == id) {
                todoItem.crossLine = crossLine;
            }
        });

        return res.json(todoList);
    }

    res.status(404).json({
        message: `Item with id:${id} does not exist`,
    });
});

app.delete("/api/todo", (req, res) => {
    const { id } = req.body;
    const itemIndex = todoList.findIndex((data) => data.id === id);
    if (itemIndex !== -1) {
        todoList.splice(itemIndex, 1);
        return res.json(todoList);
    }
});
app.get("/api",(req,res)=>{
    res.status(404).send("This is api page")
})

app.get("*",(req,res)=>{
    res.status(404).send("Page not found")
})

// app.all("*",(req,res)=>{
//     res.status(404).send("Page not found")
// })

app.listen(3001, () => console.log("server started in 3001"));
