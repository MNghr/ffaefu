let express = require('express');
let router = express.Router();
let fs = require('fs');

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
    let userData = { userId: userId, userName: userName, password: password };
    //データベースファイルを開いて書き込む
    fs.writeFile('./database/userData' + userId + ".json", JSON.stringify(userData),function (err) {
        console.log(err);
        if (err) {
            res.render('signUp', {
                subTitle: "作成に失敗しました",
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
                password: password
            });
        }

    });

});

module.exports = router;
