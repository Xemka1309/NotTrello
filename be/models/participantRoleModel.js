const Sequelize = require('sequelize');
const seq = require("../dbConnection");

const ParticipantRole = seq.define("participant_role", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
});

module.exports = ParticipantRole;
