var express = require('express');
var router = express.Router();
let fs = require('fs');

router.get('/', function(req, res, next) {
    res.render('signUpConfirm', {
        title: 'FFA えふ改',
        isRegisterd: false
    });
});

router.post('/', function (req, res, next) {
    //ファイルを開いて処理をする．
    res.render('signUpConfirm', {
        title: "signUpConfirm",
        isRegisterd: true
    });
});

module.exports = router;