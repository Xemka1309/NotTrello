const ColumnService = require("../services/columnService");

// title and board_id
exports.add = function (request, response) {
    request.body.user_id = request.decoded.id;
    ColumnService.add(request.body)
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
    ColumnService.edit(request.body)
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
    ColumnService.delete(request.body)
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
    ColumnService.get(request.query.id)
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
