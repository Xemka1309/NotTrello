const Board = require("../models/boardModel");
const BoardType = require("../models/boardTypeModel");

exports.add = (async function(body){
    const boardType = await BoardType.findAll({
        attributes: ['id'],
        where: {
            type: body.boardType
        }
    });
    body.type_id = boardType[0].id;
    return Board.create(body);
});
exports.edit = (async function (body) {
    const boardType = await BoardType.findAll({
        attributes: ['id'],
        where: {
            type: body.boardType
        }
    });
    body.boardTypeId = boardType[0].id;
    return Board.update(
        body,
        {where: {id: body.id}})
});
exports.delete = (async function (body) {
    return Board.destroy(
        {where: {id: body.id}})
});
