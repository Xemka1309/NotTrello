const BoardService = require("../services/boardService");

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
    BoardService.delete(request.query.id)
        .then(result => {
            response.status(200);
            response.send({message: 'ok'})
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

exports.getBoard = function(request, response){
    BoardService.getBoard(request.query.id)
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

exports.getParticIdAndUserRole = function(request, response){
    BoardService.getParticIdAndUserRole(request.decoded.id, request.query.id)
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

exports.isActionAllowed = function (request, response) {
  BoardService.getParticIdAndUserRole(request.decoded.id, request.query.id)
    .then((result) => {
      response.status(200);
      response.send({allowed: request.query.permissionLvl >= result.user_role.id});
    })
    .catch((err) => {
      console.log(err);
      response.status(406);
      response.send(err.message);
    });
};

