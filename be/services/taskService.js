const Task = require("../models/taskModel");
const TaskPriority = require("../models/taskPriorityModel");
const TaskToParticipant = require("../models/participantTaskModel");
const TaskMark = require("../models/taskMarkModel");
const Mark = require("../models/markModel");
const CheckListService = require("./checkListService");
const CommentService = require("./commentService");

exports.add = (async function(body){
    return Task.create(body);
});

exports.addArray = (async function(body){
    return Task.bulkCreate(body, {returning: true});
});

exports.edit = (async function (body) {
    return Task.update(
      body,
      { where: { id: body.id } }
    );
});

exports.delete = (async function (body) {
    return Task.destroy(
        {where: {id: body.id}})
});

exports.getById = (async function (id) {
    const task = await Task.findOne({
        attributes: ['id','title','description','position','completed','priority_id','column_id'],
        where: {
            id: id
        }
    });
    const taskReturnData = task.dataValues;
    const priorities = await TaskPriority.findAll({
        attributes: ['id','priority'],
    });
    taskReturnData.task_priority = priorities.find(element => element.id = task.priority_id).priority;
    delete taskReturnData.task_priority_id;
    taskReturnData.mark_ids = await TaskMark.findAll({
        attributes: ['mark_id'],
        where: {
            task_id: task.id
        }
    });
    taskReturnData.mark_ids = taskReturnData.mark_ids.map(x => x.mark_id);
    taskReturnData.participant_ids = await TaskToParticipant.findAll({
        attributes: ['participant_id'],
        where: {
            task_id: task.id
        }
    });
    taskReturnData.checkLists = await CheckListService.get(task.id);
    taskReturnData.comments = await CommentService.getByTaskId(task.id);
    return taskReturnData;
});

exports.getByColumn = (async function (columnId) {
    const tasks = await Task.findAll({
        attributes: ['id','title','description','position','completed','priority_id'],
        where: {
            column_id: columnId
        },
        order: [
            ['position', 'ASC']
           // ['name', 'DESC],
        ],
    });
    return Promise.all(tasks.map(async function(task){
        let taskFields = task.dataValues;
        taskFields.check_lists = await CheckListService.get(task.id);
        let marks = [];
        const mark_ids = await TaskMark.findAll({
            attributes: ['mark_id'],
            where: {
                task_id: task.id
            }
        });
        taskFields.marks_ids = mark_ids.map(x => x.mark_id);
        mark_ids.map(async mark => {
            marks.push(await Mark.findOne({
                attributes: ['id','content','color'],
                where: {
                    id: mark.mark_id
                }
            }));
        });
        taskFields.marks = marks;
        return taskFields;
    })
    )
});

exports.taskToPT = (async function (body) {
    return TaskToParticipant.create(body);
});

exports.deleteTaskToPT = (async function (taskId, participantId) {
    return TaskToParticipant.destroy(
        {where: {task_id: taskID, participant_id: participantId}})
});

exports.taskToMark = (async function (body) {
    return TaskMark.create(body);
});

exports.deleteTaskToMark = (async function (taskId, markId) {
    return TaskMark.destroy(
        {where: {task_id: taskId, mark_id: markId}})
});
