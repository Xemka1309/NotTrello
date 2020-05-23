const Sequelize = require('sequelize');
const seq = require("../dbConnection");

const TaskPriority = require("./taskPriorityModel");
const Column = require("./columnModel");
const Task = seq.define("task", {
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
    position: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    completed: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 0
    }
});
TaskPriority.hasMany(Task, {foreignKey: 'priority_id'});
Task.belongsTo(TaskPriority, {foreignKey: 'priority_id'});
Column.hasMany(Task, {foreignKey: 'column_id'});

module.exports = Task;
