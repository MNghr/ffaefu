let express = require('express');
let usersPeripheral = require("../usersPeripheral.js");
let configuration = require("../configuration.js");
let jobInformation = require("../informations/jobInformation.js")
let itemInformation = require("../informations/itemInformation.js");
let router = express.Router();
let fs = require('fs');

router.get('/', function (req, res, next) {
    (async () => {
        if (req.session.user) {
            let forSale = JSON.parse(JSON.stringify(itemInformation.itemList));
            let userItems = usersPeripheral.makeUserItemList(req.session.user);

            res.render('itemShop', {
                title: configuration.gameTitle,
                subTitle: "道具屋",
                user: req.session.user,
                items: forSale,
                userItems: userItems,
                content: "",
                mode: "selectItem"
            });
        } else {
            res.redirect('/');
        }
    })().catch(next);
});

router.post('/', function (req, res, next) {
    (async () => {
        let content = "";
        if (req.session.user.money < itemInformation.itemList[List]) {
            content = "エラー:所持金が足りません";
        } else {
            utility.buyAccessory(req.session.user, accessoryInformation.accessoryList[jobInformation.jobList[req.session.user.job].accessory[req.body.targetAccessory]]);
            console.log(jobInformation.jobList[req.session.user.job].accessory[req.body.targetAccessory]);
            console.log(req.session.user.accessory);
            content = accessoryInformation.accessoryList[jobInformation.jobList[req.session.user.job].accessory[req.body.targetAccessory]].name + "を購入して倉庫に送りました．";
        }
        res.render('itemShop', {
            title: configuration.gameTitle,
            subTitle: "購入完了",
            user: req.session.user,
            accessories: [],
            content: content,
            mode: "finished"
        });
    })().catch(next);
});

module.exports = router;