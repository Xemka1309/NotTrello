const Sequelize = require("sequelize");
const conf = require('./config').db;

const sequelize = new Sequelize(conf.name, conf.login, conf.password, {
    dialect: conf.dialect,
    host: conf.host,
    port: conf.port,
    logging: false,
    define: {
        timestamps: false,
        freezeTableName: true,
        pool: {
            max: 10,
            min: 1,
            acquire: 30000,
            idle: 10000
        }
    }
});

sequelize.sync()
    .then(() => console.log("db successfully synchronized"))
    .catch(err => console.log(err));

module.exports = sequelize;
