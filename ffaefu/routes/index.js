var express = require('express');
var router = express.Router();
let fs = require("fs");
let usersPeripheral = require("../usersPeripheral.js");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'FFA えふ改' });

});

//ログイン処理
router.post('/', function (req, res, next) {
  (async () => {
    let userId = req.body.userId;
    let password = req.body.password;
    let data = {};
    try {
      data = await usersPeripheral.readUser({ userId: userId });
    } catch(err){
      res.redirect('/login');
    }
    console.log(data);
    if (data.password === password) {
      console.log("パスワード照合完了");
      req.session.user = data;
      /*
      [req.session.user,
        req.session.user.equipInventory,
           req.session.user.itemInventory,
        req.session.user.artsInventory,
        req.session.user.career
       ] = await utility.readAllDataOfUser({ userId: userId });*/
      
      //req.session.user = await utility.readAllDataOfUser({ userId: userId })[0];
    }
    res.redirect('/login');
    /*
    fs.readFile('./database/userData' + userId + ".json", 'utf-8', function (err, data) {
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

    });*/
  })().catch(next);
});

module.exports = router;
