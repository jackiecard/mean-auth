var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/user.js');
var Profile = require('../models/profile.js');


router.post('/register', function(req, res) {
    User.register(new User({ username: req.body.username }),
        req.body.password, function(err, account) {
            if (err) {
                return res.status(500).json({
                    err: err
                });
            }
            passport.authenticate('local')(req, res, function () {
                return res.status(200).json({
                    status: 'Registration successful!'
                });
            });
        });
});

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                err: info
            });
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.status(500).json({
                    err: 'Could not log in user'
                });
            }

            res.status(200).json({
                status: 'Login successful!',
                username: user.username
            });
        });
    })(req, res, next);
});

router.get('/logout', function(req, res) {
    req.logout();
    res.status(200).json({
        status: 'Bye!'
    });
});

router.get('/status', function(req, res) {
    if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false
        });
    }
    res.status(200).json({
        status: true
    });
});

router.get('/profile/:username', function(req, res) {



    Profile.findOne({username : req.params.username}, function(err, profile) {
        if (err)
            res.send(err);

        res.json(profile);

    });
})


router.post('/profile/', function(req, res) {
    var profile = new Profile();
    profile.username = req.body.username;
    profile.firstName = req.body.firstName;
    profile.lastName = req.body.lastName;
    profile.email = req.body.email;
    profile.telephone = req.body.telephone;

    profile.save(function(err, profileCreated) {
        if (err)
            res.send(err);

        res.json(profileCreated);
    });
})


router.put('/profile/', function(req, res) {

    Profile.findOne({username : req.body.username}, function(err, profile) {
        if (err)
            res.send(err);

        profile.firstName = req.body.firstName;
        profile.lastName = req.body.lastName;
        profile.email = req.body.email;
        profile.telephone = req.body.telephone;

        profile.save(function(err, profileCreated) {
            if (err)
                res.send(err);

            res.json(profileCreated);
        })

    })
});



module.exports = router;