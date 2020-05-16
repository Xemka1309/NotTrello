const Log = require("../models/logModel");

exports.get = (async function(id){
    return await Log.findAll({
        attributes: ['action','create_time','participant_id','task_id'],
        where: {
            id: id
        }
    });
});

exports.getByTaskId = (async function(taskId){
    return await Log.findAll({
        attributes: ['action','create_time','participant_id'],
        where: {
            task_id: taskId
        }
    });
});

exports.add = (async function(body){
    return Log.create(body);
});

exports.delete = (async function (body) {
    await Log.destroy(
        {where: {id: body.id}})
});
