const Sequelize = require('sequelize');
const seq = require("../dbConnection");

const Board = require("boardModel");
const Role = require("be/models/participantRoleModel");
const User = require("userModel");
const Participant = seq.define("participant", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }
});
Board.hasMany(Participant, {foreignKey: 'board_id'});
Role.hasMany(Participant, {foreignKey: 'role_id'});
User.hasMany(Participant, {foreignKey: 'user_id'});

module.exports = Participant;
