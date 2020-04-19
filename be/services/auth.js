const jwt = require("jsonwebtoken");
const secret = require('../config').secret;

exports.auth = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if(!token)
        return res.status(403).json({message: 'Forbidden'})

    const verifyToken = new Promise((resolve, reject) => {
        jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
            if (err) reject(err);
            resolve(decoded);
        });
    });

    const onError = (error) => {
        res.status(403).json({
            message: error.message
        })
    };

    verifyToken
        .then(decoded => {
            req.decoded = decoded;
            next();
        }).catch(onError);
};

exports.generateToken = async (user) => {
    return new Promise(((resolve, reject) => {
        jwt.sign(
            {
                id: user.id
            },
            secret,
            {
                expiresIn: '1h',
                issuer: 'NotTrello.notCom',
                subject: 'userInfo'
            }, (err, token) => {
                if (err)
                    reject(err);
                resolve(token);
            })
    }));
};
