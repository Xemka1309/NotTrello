const Sequelize = require('sequelize');
const seq = require("../dbConnection");

const TaskPriority = seq.define("task_priority", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    priority: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
});

module.exports = TaskPriority;
