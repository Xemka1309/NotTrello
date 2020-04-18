const seq = require ("sequelizeInit");

const Task = require("taskModel");
const Participant = require("participantModel");
const Log = seq.define("log", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    create_time: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    action: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
Task.hasMany(Log);
Participant.hasMany(Log);

seq.sync().then(result=>console.log(result))
    .catch(err=> console.log(err));

module.exports(Log);
