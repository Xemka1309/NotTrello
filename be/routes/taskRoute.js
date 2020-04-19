const express = require("express");
const taskController = require("../controllers/taskController.js");
const taskRouter = express.Router();

taskRouter.get("/get", taskController.getById);// Task with id
taskRouter.post("/add/task", taskController.add);
taskRouter.put("/edit", taskController.edit);
taskRouter.delete("/delete/task", taskController.delete);
taskRouter.post("/add/tasktopt", taskController.taskToParticipant);
taskRouter.delete("/delete/tasktopt", taskController.deleteTaskToPT);

module.exports = taskRouter;
