let express = require('express');
let router = express.Router();
let fs = require('fs');

router.get('/', function (req, res, next) {
    //res.redirect('/status');
    if (req.session.user) {
        res.render('login', {
            title: "ログイン成功",
            loginSucceeded: true,
            user: req.session.user.userName
        });
    } else {
        res.render('login', { title: "ログイン失敗", loginSucceeded: false });
    }
});

router.post('/', function (req, res, next) {
    console.log('ステータス画面へ');
    res.redirect('/status');
});

module.exports = router;
