const express = require("express");
const taskController = require("../controllers/taskController.js");
const taskRouter = express.Router();

taskRouter.get("/get", taskController.getById);// Task with id
taskRouter.post("/add/task", taskController.add);
taskRouter.put("/edit", taskController.edit);
taskRouter.delete("/delete/task", taskController.delete);
taskRouter.post("/add/tasktopt", taskController.taskToPT);
taskRouter.delete("/delete/tasktopt", taskController.deleteTaskToPT);
taskRouter.post("/add/tasktomark", taskController.taskToMark);
taskRouter.delete("/delete/tasktomark", taskController.deleteTaskToMark);

module.exports = taskRouter;
