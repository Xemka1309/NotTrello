const Sequelize = require("sequelize");
const sequelize = new Sequelize("mydb", "root", "password", {
    dialect: "mysql",
    host: "localhost",
    port: 8000,
});
module.exports(sequelize);
