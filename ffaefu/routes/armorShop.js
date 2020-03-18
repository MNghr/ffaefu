let express = require('express');
let utility = require("../utility.js");
let configuration = require("../configuration.js");
let jobInformation = require("../informations/jobInformation.js")
let armorInformation = require("../informations/armorInformation.js");
let router = express.Router();
let fs = require('fs');

router.get('/', function (req, res, next) {
    //res.redirect('/status');
    if (req.session.user) {
        let availableArmors = [];
        console.log(jobInformation.jobList[req.session.user.job].armor);
        for (let i = 0; i < jobInformation.jobList[req.session.user.job].armor.length; ++i){
            console.log(armorInformation.armorList[jobInformation.jobList[req.session.user.job].armor[i]]);
            availableArmors.push(armorInformation.armorList[jobInformation.jobList[req.session.user.job].armor[i]]);
        }
        console.log(availableArmors);
        res.render('armorShop', {
            title: configuration.gameTitle,
            subTitle: "防具屋",
            user: req.session.user,
            armors: availableArmors,
            content: "",
            mode: "selectArmor"
        });
    } else {
        res.redirect('/');
    }
});

router.post('/', function (req, res, next) {
    let content = "";
    if (req.session.user.money < armorInformation.armorList[jobInformation.jobList[req.session.user.job].armor[req.body.targetArmor]].value) {
        content = "エラー:所持金が足りません";
    } else {
        utility.buyArmor(req.session.user, armorInformation.armorList[jobInformation.jobList[req.session.user.job].armor[req.body.targetArmor]]);
        console.log(jobInformation.jobList[req.session.user.job].armor[req.body.targetArmor]);
        content = armorInformation.armorList[jobInformation.jobList[req.session.user.job].armor[req.body.targetArmor]].name + "を購入しました．" + req.session.user.userName + "は早速装備した！";
    }
    res.render('armorShop', {
        title: configuration.gameTitle,
        subTitle: "購入完了",
        user: req.session.user,
        armors: [],
        content: content,
        mode: "finished"
    });
});

module.exports = router;
