const BoardService = require("../services/boardService");

exports.index = function (request, response) {
    response.status(200).send({message: "all ok!"})
};
exports.add = function (request, response) {

    BoardService.add(request.body)
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
exports.edit = function (request, response){
    BoardService.edit(request.body)
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
// Body contains id
exports.delete = function (request, response){
    BoardService.delete(request.body)
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
