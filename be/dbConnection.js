const Sequelize = require("sequelize");
const sequelize = new Sequelize("mydb", "user", "123", {
    dialect: "mysql",
    host: "localhost",
    port: 3306,
    define: {
        timestamps: false,
        freezeTableName: true
    }
});

sequelize.sync().then(result=>console.log(result))
    .catch(err=> console.log(err));

module.exports = sequelize;
