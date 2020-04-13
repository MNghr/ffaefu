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
                res.render('legendPlace', {
                    title: "FFA えふ改",
                    subTitle: "エラー！",
                    content: "スタミナ不足です．",
                    user: req.session.user
                });
            } else {
                if (req.body.difficulty !== undefined) {
                    req.session.user.beingLegendPlace = parseInt(req.body.difficulty);
                }
                let enemy = enemyInformation.legendPlace[req.session.user.beingLegendPlace][req.session.user.legendPlaceProgress];
                console.log(enemy);
                let result = await battle.goLegendPlace(req.session.user, enemy);
                let content = battle.returnMessage;
                console.log("戦闘後のコンテンツ表示");
                console.log(req.session.user.lastBattleDate);
                req.session.user.legendPlaceProgress += 1;
                console.log(req.session.user.legendPlaceProgress);
                console.log(enemyInformation.legendPlace[req.session.user.beingLegendPlace].length);
                let isFinished = false;
                if (result === "lose" || result === "runAway") {
                    isFinished = true;
                    legendPlaceProgress = 0;
                    beingLegendPlace = -1;
                }
                console.log(result);
                if (req.session.user.legendPlaceProgress === enemyInformation.legendPlace[req.session.user.beingLegendPlace].length  && result === "win") {
                    isFinished = true;
                    legendPlaceProgress = 0;
                    beingLegendPlace = -1;
                    if (req.session.user.degree <= req.session.user.beingLegendPlace) {
                        req.session.user.degree += 1;
                        content += "<h1>" + req.session.user.name + "はレジェンドプレイスを攻略した！！！称号が" + configuration.degree[req.session.user.degree] + "になった！！！</h1>"
                    } else {
                        content += "<h1>" + req.session.user.name + "はレジェンドプレイスを攻略した！！！";
                    }
                }
                if (true) {
                    console.log(content);
                    res.render('legendPlace', {
                        title: "FFA えふ改",
                        subTitle: enemy.name + "が現れた！",
                        content: content,
                        user: req.session.user,
                        isFinished: isFinished
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