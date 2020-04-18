const Sequelize = require('sequelize');
const seq = require("../dbConnection");

const Board = require("boardModel");
const Column = seq.define("column", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING
    }
});
Board.hasMany(Column, {foreignKey: 'board_id'});

module.exports = Column;
