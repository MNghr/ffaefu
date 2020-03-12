let express = require('express');
let router = express.Router();
let fs = require('fs');

router.get('/', function (req, res, next) {
    res.render('signUp', {
       title: "新規登録画面" 
    });
});

router.post('/', function (req, res, next) {
    res.redirect('/signUpConfirm');
});

module.exports = router;
