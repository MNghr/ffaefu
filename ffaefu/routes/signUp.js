let express = require('express');
let router = express.Router();
let fs = require('fs');
let utility = require("../utility.js");

router.get('/', function (req, res, next) {
    res.render('signUp', {
        subTitle: "登録情報入力画面",
        title: "FFA えふ改",
        isRegisterd: false
    });
});

//ユーザ登録処理
router.post('/', function (req, res, next) {
    
    let userId = req.body.user_id;
    let userName = req.body.user_name;
    let password = req.body.password;
    let userData = {
        userId: userId,
        userName: userName,
        password: password,
        maxHP: 500,
        currentHP: 500,
        power: 8,
        mana: 8,
        religion: 8,
        vitality: 8,
        agility: 8,
        charm: 8,
        dexterity: 8,
        karma: 8,
        level: 1,
        money: 1500,
        exp: 0,
        homePageName: "FFA えふ改",
        homePageURL: "https://google.com",
        weapon: 0,
        armor: 0,
        accessory: 0,
        bank: 0,
        job: req.body.job,
        lastBattleDate: utility.date.getTime()
    };
    //データベースファイルを開いて書き込む
    fs.writeFile('./database/userData' + userId + ".json", JSON.stringify(userData),function (err) {
        console.log(err);
        if (err) {
            res.render('signUp', {
                subTitle: "ユーザ作成に失敗しました",
                title: "FFA えふ改",
                isRegisterd: false
            });
        } else {
            res.render('signUp', {
                subTitle: "登録完了",
                title: "FFA えふ改",
                isRegisterd: true,
                userId: userId,
                userName: userName,
                userJob: user.job
            });
        }

    });

});

module.exports = router;
