var express = require('express');
var router = express.Router();
let usersPeripheral = require("../usersPeripheral.js");
let jobInformation = require("../informations/jobInformation.js");
let weaponInformation = require("../informations/weaponInformation.js");
let accessoryInformation = require("../informations/accessoryInformation.js");
let armorInformation = require("../informations/armorInformation.js");
let configuration = require("../configuration.js");

//ステータス画面のバックエンド．ステータス画面描画に必要なデータをejs側に飛ばすだけ．
router.get('/', function (req, res, next) {
    (async () => {
        if (req.session.user !== undefined) {
            let data = await usersPeripheral.readChampion();
            //console.log(data);
            req.session.user.legendPlaceProgress = 0;
            res.render('status', {
                title: "FFA えふ改",
                subTitle: "ステータス画面",
                user: req.session.user,
                job: jobInformation.jobList[req.session.user.job],
                weapon: weaponInformation.weaponList[req.session.user.weapon],
                armor: armorInformation.armorList[req.session.user.armor],
                accessory: accessoryInformation.accessoryList[req.session.user.accessory],
                stamina: usersPeripheral.calculateStamina(req.session.user.lastBattleDate),
                champion: JSON.parse(await usersPeripheral.readChampion()),
                configuration: configuration
        });
        } else {
            res.redirect('/');
        }
    })().catch(next);
});



module.exports = router;