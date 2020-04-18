import * as Sequelize from "sequelize";
const seq = require("../dbConnection").sequelize;

const Task = require("taskModel");
const Participant = require("participantModel");
const ParticipantTask = seq.define("participant_task", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }
});
Task.belongsToMany(Participant, {through: ParticipantTask});
Participant.belongsToMany(Task, {through: ParticipantTask});

seq.sync().then(result=>console.log(result))
    .catch(err=> console.log(err));

module.exports(ParticipantTask);
