const CheckList = require("../models/checkListModel");
const CheckListItem = require("../models/checkListItemModel");
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

exports.addArray = (async function(body){
    return Promise.all(
        body.map(async checkList => {
            if(!checkList.id || !await
                CheckList.findAll({
                    attributes: ['id'],
                    where: {
                        id: checkList.id
                    }
                })) {
                checkList = await CheckList.create(checkList);
            }
            else {
                await CheckList.update(
                    checkList, {
                        where: {
                            id: checkList.id}
                    });
            }
        await Promise.all(checkList.items.map(async clItem => {
            clItem.check_list_id = checkList.id;
            if(!clItem.id || !await CheckListItem.findAll({
                attributes: ['id'],
                where: {
                    id: clItem.id
                }
            }))
            {
                await CheckListItem.create(clItem);
            } else {
                await CheckListItem.update(
                    clItem,
                    {where: {id: clItem.id}});
            }
        }))
    }))
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
