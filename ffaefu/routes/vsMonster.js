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
    if (req.session.user !== undefined) {
        if (usersPeripheral.calculateStamina(req.session.user.lastBattleDate) < configuration.vsMonsterStamina) {
            res.render('vsMonster', {
                title: "FFA えふ改",
                subTitle: "エラー！",
                content: "スタミナ不足です．",
                user: req.session.user
            });
        } else {
            fs.readFile('./database/enemyData/Level1/' + 1 + ".json", 'utf-8', function (err, enemy) {
                console.log(err);
                console.log(enemy);
                let content = battle.battleAgainstMonster(req.session.user, JSON.parse(enemy));
                console.log("戦闘後のコンテンツ表示");
                console.log(req.session.user.lastBattleDate);
                if (!err) {
                    console.log(content);
                    res.render('vsMonster', {
                        title: "FFA えふ改",
                        subTitle: JSON.parse(enemy).name + "が現れた！",
                        content: content,
                        user: req.session.user
                    });
                } else {
                    console.log(err);
                }
            });
        }
    } else {
        res.redirect('/');
    }
});



module.exports = router;
