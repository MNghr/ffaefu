var express = require('express');
var router = express.Router();
let fs = require("fs");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'FFA えふ改' });
});

router.post('/login', function (req, res, next) {
  let userId = req.body.userId;
  let password = req.body.password;
  //データベースファイルを開いて書き込む
  fs.readFile('./database/userData' + userId + ".json", 'utf-8',function (err,data) {
      console.log(err);
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        if (JSON.parse(data).password === password) {
          console.log("パスワード照合完了");
          req.session.user = JSON.parse(data);
        }
      }
      res.redirect('/login');

  });
});

module.exports = router;
