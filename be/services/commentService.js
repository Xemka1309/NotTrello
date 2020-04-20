const Comment = require("../models/commentModel");

exports.get = (async function(id){
    return await Comment.findAll({
        attributes: ['content','create_time','participant_id','task_id'],
        where: {
            id: id
        }
    });
});

exports.getByTaskId = (async function(taskId){
    return await Comment.findAll({
        attributes: ['content','create_time','participant_id'],
        where: {
            task_id: taskId
        }
    });
});

exports.add = (async function(body){
    return Comment.create(body);
});
exports.edit = (async function (body) {
    return await Comment.update(
        body,
        {where: {id: body.id}})
});
exports.delete = (async function (body) {
    await Comment.destroy(
        {where: {id: body.id}})
});
