const ParticipantService = require("../services/participantService");

exports.index = function (request, response) {
    response.status(200).send({message: "all ok!"})
};

exports.get = function(request, response){
    ParticipantService.get(request.decoded.id)
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

exports.add = function (request, response) {
    request.body.user_id = request.decoded.id;
    ParticipantService.add(request.body)
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
    request.body.user_id = request.decoded.id;
    ParticipantService.edit(request.body)
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
    ParticipantService.delete(request.body)
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
