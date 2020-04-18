import * as Sequelize from "sequelize";
const seq = require("../dbConnection").sequelize;

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

seq.sync().then(result=>console.log(result))
    .catch(err=> console.log(err));

module.exports(Mark);
