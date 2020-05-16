const Sequelize = require('sequelize');
const seq = require("../dbConnection");

const CheckList = require("./checkListModel");
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
    completed: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 0
    }
});
CheckList.hasMany(CheckListItem, {
    foreignKey: 'check_list_id',
    onDelete: 'CASCADE'
});
CheckListItem.belongsTo(CheckList);

module.exports = CheckListItem;
