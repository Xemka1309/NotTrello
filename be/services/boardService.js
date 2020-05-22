const Board = require("../models/boardModel");
const BoardType = require("../models/boardTypeModel");
const ParticipantService = require("../services/participantService");
const ColumnService = require("../services/columnService");
const MarkService = require("../services/markService");
const ParticipantRole = require("../models/participantRoleModel");
const Participant = require("../models/participantModel");


exports.add = (async function(body){
    const boardType = await BoardType.findOne({
        attributes: ['id'],
        where: {
            type: body.boardType
        }
    });

    const createdBoard = await Board.create({
        title: body.title,
        description: body.description,
        pictureUrl: body.pictureUrl,
        type_id: boardType.id,
    });
    const participantRole = await ParticipantRole.findOne({
        attributes: ['id'],
        where: {
            role: "ADMINISTRATOR"
        }
    });
    Participant.create({
        user_id: body.user_id,
        board_id: createdBoard.id,
        role_id: participantRole.id
    });
    return createdBoard;
});

exports.edit = (async function (body) {
    const boardType = await BoardType.findOne({
        attributes: ['id'],
        where: {
            type: body.boardType
        }
    });
    return Board.update(
        {
            title: body.title,
            description: body.description,
            type_id: boardType.id,
        },
        {where: {id: body.id}})
});

exports.delete = (async function (body) {
    return Board.destroy(
        {where: {id: body.id}})
});

exports.getTypes = (async function () {
    return await BoardType.findAll({
        attributes: ['type']
    });
});

exports.getBoards = (async function (userId) {
    const participants = await Participant.findAll({
        attributes: ['board_id'],
        where: {
            user_id: userId
        }
    });

    const boards = await Board.findAll({
        attributes: ['id', 'title', 'description', 'type_id', 'pictureUrl'],
        //where: {
        //    id: participants.map(val => val.board_id)
        //}
    });

    const types = await BoardType.findAll({
        attributes: ['id','type'],
    });
    return boards.map(function(board){
        let boardData = board.dataValues;
        boardData.boardType = types.find(element => element.id === boardData.type_id).type;
        delete boardData.type_id;
        return boardData;
    })
});

exports.getBoard = (async function (board_id) {
    const board = await Board.findOne({
        attributes: ['id','title','description','type_id','pictureUrl'],
        where: {
            id: board_id
        }
    });
    const types = await BoardType.findAll({
        attributes: ['id','type'],
    });
    let boardData = board.dataValues;
    boardData.boardType = types.find(element => element.id === board.type_id).type;
    delete boardData.type_id;
    boardData.participants = await ParticipantService.getByBoardId(boardData.id);
    boardData.marks = await MarkService.getByBoardId(boardData.id);
    boardData.columns = await ColumnService.get(boardData.id);
    

    return boardData;
});

exports.getParticIdAndUserRole = (async function (user_id,board_id) {
    const participant = await Participant.findOne({
        attributes: ['id','role_id'],
        where: {
            board_id: board_id,
            user_id: user_id
        }
    });
    const userRole = await ParticipantRole.findOne({
        attributes: ['role'],
        where: {
            id:participant.role_id
        }
    });
    let data = {};
    data.participant_id = participant.id;
    data.user_role = userRole.role;
    return data;
});


