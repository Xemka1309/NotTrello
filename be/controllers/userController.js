const UserService = require("../services/userService");

exports.index = function (request, response) {
    response.status(200).send({message: "all ok!"})
};
exports.register = function (request, response) {
    const result = UserService(request.body);
    console.log("result ",result);
    response.status(200).send(result);
};
