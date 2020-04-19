const TaskService = require("../services/taskService");

// title and board_id
exports.add = function (request, response) {
    request.body.user_id = request.decoded.id;
    TaskService.add(request.body)
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
    TaskService.edit(request.body)
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
    TaskService.delete(request.body)
        .then(result => {
            response.sendStatus(200);
        })
        .catch(err =>  {
            console.log(err);
            response.status(406);
            response.send(err.message);
        });
};

exports.getById = function(request, response){
    TaskService.getById(request.body.id)
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

exports.getByColumn = function(request, response){
    TaskService.getByColumn(request.body.column_id)
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

exports.taskToParticipant = function(request, response){
    TaskService.taskToParticipant(request.body)
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
