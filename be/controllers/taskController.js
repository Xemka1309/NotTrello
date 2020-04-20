const TaskService = require("../services/taskService");

// title and board_id
exports.add = function (request, response) {
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
        .then(function() {
            response.sendStatus(200);
        })
        .catch(err =>  {
            console.log(err);
            response.status(406);
            response.send(err.message);
        });
};

exports.getById = function(request, response){
    TaskService.getById(request.query.id)
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

exports.taskToPT = function(request, response){
    TaskService.taskToPT(request.body)
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

exports.deleteTaskToPT = function (request, response){
    TaskService.deleteTaskToPT(request.body)
        .then(function() {
            response.sendStatus(200);
        })
        .catch(err =>  {
            console.log(err);
            response.status(406);
            response.send(err.message);
        });
};

exports.taskToMark = function(request, response){
    TaskService.taskToMark(request.body)
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

exports.deleteTaskToMark = function (request, response){
    TaskService.deleteTaskToMark(request.body)
        .then(function() {
            response.sendStatus(200);
        })
        .catch(err =>  {
            console.log(err);
            response.status(406);
            response.send(err.message);
        });
};
