import * as Sequelize from "sequelize";
const seq = require("../dbConnection").sequelize;

const TaskPriority = seq.define("task_priority", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    priority: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
seq.sync().then(result=>console.log(result))
    .catch(err=> console.log(err));

module.exports(TaskPriority);
