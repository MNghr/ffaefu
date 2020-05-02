let express = require('express');
let utility = require("../utility.js");
let usersPeripheral = require("../usersPeripheral.js");
let router = express.Router();
let fs = require('fs');

router.get('/', function (req, res, next) {
    //res.redirect('/status');
    
    if (req.session.user) {
        req.session.lastLoginTime = utility.getDate().getTime();
        usersPeripheral.addPlayingPlayers({ userId: req.session.user.userId, name: req.session.user.name,lastInputTime: utility.getTime() }); //「この辺のプレイヤー」リスト更新
        res.render('login', {
            title: "ログイン成功",
            loginSucceeded: true,
            user: req.session.user.name
        });
    } else {
        res.render('login', { title: "ログイン失敗", loginSucceeded: false });
    }
});

router.post('/', function (req, res, next) {
    res.redirect('/status');
});

module.exports = router;
