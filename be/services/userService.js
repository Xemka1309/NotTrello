const User = require("../models/userModel");

exports.register = (async function(body){
    return User.create(body);
});
exports.edit = (async function (body) {
    return User.update(
        body,
        {where: {id: body.id}})
});
exports.getExceptPassword = (async function (userId) {
     const userData = await User.findOne({
         attributes: ['id','name','family','nickname','email','login'],
         where: {
             id: userId
         }
     });
     userData.password = '*';
     return userData;
});

exports.findOne = async (reqParams) => {
  return User.findOne({where: reqParams});
};
