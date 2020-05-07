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
        if (req.session.user) {
            let content = "";
            if (req.body.mode === "buy") {
                if (await usersPeripheral.buyItem(req.session.user, parseInt(req.body.targetItem), parseInt(req.body.amount))) {
                    content = itemInformation.itemList[parseInt(req.body.targetItem)].name + "を購入しました！";

                } else {
                    content = "エラー！！お金が足りません";
                }
            } else if (req.body.mode === "sell") {
                let sum = await usersPeripheral.sellItem(req.session.user, parseInt(req.body.targetItem), parseInt(req.body.amount))
                if (sum > 0) {
                    content = itemInformation.itemList[parseInt(req.body.targetItem)].name + "を売却し,"+sum+"Cを得ました！";
                } else {
                    content = "エラー！！アイテム数が足りません！";
                }
            } else {
                content = "不正なリクエストです．";
            }
            res.render('itemShop', {
                title: configuration.gameTitle,
                subTitle: "購入完了",
                user: req.session.user,
                accessories: [],
                content: content,
                mode: "finished"
            });
        } else {
            res.redirect('/');
        }
    })().catch(next);
});

module.exports = router;