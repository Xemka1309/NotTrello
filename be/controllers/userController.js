const UserService = require("../services/userService");

exports.index = function (request, response) {
    response.status(200).send({message: "all ok!"})
};
exports.register = function (request, response) {
    console.log(request.body);
    response.status(200).send(UserService(request.body));
};
