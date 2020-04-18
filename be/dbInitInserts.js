const InitRoles = require("./services/rolesInit");
const InitBoardTypes = require("./services/boardTypesInit");
const InitTaskPriorities = require("./services/taskPrioritiesInit");

exports.init = function () {
    InitRoles.init()
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err)
        });
    InitBoardTypes.init()
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err)
        });
    InitTaskPriorities.init()
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err)
        });
};
