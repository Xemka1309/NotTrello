const User = require("../models/userModel");

exports.register = (async function(body){
    return User.create(body);
});
exports.edit = (async function (body) {
    // Прочекать, не затираются ли неизмененные поля наллами
    return User.update(
        {name: body.name},
        {where: {id: body.id}})
});
