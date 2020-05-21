const Task = require("../models/taskModel");
const TaskPriority = require("../models/taskPriorityModel");
const TaskToParticipant = require("../models/participantTaskModel");
const TaskMark = require("../models/taskMarkModel");
const CheckListService = require("./checkListService");
const CommentService = require("./commentService");
const LogService = require("./logService");

exports.add = (async function(body){
    const priority = await TaskPriority.findOne({
        attributes: ['id'],
        where: {
            priority: body.priority
        }
    });
    body.task_priority_id = priority.id;
    delete body.priority;
    return await Task.create(body);
});

exports.edit = (async function (body) {
    return Task.update(
      {
        title:body.title,
        description: body.description, 
        due_time: body.due_time,
        position: body.position,
        completed: body.completed,
        column_id: body.column_id
      }, 
      { where: { id: body.id } }
    );
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
    taskReturnData.mark_ids = await TaskMark.findAll({
        attributes: ['mark_id'],
        where: {
            task_id: task.id
        }
    });
    taskReturnData.participant_ids = await TaskToParticipant.findAll({
        attributes: ['participant_id'],
        where: {
            task_id: task.id
        }
    });
    taskReturnData.checkLists = await CheckListService.get(task.id);
    taskReturnData.comments = await CommentService.getByTaskId(task.id);
    taskReturnData.logs = await LogService.getByTaskId(task.id);
    return taskReturnData;
});

exports.getByColumn = (async function (columnId) {
    const tasks = await Task.findAll({
        attributes: ['id','title','due_time','position','completed','task_priority_id'],
        where: {
            column_id: columnId
        },
        order: [
            ['position', 'ASC']
           // ['name', 'DESC],
        ],
    });
    const priorities = await TaskPriority.findAll({
        attributes: ['id','priority'],
    });
    return Promise.all(tasks.map(async function(task){
        let taskFields = task.dataValues;
        taskFields.task_priority = priorities.find(element => element.id = task.task_priority_id).priority;
        delete taskFields.task_priority_id;
        taskFields.check_lists = await CheckListService.get(task.id);
        taskFields.mark_ids = await TaskMark.findAll({
            attributes: ['mark_id'],
            where: {
                task_id: task.id
            }
        });
        taskFields.mark_ids = taskFields.mark_ids.map(x => x.mark_id);
        return taskFields;
    })
    )
});

exports.taskToPT = (async function (body) {
    return await TaskToParticipant.create(body);
});

exports.deleteTaskToPT = (async function (body) {
    return TaskToParticipant.destroy(
        {where: {task_id: body.task_id, participant_id: body.participant_id}})
});

exports.taskToMark = (async function (body) {
    return await TaskMark.create(body);
});

exports.deleteTaskToMark = (async function (body) {
    return TaskMark.destroy(
        {where: {task_id: body.task_id, mark_id: body.mark_id}})
});
