const UserService = require("../services/userService");

exports.index = function (request, response) {
    response.status(200).send({message: "all ok!"})
};
exports.register = function (request, response) {

    UserService(request.body)
        .then(result => {
            console.log(result);
            response.send(result);})
        .catch(err =>
            console.log(err));
};
