const Sequelize = require('sequelize');
const seq = require("../dbConnection");

const Board = require("boardModel");
const Role = require("userRoleModel");
const User = require("userModel");
const Participant = seq.define("participant", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }
});
Board.hasMany(Participant);
Role.hasMany(Participant);
User.hasMany(Participant);

module.exports = Participant;
