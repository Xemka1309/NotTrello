const BoardType = require("../models/boardTypeModel");

exports.init = (async function () {
    return BoardType.bulkCreate(
        [
            {id: 1, type: "PRIVATE"},
            {id: 2, type: "PUBLIC"}
        ],
        {
            fields:["id", "type"],
            updateOnDuplicate : ["type"]
        })
});
