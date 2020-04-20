const express = require("express");
const taskController = require("../controllers/taskController.js");
const taskRouter = express.Router();

taskRouter.get("/get", taskController.getById);// Task with id
taskRouter.post("/add", taskController.add);
taskRouter.put("/edit", taskController.edit);
taskRouter.delete("/delete", taskController.delete);
taskRouter.post("/topt/add", taskController.taskToPT);
taskRouter.delete("/topt/delete", taskController.deleteTaskToPT);
taskRouter.post("/tomark/add", taskController.taskToMark);
taskRouter.delete("/tomark/delete", taskController.deleteTaskToMark);

module.exports = taskRouter;
