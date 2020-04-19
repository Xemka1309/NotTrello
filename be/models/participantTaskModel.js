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
// Primary key fields not added yet
Task.belongsToMany(Participant, {
        through: ParticipantTask,
        as: 'tasks',
        foreignKey: 'taskId'});
Participant.belongsToMany(Task, {
        through: ParticipantTask,
        as: 'participants',
        foreignKey: 'participantId'});

module.exports = ParticipantTask;
