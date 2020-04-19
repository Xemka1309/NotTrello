const Task = require("../models/taskModel");
const TaskPriority = require("../models/taskPriorityModel");
const TaskToParticipant = require("../models/participantTaskModel");
const CheckListService = require("./checkListService");

exports.add = (async function(body){
    return await Task.create(body);
});

exports.edit = (async function (body) {
    return Task.update(
        body,
        {where: {id: body.id}})
});

exports.delete = (async function (body) {
    return Task.destroy(
        {where: {id: body.id}})
});

exports.getById = (async function (id) {
    const task = await Task.findOne({
        attributes: ['id','title','description','due_time','position','completed','task_priority_id','column_id'],
        where: {
            id: id
        }
    });
    const taskReturnData = task.dataValues;
    const priorities = await TaskPriority.findAll({
        attributes: ['id','priority'],
    });
    taskReturnData.task_priority = priorities.find(element => element.id = task.task_priority_id).priority;
    delete taskReturnData.task_priority_id;
    taskReturnData.participant_ids = await TaskToParticipant.findAll({
        attributes: ['participant_id'],
        where: {
            task_id: task.id
        }
    });
    taskReturnData.checkLists = await CheckListService.get(task.id);
    return taskReturnData;
});

exports.getByColumn = (async function (columnId) {
    const tasks = await Task.findAll({
        attributes: ['title','due_time','position','completed','task_priority_id'],
        where: {
            column_id: columnId
        }
    });
    const priorities = await TaskPriority.findAll({
        attributes: ['id','priority'],
    });
    return tasks.map(function(task){
        let taskFields = task.dataValues;
        taskFields.task_priority = priorities.find(element => element.id = task.task_priority_id).priority;
        delete taskFields.id;
        delete taskFields.task_priority_id;
        return taskFields;
    })
});

exports.taskToPT = (async function (body) {
    return await TaskToParticipant.create(body);
});

exports.deleteTaskToPT = (async function (body) {
    return TaskToParticipant.destroy(
        {where: {id: body.id}})
});
