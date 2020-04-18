const Sequelize = require('sequelize');
const seq = require("../dbConnection");

const BoardType = seq.define("board_type", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
});

module.exports = BoardType;
