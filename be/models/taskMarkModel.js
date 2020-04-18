const Sequelize = require('sequelize');
const seq = require("../dbConnection");

const Task = require("taskModel");
const Mark = require("markModel");
const TaskMark = seq.define("task_mark", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }
});
Task.belongsToMany(Mark, {through: TaskMark});
Mark.belongsToMany(Task, {through: TaskMark});

module.exports = TaskMark;
