const Role = require("../models/participantRoleModel");

exports.init = (async function () {
    return Role.bulkCreate(
        [
            {id: 1, role: "ADMINISTRATOR"},
            {id: 2, role: "SENIOR"},
            {id: 3, role: "DEVELOPER"}
        ],
        {
            fields:["id", "role"],
            updateOnDuplicate : ["role"]
        })
});
