const TaskMark = require("../models/taskMarkModel");
const Mark = require("../models/markModel");

exports.getByBoardId = (async function(boardId){
    return Mark.findAll({
        attributes: ['id','content','color'],
        where: {
            board_id: boardId
        }
    });
});

exports.get = (async function(id){
    return Mark.findAll({
        attributes: ['content','color'],
        where: {
            id: id
        }
    });
});


exports.add = (async function(body){
    return Mark.create(body);
});

exports.addArray = (async function(body){
    return Mark.bulkCreate(body, {returning: true});
});

exports.addTaskMarkArray = (async function(body){
    return TaskMark.bulkCreate(body, {returning: true});
});

exports.edit = (async function (body) {
    return Mark.update(
        body,
        {where: {id: body.id}})
});

exports.delete = (async function (id) {
    return Mark.destroy(
        {where: {id: id}})
});
