const CLItem = require("../models/checkListItemModel");

exports.get = (async function(clId){
    return CLItem.findAll({
        attributes: ['id','content','completed'],
        where: {
            check_list_id: clId
        }
    });
});

exports.add = (async function(body){
    return CLItem.create(body);
});

exports.edit = (async function (body) {
    return CLItem.update(
        body,
        {where: {id: body.id}})
});

exports.delete = (async function (body) {
    await CLItem.destroy(
        {where: {id: body.id}})
});
