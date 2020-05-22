const Mark = require("../models/markModel");

exports.getByBoardId = (async function(boardId){
    return await Mark.findAll({
        attributes: ['id','content','color'],
        where: {
            board_id: boardId
        }
    });
});

exports.get = (async function(id){
    return await Mark.findAll({
        attributes: ['content','color'],
        where: {
            id: id
        }
    });
});


exports.add = (async function(body){
    return Mark.create(body);
});
exports.edit = (async function (body) {
    return await Mark.update(
        body,
        {where: {id: body.id}})
});
exports.delete = (async function (id) {
    return await Mark.destroy(
        {where: {id: id}})
});
