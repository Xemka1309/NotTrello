const InitRoles = require("./services/rolesInit");
const InitBoardTypes = require("./services/boardTypesInit");
const InitTaskPriorities = require("./services/taskPrioritiesInit");

exports.init = async function () {
    await InitRoles.init();
    await InitBoardTypes.init();
    await InitTaskPriorities.init();
    console.log()
};
