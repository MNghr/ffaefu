let express = require('express');
let utility = require("../utility.js");
let configuration = require("../configuration.js");
let jobInformation = require("../informations/jobInformation.js")
let weaponInformation = require("../informations/weaponInformation.js");
let router = express.Router();
let fs = require('fs');

router.get('/', function (req, res, next) {
    //res.redirect('/status');
    if (req.session.user) {
        availableWeapons = [];
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
    res.render('weaponshop', {
        title: configuration.gameTitle,
        user: req.session.user,
        weapons: [],
        content: "現在準備中です．少々お待ちください．",
        mode: "finished"
    });
});

module.exports = router;
