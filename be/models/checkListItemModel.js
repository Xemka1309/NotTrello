const seq = require ("sequelizeInit");

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

seq.sync().then(result=>console.log(result))
    .catch(err=> console.log(err));

module.exports(CheckListItem);
