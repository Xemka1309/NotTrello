const LogService = require("../services/logService");

exports.add = function (request, response) {
    LogService.add(request.body)
        .then(result => {
            response.status(200);
            response.send(result);})
        .catch(err =>  {
            console.log(err);
            response.status(406);
            response.send(err.message);
        });
};

exports.delete = function (request, response){
    LogService.delete(request.query.id)
        .then(function(){
            response.status(200);
            response.send({message: 'ok'})
        })
        .catch(err =>  {
            console.log(err);
            response.status(406);
            response.send(err.message);
        });
};

exports.get = function(request, response){
    LogService.get(request.query.id)
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
