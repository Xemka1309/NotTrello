const seq = require ("sequelizeInit");

const BoardType = seq.define("board_type", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
seq.sync().then(result=>console.log(result))
    .catch(err=> console.log(err));

module.exports(BoardType);
