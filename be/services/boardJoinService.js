const ParticipantRole = require("../models/participantRoleModel");
const Participant = require("../models/participantModel");

exports.join = (async function(boardId, userId) {
    const participantRole = await ParticipantRole.findOne({
        attributes: ['id'],
        where: {
            role: "DEVELOPER"
        }
    });
    return Participant.create({
        user_id: userId,
        board_id: boardId,
        role_id: participantRole.id
    });
});
