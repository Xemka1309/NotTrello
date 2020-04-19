const express = require("express");
const taskController = require("../controllers/taskController.js");
const taskRouter = express.Router();

taskRouter.get("/get", taskController.getById);// Task with id
taskRouter.post("/add", taskController.add);
taskRouter.put("/edit", taskController.edit);
taskRouter.delete("/delete", taskController.delete);

module.exports = taskRouter;
