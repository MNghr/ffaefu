var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next){
    if (req.session.user !== undefined) {
        if (req.session.user.money > req.session.user.level * 1000) {
            req.session.user.money -= req.session.user.level * 1000;
            req.session.user.currentHP = req.session.user.maxHP;
            //データベースに反映
            res.render('inn', {
                title: "FFA えふ改",
                subTitle: "宿屋",
                user: req.session.user
            });
        } else {
            res.render('inn', {
                title: "FFA えふ改",
                subTitle: "エラー！お金が足りません",
                user: req.session.user
            });
        }
    } else {
        res.redirect('/');
    }
});



module.exports = router;