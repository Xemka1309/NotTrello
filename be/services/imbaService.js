const TaskService = require("./taskService");
const TaskMark = require("../models/taskMarkModel");

exports.doImbaWithMarks = (async function (body) {
    const mark_ids = TaskMark.findAll()
    return Promise.all(body.marks_ids.map(async function (mark_id) {
        await TaskService.deleteTaskToMark(body.task_id, mark_id);
        return TaskService.taskToMark(body.task_id, mark_id);
    }))
});
