const seq = require ("sequelizeInit");

const Task = require("taskModel");
const Mark = require("markModel");
const TaskMark = seq.define("task_mark", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }
});
Task.belongsToMany(Mark, {through: TaskMark});
Mark.belongsToMany(Task, {through: TaskMark});

seq.sync().then(result=>console.log(result))
    .catch(err=> console.log(err));

module.exports(TaskMark);
