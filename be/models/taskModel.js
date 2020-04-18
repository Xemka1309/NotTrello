import * as Sequelize from "sequelize";
const seq = require("../dbConnection").sequelize;

const TaskPriority = require("taskPriorityModel");
const Column = require("columnModel");
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
    due_time: {
        type: 'TIMESTAMP',
        allowNull: false
    },
    position: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    completed: {
        type: Sequelize.TINYINT,
        allowNull: false
    }
});
TaskPriority.hasMany(Task);
Column.hasMany(Task);

seq.sync().then(result=>console.log(result))
    .catch(err=> console.log(err));

module.exports(Task);
