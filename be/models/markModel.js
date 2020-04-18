const Sequelize = require('sequelize');
const seq = require("../dbConnection");

const Board = require("boardModel");
const Mark = seq.define("mark", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    color: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        default: null
    }
});
Board.hasMany(Mark);

module.exports = Mark;
