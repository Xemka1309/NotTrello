const Sequelize = require('sequelize');
const seq = require("../dbConnection");

const User = seq.define("user", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING
    },
    family: {
        type: Sequelize.STRING
    },
    nickname: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
});

module.exports = User;
