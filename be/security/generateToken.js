import * as jwt from "jsonwebtoken";

exports.generateToken = (req, res) => {
    if(user.verify(password)) {
        // create a promise that generates jwt asynchronously
        const p = new Promise((resolve, reject) => {
            jwt.sign(
                {
                    _id: user._id,
                    username: user.username,
                    admin: user.admin
                },
                secret,
                {
                    expiresIn: '7d',
                    issuer: 'velopert.com',
                    subject: 'userInfo'
                }, (err, token) => {
                    if (err) reject(err)
                    resolve(token)
                })
        })
        return p
    } else {
        throw new Error('login failed')
    }
    }
    }

    // respond the token
    const respond = (token) => {
        res.json({
            message: 'logged in successfully',
            token
        })
    }

    // error occured
    const onError = (error) => {
        res.status(403).json({
            message: error.message
        })
    }
}
