const TaskService = require("./taskService");
const TaskMark = require("../models/taskMarkModel");

exports.doImbaWithMarks = (async function (body) {
    const mark_ids = await TaskMark.findAll({
        attributes: ['mark_id'],
        where: {
            task_id: body.task_id
        }
    });
    await Promise.all(mark_ids.map(async function (mark_id) {
        return TaskService.deleteTaskToMark(body.task_id, mark_id);
    }));
    return Promise.all(body.marks_ids.map(async function (mark_id) {
        return TaskService.taskToMark(
            {
                task_id: body.task_id,
                mark_id
            }
            );
    }));
});
