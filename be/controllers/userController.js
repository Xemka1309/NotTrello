const UserService = require("../services/userService");

//todo Edit requires user ID
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
