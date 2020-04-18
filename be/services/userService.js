const User = require("../models/userModel");

exports.register = (async function(body){
    return User.create(body);
});
exports.edit = (async function (body) {
    return User.update(
        body,
        {where: {id: body.id}})
});

exports.findOne = async (reqParams) => {
  return User.findOne({where: reqParams});
};
