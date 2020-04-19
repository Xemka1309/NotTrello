const Column = require("../models/columnModel");

exports.add = (async function(body){
    return await Column.create(body);
});

exports.edit = (async function (body) {
    return Column.update(
        body,
        {where: {id: body.id}})
});

exports.delete = (async function (body) {
    return Column.destroy(
        {where: {id: body.id}})
});

exports.get = (async function (board_id) {
    return await Column.findAll({
        attributes: ['id','title','position','board_id'],
        where: {
            board_id: board_id
        }
    });
});
