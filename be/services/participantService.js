const Participant = require("../models/participantModel");
const Board = require("../models/boardModel");
const BoardType = require("../models/boardTypeModel");

exports.get = (async function(userId){
    return await Participant.findAll({
        attributes: ['id','board_id','user_id','role_id'],
        where: {
            user_id: userId
        }
    });
});

exports.add = (async function(body){
    const boardType = await BoardType.findAll({
        attributes: ['id'],
        where: {
            type: body.boardType
        }
    });
    const board = await Board.findAll({
        attributes: ['id'],
        where: {
            type: boardType[0].id
        }
    });
    body.board_id = board[0].id;
    const participantRole = await BoardType.findAll({
        attributes: ['id'],
        where: {
            role: "DEVELOPER"
        }
    });
    body.role_id = participantRole[0].id;
    return Participant.create(body);
});
exports.edit = (async function (body) {
    return Participant.update(
        {name: body.name},
        {where: {id: body.id}})
});
exports.delete = (async function (body) {
    Participant.destroy(
        {where: {id: body.id}})
});
