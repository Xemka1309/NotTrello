const Sequelize = require('sequelize');
const seq = require("../dbConnection");

const UserRole = seq.define("user_role", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
});

module.exports = UserRole;
