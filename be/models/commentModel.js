const Sequelize = require('sequelize');
const seq = require("../dbConnection");

const Task = require("./taskModel");
const Participant = require("./participantModel");
const Comment = seq.define("comment", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        default: null
    },
    create_time: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
});
Task.hasMany(Comment, {foreignKey: 'task_id'});
Participant.hasMany(Comment, {foreignKey: 'participant_id'});

module.exports = Comment;
