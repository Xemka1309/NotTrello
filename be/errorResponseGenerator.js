exports.notFound = function (request, response) {
    response.status(404);
    response.send(null);
};
