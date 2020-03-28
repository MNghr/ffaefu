var express = require('express');
var router = express.Router();
let utility = require("../utility.js");
let jobInformation = require("../informations/jobInformation.js");
let weaponInformation = require("../informations/weaponInformation.js");
let accessoryInformation = require("../informations/accessoryInformation.js");
let armorInformation = require("../informations/armorInformation.js");

//ステータス画面のバックエンド．ステータス画面描画に必要なデータをejs側に飛ばすだけ．
router.get('/', function (req, res, next) {
    if (req.session.user !== undefined) {
        console.log(weaponInformation);
        res.render('status', {
            title: "FFA えふ改",
            subTitle: "ステータス画面",
            user: req.session.user,
            job: jobInformation.jobList[req.session.user.job],
            weapon: weaponInformation.weaponList[req.session.user.weapon],
            armor: armorInformation.armorList[req.session.user.armor],
            accessory: accessoryInformation.accessoryList[req.session.user.accessory],
            stamina: utility.calculateStamina(req.session.user.lastBattleDate)
        });
    } else {
        res.redirect('/');
    }
});



module.exports = router;