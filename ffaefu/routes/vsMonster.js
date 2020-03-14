let utility = require("../utility.js");
let battle = require("../battleRoutine.js");
let fs = require("fs");

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.redirect('status'); 
});
router.post('/', function (req, res, next){
    if (req.session.user !== undefined) {
        fs.readFile('./database/enemyData/Level1/' + 1 + ".json", 'utf-8', function (err, enemy) {
            console.log(err);
            console.log(enemy);
            let content = battle.battleAgainstMonster(req.session.user, JSON.parse(enemy));
            console.log("戦闘後のコンテンツ表示");
            if (!err) {
                console.log(content);
                res.render('vsMonster', {
                    title: "FFA えふ改",
                    subTitle: "戦闘",
                    content: content,
                    user: req.session.user
                });
            } else {
                console.log(err);
            }
        });
    } else {
        res.redirect('/');
    }
});



module.exports = router;
