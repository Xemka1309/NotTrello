const UserService = require("../services/userService");

exports.edit = function (request, response){
    UserService.edit(request.body)
        .then(result => {
            response.status(200);
            response.send(result);
        })
        .catch(err =>  {
            console.log(err);
            response.status(406);
            response.send(err.message);
        });
};

exports.get = function (request, response){
    UserService.getExceptPassword(request.decoded.id)
        .then(result => {
            response.status(200);
            response.send(result);
        })
        .catch(err =>  {
            console.log(err);
            response.status(406);
            response.send(err.message);
        });
};

exports.getById = function (request, response){
    UserService.getExceptPassword(request.query.id)
        .then(result => {
            response.status(200);
            response.send(result);
        })
        .catch(err =>  {
            console.log(err);
            response.status(406);
            response.send(err.message);
        });
};
