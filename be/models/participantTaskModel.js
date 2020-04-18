const Sequelize = require('sequelize');
const seq = require("../dbConnection");

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

module.exports = ParticipantTask;
