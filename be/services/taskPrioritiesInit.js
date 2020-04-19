const Priority = require("../models/taskPriorityModel");

exports.init = (async function () {
    return Priority.bulkCreate(
        [
            {id: 1, priority: "VERY_HIGH"},
            {id: 2, priority: "HIGH"},
            {id: 3, priority: "MEDIUM"},
            {id: 4, priority: "LOW"},
            {id: 5, priority: "OPTIONAL"}
        ],
        {
            fields:["id", "priority"],
            updateOnDuplicate : ["priority"]
        })
});
