var express = require('express');
var router = express.Router();
let utility = require("../utility.js")

/* GET users listing. */
router.get('/', function (req, res, next){
    if (req.session.user !== undefined) {
        res.render('status', {
            title: "FFA えふ改",
            subTitle: "ステータス画面",
            user: req.session.user,
            stamina: utility.calculateStamina(req.session.user.lastBattleDate)
        });
    } else {
        res.redirect('/');
    }
});



module.exports = router;