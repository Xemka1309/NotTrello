const BoardService = require("../services/boardService");

exports.index = function (request, response) {
    response.status(200).send({message: "all ok!"})
};
exports.add = function (request, response) {
    request.body.user_id = request.decoded.id;
    BoardService.add(request.body)
        .then(result => {
            response.status(200);
            response.send(result);})
        .catch(err =>  {
            console.log(err);
            response.status(406);
            response.send(err.message);
    });
};

// Edit and delete require board ID
exports.edit = function (request, response){
    BoardService.edit(request.body)
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
    BoardService.delete(request.body)
        .then(result => {
            response.sendStatus(200);
        })
        .catch(err =>  {
            console.log(err);
            response.status(406);
            response.send(err.message);
        });
};

exports.getBoards = function(request, response){
    BoardService.getBoards(request.decoded.id)
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

exports.getTypes = function(request, response){
    BoardService.getTypes()
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
