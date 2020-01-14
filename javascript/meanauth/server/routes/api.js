const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

const mongoose = require('mongoose');
const db = "mongodb://ngauth:asdfghjkl098@localhost:27017/ngauth"

mongoose.connect(db, err => {
    if(err) console.error('Error! '+ err);
    else console.log('Connected to mongodb');
})

function verifyToken(req, res, next) {
    if(!req.headers.authorization) return res.status(401).send('Unauthorized request');
    let token = req.headers.authorization.split(' ')[1];
    if(token ==='null') return res.status(401).send('Unauthorized request');
    let payload = jwt.verify(token, 'secretKey');
    if(!payload) return res.status(401).send('Unauthorized request');

    req.userId = payload.subject;
    next();
}

router.get('/', (req, res) => {
    res.send('From API route');
});

router.post('/register', (req, res) => {
    let userData = req.body;
    let user = new User(userData);
    user.save((error, registeredUser) => {
        if(error) console.log(error);
        else {
            let payload = { subject: registeredUser._id };
            let token = jwt.sign(payload, 'secretKey');
            res.status(200).send({token});
        }
    });
});

router.post('/login', (req, res) => {
    let userData = req.body;

    User.findOne({email: userData.email}, (error, user) => {
        if(error) console.log(error);
        else {
            if(!user) res.status(401).send("Invalid email");
            else if(user.password != userData.password) res.status(401).send("Invalid password");
            else {
                let payload = { subject: user._id }
                let token = jwt.sign(payload, 'secretKey');
                res.status(200).send({token});
            }
        }
    });
});

router.get('/events', (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "CES",
            "description": "go to ces",
            "date": "2012-04-23T18:25:43.000Z"
        },
        {
            "_id": "2",
            "name": "GStar",
            "description": "game conference",
            "date": "2016-06-03T10:20:00.000Z"
        },
        {
            "_id": "6",
            "name": "HCI",
            "description": "Computer interaction",
            "date": "2016-04-01T00:20:00.000Z"
        }
    ]

    res.json(events);
});

router.get('/special', verifyToken, (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "CES",
            "description": "go to ces",
            "date": "2012-04-23T18:25:43.000Z"
        },
        {
            "_id": "2",
            "name": "GStar",
            "description": "game conference",
            "date": "2016-06-03T10:20:00.000Z"
        },
        {
            "_id": "3",
            "name": "Tiger",
            "description": "what is this",
            "date": "2019-12-12T10:00:43.000Z"
        },
        {
            "_id": "4",
            "name": "Monster",
            "description": "Hey",
            "date": "2018-11-05T09:00:48.000Z"
        },
        {
            "_id": "5",
            "name": "Rally-Ho",
            "description": "Baby",
            "date": "2018-04-23T02:25:43.000Z"
        },
        {
            "_id": "6",
            "name": "HCI",
            "description": "Computer interaction",
            "date": "2016-04-01T00:20:00.000Z"
        }
    ]

    res.json(events);
});

module.exports = router;