const UserService = require("../services/userService");

exports.index = function (request, response) {
    response.status(200).send({message: "all ok!"})
};
exports.register = function (request, response) {
    UserService.register(request.body)
        .then(result => {
            console.log(result);
            response.status(200);
            response.send(result);})
        .catch(err =>  {
            console.log(err);
            response.status(406);
            response.send(err.message);
    });
};
// Edit requires user ID
exports.edit = function (request, response){
    UserService.edit(request.body)
        .then(result => {
            console.log(result);
            response.status(200);
            response.send(result);
        })
        .catch(err =>  {
            console.log(err);
            response.status(406);
            response.send(err.message);
        });
};