var express = require('express');
var router = express.Router();
let fs = require("fs");
let utility = require("../utility.js");
/* GET users listing. */
router.get('/', function (req, res, next){
    if (req.session.user !== undefined) {
        if (req.session.user.money > req.session.user.level * 1000) {
            req.session.user.money -= req.session.user.level * 1000;
            req.session.user.currentHP = req.session.user.maxHP;

            //fs.writeFile('./database/userData' + req.session.user.userId + ".json", JSON.stringify(req.session.user));
            utility.writeUser(req.session.user);
            console.log("宿屋ファイル書き換え完了");
            res.render('inn', {
                title: "FFA えふ改",
                subTitle: "宿屋",
                isHealed: true,
                user: req.session.user
            });
        } else {
            res.render('inn', {
                title: "FFA えふ改",
                subTitle: "エラー！お金が足りません",
                isHealed: false,
                user: req.session.user
            });
        }
    } else {
        res.redirect('/');
    }
});



module.exports = router;