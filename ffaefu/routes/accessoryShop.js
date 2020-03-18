let express = require('express');
let utility = require("../utility.js");
let configuration = require("../configuration.js");
let jobInformation = require("../informations/jobInformation.js")
let accessoryInformation = require("../informations/accessoryInformation.js");
let router = express.Router();
let fs = require('fs');

router.get('/', function (req, res, next) {
    //res.redirect('/status');
    if (req.session.user) {
        let availableAccessories = [];
        console.log(jobInformation.jobList[req.session.user.job].accessory);
        for (let i = 0; i < jobInformation.jobList[req.session.user.job].accessory.length; ++i){
            console.log(accessoryInformation.accessoryList[jobInformation.jobList[req.session.user.job].accessory[i]]);
            availableAccessories.push(accessoryInformation.accessoryList[jobInformation.jobList[req.session.user.job].accessory[i]]);
        }
        console.log(availableAccessories);
        res.render('accessoryShop', {
            title: configuration.gameTitle,
            subTitle: "武器屋",
            user: req.session.user,
            accessories: availableAccessories,
            content: "",
            mode: "selectAccessory"
        });
    } else {
        res.redirect('/');
    }
});

router.post('/', function (req, res, next) {
    let content = "";
    if (req.session.user.money < accessoryInformation.accessoryList[jobInformation.jobList[req.session.user.job].accessory[req.body.targetAccessory]].value) {
        content = "エラー:所持金が足りません";
    } else {
        utility.buyAccessory(req.session.user, accessoryInformation.accessoryList[jobInformation.jobList[req.session.user.job].accessory[req.body.targetAccessory]]);
        console.log(jobInformation.jobList[req.session.user.job].accessory[req.body.targetAccessory]);
        console.log(req.session.user.accessory);
        content = accessoryInformation.accessoryList[jobInformation.jobList[req.session.user.job].accessory[req.body.targetAccessory]].name + "を購入しました．" + req.session.user.userName + "は早速装備した！";
    }
    res.render('accessoryShop', {
        title: configuration.gameTitle,
        subTitle: "購入完了",
        user: req.session.user,
        accessories: [],
        content: content,
        mode: "finished"
    });
});

module.exports = router;
