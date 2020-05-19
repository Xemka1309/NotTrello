const security = require('../services/auth');
const UserService = require("../services/userService");

//todo encrypt
exports.register = function (request, response) {
    UserService.register(request.body)
        .then(result => {
            response.status(200);
            response.send(result);})
        .catch(err =>  {
            response.status(406);
            response.send(err.message);
        });
};

exports.login = (request, response) => {
    const body = request.body;
    if (!validLoginRequest(request))
        response.status(400).json({message:'please enter both login and password'});

    UserService.findOne({login: request.body.login}).then(user => {
        const respond = (token) => {
            return response.status(200).json({
                message: 'authorized',
                token
            })
        };

        const onError = (error) => {
            response.status(403).json({
                message: error.message
            })
        };

        if (!validPassword(user, body.password))
            errorCantAuthorize(response);

        security.generateToken(user)
            .then(respond)
            .catch(onError);
    }).catch(err => response.json(err.message));

};

const validLoginRequest = req => {
    return req.body.login && req.body.password;
};

//todo encrypt
const validPassword = (user, password) => {
    return user.password === password;
};

const errorCantAuthorize = (res) => {
    res.status(403).json({message: "Not valid login or password"});
};
