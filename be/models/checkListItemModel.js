const Sequelize = require('sequelize');
const seq = require("../dbConnection");

const CheckList = require("checkListModel");
const CheckListItem = seq.define("check_list_item", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    },
    position: {
        type: 'TINYINT',
        allowNull: false,
        default: 0
    }
});
CheckList.hasMany(CheckListItem);

module.exports = CheckListItem;
