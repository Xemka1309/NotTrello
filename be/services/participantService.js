const Participant = require("../models/participantModel");
const ParticipantRole = require("../models/participantRoleModel");

exports.getByUserId = (async function(userId){

    return await Participant.findAll({
        attributes: ['id','board_id','user_id','role_id'],
        where: {
            user_id: userId
        }
    })
});

exports.getByBoardId = (async function(boardId){
    const participants = await Participant.findAll({
        attributes: ['id','board_id','user_id','role_id'],
        where: {
            board_id: boardId
        }
    });
    const roles = await ParticipantRole.findAll({
        attributes: ['id','role'],
    });
    return participants.map(partic => {
        let particData = partic.dataValues;
        particData.role = roles.find(role => role.id === partic.role_id).role;
        delete particData.role_id;
        return particData
    })
});

exports.add = (async function(body){
    const participantRole = await ParticipantRole.findOne({
        attributes: ['id'],
        where: {
            role: "DEVELOPER"
        }
    });
    return Participant.create({
        user_id: body.user_id,
        role_id: participantRole.id,
        board_id: body.board_id
    });
});
exports.edit = (async function (body) {
    return await Participant.update(
        {
            user_id: body.user_id,
            role_id: body.role_id,
            board_id: body.board_id
        },
        {where: {id: body.id}})
});
exports.delete = (async function (body) {
    await Participant.destroy(
        {where: {id: body.id}})
});
