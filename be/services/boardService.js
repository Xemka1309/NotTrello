const Board = require("../models/boardModel");
const BoardType = require("../models/boardTypeModel");
const ParticipantRole = require("../models/participantRoleModel");
const Participant = require("../models/participantModel");

exports.add = (async function(body){
    const boardType = await BoardType.findAll({
        attributes: ['id'],
        where: {
            type: body.boardType
        }
    });
    const createdBoard = Board.build({
        title: body.title,
        description: body.description,
        type_id: boardType[0].id,
    });
    const participantRole = await ParticipantRole.findAll({
        attributes: ['id'],
        where: {
            type: "ADMINISTRATOR"
        }
    });
    Participant.create({
        user_id: body.user_id,
        board_id: createdBoard.id,
        role_id: participantRole[0].id
    });
    return Board.save(createdBoard);
});

exports.edit = (async function (body) {
    const boardType = await BoardType.findAll({
        attributes: ['id'],
        where: {
            type: body.boardType
        }
    });
    return Board.update(
        {
            title: body.title,
            description: body.description,
            type_id: boardType[0].id,
        },
        {where: {id: body.id}})
});

exports.delete = (async function (body) {
    return Board.destroy(
        {where: {id: body.id}})
});

exports.getTypes = (async function () {
    return await BoardType.findAll({
        attributes: ['type'],
    });
});

exports.getBoards = (async function (typeId) {
    return await Board.findAll({
        attributes: ['id', 'title', 'description', 'type_id'],
        where: {
            type_id: typeId
        }
    });
});
