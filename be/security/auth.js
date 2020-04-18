const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.query.token;

    const onError = (error) => {
        res.status(403).json({
            success: false,
            message: error.message
        })
    }

    //forbidden
    if (!token) {
        return onError({message : "Not authorized"})
    }

    const decoding = new Promise(((resolve, reject) => {
        jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
            if (err)
                reject(err);
            resolve(decoded);
        })
    }));

    decoding.then((decoded) => {
        req.decoded = decoded;
        next();
    }).catch(onError)

};

module.exports = auth;
