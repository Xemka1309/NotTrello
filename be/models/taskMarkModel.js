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
// Primary key fields not added yet
Task.belongsToMany(Mark, {
    through: TaskMark,
    foreignKey: 'task_id'});
Mark.belongsToMany(Task, {
    through: TaskMark,
    foreignKey: 'mark_id'});

module.exports = TaskMark;
