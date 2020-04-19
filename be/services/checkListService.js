const CheckList = require("../models/checkListModel");
const ParticipantRole = require("../models/participantRoleModel");

exports.get = (async function(taskId){
    return await CheckList.findAll({
        attributes: ['id','title','position','task_id'],
        where: {
            task_id: taskId
        }
    });
});

exports.add = (async function(body){
    return CheckList.create(body);
});
exports.edit = (async function (body) {
    return await CheckList.update(
        body,
        {where: {id: body.id}})
});
exports.delete = (async function (body) {
    await CheckList.destroy(
        {where: {id: body.id}})
});
