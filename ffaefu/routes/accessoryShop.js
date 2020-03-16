let express = require('express');
let utility = require("../utility.js");
let router = express.Router();
let fs = require('fs');

router.get('/', function (req, res, next) {
    //res.redirect('/status');
    
    if (req.session.user) {
        res.render('login', {
            title: "装飾品屋",
            loginSucceeded: true,
            user: req.session.user
        });
    } else {
        res.redirect('/');
    }
});

router.post('/', function (req, res, next) {
    res.redirect('/status');
});

module.exports = router;
