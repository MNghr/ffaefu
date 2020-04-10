let usersPeripheral = require("../usersPeripheral.js");
let battle = require("../battleRoutine.js");
let fs = require("fs");
let configuration = require("../configuration.js");
let utility = require("../utility.js")

var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {
    res.redirect('status'); 
});

//「モンスターと戦う/その辺の探索」 post以外のメソッドでのリクエストは受け付けずステータス画面へ戻る．
router.post('/', function (req, res, next) {
    (async () => {
        if (req.session.user !== undefined) {
            if (usersPeripheral.calculateStamina(req.session.user.lastBattleDate) < configuration.vsMonsterStamina) {
                res.render('vsChampion', {
                    title: "FFA えふ改",
                    subTitle: "エラー！",
                    content: "スタミナ不足です．",
                    user: req.session.user
                });
            } else {
                champion = await utility.readChampion();
                console.log(JSON.parse(champion));
                let content = //battle.battleAgainstPlayer(req.session.user, JSON.parse(enemy));
                console.log("戦闘後のコンテンツ表示");
                console.log(req.session.user.lastBattleDate);
                if (true) {
                    console.log(content);
                    res.render('vsChampion', {
                        title: "FFA えふ改",
                        subTitle: JSON.parse(champion).name + "に勝負を挑んだ！",
                        content: content,
                        user: req.session.user
                    });
                } else {
                    console.log(err);
                }
            }
        } else {
            res.redirect('/');
        }
    })().catch(next);
});

module.exports = router;