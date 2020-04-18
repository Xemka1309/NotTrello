const Sequelize = require('sequelize');
const seq = require("../dbConnection");

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

module.exports = CheckList;
