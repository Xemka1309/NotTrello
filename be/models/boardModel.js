const Sequelize = require('sequelize');
const seq = require("../dbConnection");

const BoardType = require("./boardTypeModel");
const Board = seq.define("board", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        default: null
    },
    pictureUrl: {
        type: Sequelize.STRING
    }
});
BoardType.hasMany(Board, {foreignKey: 'type_id'});

module.exports = Board;
