const Column = require("../models/columnModel");
const TaskService = require("../services/taskService");

exports.add = (async function(body){
    return Column.create(body);
});

exports.edit = (async function (body) {
    return Column.update(
        body,
        {where: {id: body.id}})
});

exports.delete = (async function (body) {
    return Column.destroy(
        {where: {id: body.id}})
});

exports.get = (async function (board_id) {
    const columns = await Column.findAll({
        attributes: ['id','title','position','board_id'],
        where: {
            board_id: board_id
        },
        order: [
            ['position', 'ASC']
           // ['name', 'DESC],
        ],
    });
    return Promise.all(columns.map(async function(column) {
        const columnWithTasks = column.dataValues;
        columnWithTasks.tasks = await TaskService.getByColumn(column.id);
        return columnWithTasks;
        })
    );
});
