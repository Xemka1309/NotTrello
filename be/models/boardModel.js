const seq = require ("sequelizeInit");

const BoardType = require("boardTypeModel");
const Board = seq.define("board", {
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
    }
});
BoardType.hasMany(Board);

seq.sync().then(result=>console.log(result))
    .catch(err=> console.log(err));

module.exports(Board);
