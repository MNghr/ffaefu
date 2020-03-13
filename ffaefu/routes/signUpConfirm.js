var express = require('express');
var router = express.Router();
let fs = require('fs');

router.get('/', function(req, res, next) {
    res.render('signUpConfirm', {
        title: '登録確認画面',
        isRegisterd: false
    });
});

router.post('/', function (req, res, next) {
    //ファイルを開いて処理をする．
    res.render('signUpConfirm', {
        title: "登録確認画面",
        isRegisterd: true
    });
});

module.exports = router;