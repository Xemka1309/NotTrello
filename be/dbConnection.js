const Sequelize = require("sequelize");
const sequelize = new Sequelize("mydb", "root", "password", {
    dialect: "mysql",
    host: "localhost",
    port: 3306,
    define: {
        timestamps: false
    }
});
sequelize.sync().then(result=>console.log(result))
    .catch(err=> console.log(err));

module.exports = sequelize;
