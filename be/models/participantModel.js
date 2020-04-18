const seq = require ("sequelizeInit");

const Board = require("boardModel");
const Role = require("userRoleModel");
const User = require("userModel");
const Participant = seq.define("participant", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }
});
Board.hasMany(Participant);
Role.hasMany(Participant);
User.hasMany(Participant);

seq.sync().then(result=>console.log(result))
    .catch(err=> console.log(err));

module.exports(Participant);
