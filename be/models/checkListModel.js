import * as Sequelize from "sequelize";
const seq = require("../dbConnection").sequelize;

const Task = require("taskModel");
const CheckList = seq.define("check_list", {
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
Task.hasMany(CheckList);

seq.sync().then(result=>console.log(result))
    .catch(err=> console.log(err));

module.exports(CheckList);
