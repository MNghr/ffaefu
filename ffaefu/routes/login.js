let express = require('express');
let utility = require("../utility.js");
let usersPeripheral = require("../usersPeripheral.js");
let router = express.Router();
let fs = require('fs');

router.get('/', function (req, res, next) {
    //res.redirect('/status');
    
    if (req.session.user) {
        req.session.lastLoginTime = utility.getDate().getTime();

        res.render('login', {
            title: req.session.user.name+"でログインしました",
            loginSucceeded: true,
            user: req.session.user.name,
            worldMessage: usersPeripheral.worldMessage
        });
    } else {
        res.render('login', { title: "ログイン失敗", loginSucceeded: false });
    }
});

router.post('/', function (req, res, next) {
    res.redirect('/status');
});

module.exports = router;
