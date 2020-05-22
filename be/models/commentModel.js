const Sequelize = require('sequelize');
const seq = require("../dbConnection");

const Task = require("./taskModel");
const User = require("./userModel");
const Comment = seq.define("comment", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        default: null
    },
    create_time: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
});
Task.hasMany(Comment, {foreignKey: 'task_id'});
User.hasMany(Comment, {foreignKey: 'user_id'});

module.exports = Comment;
