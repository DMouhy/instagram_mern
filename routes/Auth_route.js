const express = require('express');
const router = express.Router();
const user_Collection = require('../models/User_model');
const profile_Collection = require('../models/Profile_model');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../keys');

//Register
router.post('/register', (req, res) => {
    const { username, first_name, last_name, email, password, re_password } = req.body;

    if(!username || !first_name || !last_name || !email || !password || !re_password) return res.status(422).json({error: 'please enter all Fields'})

    if(password !== re_password) return res.status(422).json({error: "re_password doesn't match"})

    bcrypt.hash(password, 12)
    .then(hashed_password => {

        const user = new user_Collection({
            username,
            first_name,
            last_name,
            email,
            password: hashed_password
        })

        user.save()
        .then(userSaved => {
            const profile = new profile_Collection({
                user_profile: userSaved
            })
            profile.save()
            res.json({message: 'Successfuly Register'})
        } )
        .catch(err => console.log(`authr_route:register:Error: ${err}`))
    })

} )

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) return res.status(422).json({error: 'please enter all Fields'})

    user_Collection.findOne({email: email})
    .then(userFound => {
        if(!userFound) return res.status(422).json({error: "Invalid email or password"})

        bcrypt.compare(password, userFound.password)
        .then(password_match => {
            if(!password_match) return res.status(422).json({error: "Invalid email or password"})

            const token = JWT.sign({_id: userFound._id}, JWT_SECRET)

            return res.json({
                message: 'successfuly Login',
                token
            })

        })
        .catch(err => res.status(422).json({error: "Invalid email or password"}) )
    })

} )

module.exports = router;