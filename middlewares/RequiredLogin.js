const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../keys');
const profile_Collection = require('../models/Profile_model');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if(!authorization) return res.status(401).json({error: 'You must Login'})

    const token = authorization.replace('Bearer', '');

    JWT.verify(token, JWT_SECRET, (err, payload) => {
        if(err) return res.status(401).json({error: 'You must Login'})

        const { _id } = payload;
        profile_Collection.findOne({ user_profile: _id })
        .populate('user_profile', 'username email')
        .then(myprofile => {
            req.user = myprofile;
            next();
        })
    } )
}