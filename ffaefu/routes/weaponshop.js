let express = require('express');
let usersPeripheral = require("../usersPeripheral.js");
let configuration = require("../configuration.js");
let jobInformation = require("../informations/jobInformation.js")
let weaponInformation = require("../informations/weaponInformation.js");
let router = express.Router();
let fs = require('fs');

router.get('/', function (req, res, next) {
    //res.redirect('/status');
    if (req.session.user) {
        let availableWeapons = [];
        console.log(jobInformation.jobList[req.session.user.job].weapon);
        for (let i = 0; i < jobInformation.jobList[req.session.user.job].weapon.length; ++i){
            console.log(weaponInformation.weaponList[jobInformation.jobList[req.session.user.job].weapon[i]]);
            availableWeapons.push(weaponInformation.weaponList[jobInformation.jobList[req.session.user.job].weapon[i]]);
        }
        console.log(availableWeapons);
        res.render('weaponShop', {
            title: configuration.gameTitle,
            subTitle: "武器屋",
            user: req.session.user,
            weapons: availableWeapons,
            content: "",
            mode: "selectWeapon"
        });
    } else {
        res.redirect('/');
    }
});

router.post('/', function (req, res, next) {
    let content = "";
    if (req.session.user.money < weaponInformation.weaponList[jobInformation.jobList[req.session.user.job].weapon[req.body.targetWeapon]].value) {
        content = "エラー:所持金が足りません";
    } else {
        usersPeripheral.buyWeapon(req.session.user, weaponInformation.weaponList[jobInformation.jobList[req.session.user.job].weapon[req.body.targetWeapon]]);
        console.log(jobInformation.jobList[req.session.user.job].weapon[req.body.targetWeapon]);
        console.log(req.session.user.weapon);
        content = weaponInformation.weaponList[jobInformation.jobList[req.session.user.job].weapon[req.body.targetWeapon]].name + "を購入して倉庫に送りました．";
    }
    res.render('weaponShop', {
        title: configuration.gameTitle,
        subTitle: "購入完了",
        user: req.session.user,
        weapons: [],
        content: content,
        mode: "finished"
    });
});

module.exports = router;
