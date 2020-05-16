const CheckListService = require("../services/checkListService");

// title and board_id
exports.add = function (request, response) {
    request.body.user_id = request.decoded.id;
    CheckListService.add(request.body)
        .then(result => {
            response.status(200);
            response.send(result);})
        .catch(err =>  {
            console.log(err);
            response.status(406);
            response.send(err.message);
        });
};

// id, title and board_id
exports.edit = function (request, response){
    CheckListService.edit(request.body)
        .then(result => {
            response.status(200);
            response.send(result);
        })
        .catch(err =>  {
            response.status(406);
            response.send(err.message);
        });
};

exports.delete = function (request, response){
    CheckListService.delete(request.decoded.id)
        .then(result => {
            response.sendStatus(200);
        })
        .catch(err =>  {
            console.log(err);
            response.status(406);
            response.send(err.message);
        });
};

exports.get = function(request, response){
    CheckListService.get(request.query.task_id)
        .then(result => {
            response.status(200);
            response.send(result);
        })
        .catch(err =>  {
            console.log(err);
            response.status(406);
            response.send(err.message)
        });
};
