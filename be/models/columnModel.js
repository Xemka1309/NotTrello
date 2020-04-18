import * as Sequelize from "sequelize";
const seq = require("../dbConnection").sequelize;

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
    },
    position: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});
Board.hasMany(Column);

seq.sync().then(result=>console.log(result))
    .catch(err=> console.log(err));

module.exports(Column);
