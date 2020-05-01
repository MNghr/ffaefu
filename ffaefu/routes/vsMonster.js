let usersPeripheral = require("../usersPeripheral.js");
let battle = require("../battleRoutine.js");
let fs = require("fs").promises;
let configuration = require("../configuration.js");
let utility = require("../utility.js")
let enemyInformation = require("../informations/enemyInformation.js");

var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {
    res.redirect('status'); 
});

//「モンスターと戦う/その辺の探索」 GETは受け付けずステータス画面へ戻る．
router.post('/', function (req, res, next) {
    (async () => {
        if (req.session.user !== undefined) {
            if (usersPeripheral.calculateStamina(req.session.user.lastBattleDate) < configuration.vsMonsterStamina) {
                res.render('vsMonster', {
                    title: "FFA えふ改",
                    subTitle: "エラー！",
                    content: "スタミナ不足です．",
                    user: req.session.user
                });
            } else {

                let enemy = enemyInformation.vsMonster[parseInt(req.body.difficulty)][utility.random(0,enemyInformation.vsMonster[parseInt(req.body.difficulty)].length-1)];
                console.log(enemy);
                req.session.user.vsMonsterLevel = parseInt(req.body.difficulty);
                let result = await battle.battleAgainstMonster(req.session.user, enemy);
                let content = battle.returnMessage;
                console.log("戦闘後のコンテンツ表示");
                console.log(req.session.user.lastBattleDate);
                   
                if (true) {
                    console.log(content);
                    res.render('vsMonster', {
                        title: "FFA えふ改",
                        subTitle: enemy.name + "が現れた！",
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
