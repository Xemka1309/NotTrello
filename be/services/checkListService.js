const CheckList = require("../models/checkListModel");
const CLItemService = require("./checkListItemService");

exports.get = (async function(taskId){
    const checklists = await CheckList.findAll({
        attributes: ['id','title','position'],
        where: {
            task_id: taskId
        }
    });
    return Promise.all(checklists.map(async function(checklist) {
            const withItems = checklist.dataValues;
            withItems.items = await CLItemService.get(checklist.id);
            return withItems;
        })
    );
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
