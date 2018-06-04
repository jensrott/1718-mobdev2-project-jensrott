const config = require('../../../config/keys');
const jwt = require('jsonwebtoken');

module.exports = {
    createToken: function(auth) {
        return jwt.sign({
            id: auth.id
        },  config.secretOrKey,
        {
            expiresIn: 3600,
        });
    },
    generateToken: function(req, res, next) {
        req.token = createToken(req.auth);
        return next();
    },
    sendToken: function(req, res) {
        res.setHeader('x-auth-token', req.token);
        return res.status(200).send(JSON.stringify(req.user));
    }
}