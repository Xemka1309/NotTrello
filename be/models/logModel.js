const Sequelize = require('sequelize');
const seq = require("../dbConnection");

const Task = require("./taskModel");
const Participant = require("./participantModel");
const Log = seq.define("log", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    create_time: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    action: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
Task.hasMany(Log, {foreignKey: 'task_id'});
Participant.hasMany(Log, {foreignKey: 'participant_id'});

module.exports = Log;
