import * as Sequelize from "sequelize";
const seq = require("../dbConnection").sequelize;

const Task = require("taskModel");
const Participant = require("participantModel");
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
        type: 'TIMESTAMP',
        allowNull: false
    }
});
Task.hasMany(Comment);
Participant.hasMany(Comment);

seq.sync().then(result=>console.log(result))
    .catch(err=> console.log(err));

module.exports(Comment);
