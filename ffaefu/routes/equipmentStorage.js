var express = require('express');
var router = express.Router();
let fs = require("fs");
let utility = require("../utility.js")
/* GET users listing. */
router.get('/', function (req, res, next){
    if (req.session.user !== undefined) {
        res.render('bank', {
            title: "FFAえふ改",
            subTitle: "アイテム倉庫",
            user: req.session.user,
            isFinished: false
        });
    } else {
        res.redirect('/');
    }
});

router.post('/', function (req, res, next) {
    if (req.session.user !== undefined) {
        let modeMessage = "";
        switch (req.body.mode) {
            case "deposit":
                modeMessage = "deposit";
                //console.log("deposit");
                utility.deposit(req.session.user,req.body.amount);
                break;
            case "fullDeposit":
                modeMessage = "deposit";
                //console.log("fullDeposit");
                utility.fullDeposit(req.session.user);
                break;
            case "withdraw":
                modeMessage = "withdraw";
                //console.log("withdraw");
                utility.withdraw(req.session.user,req.body.amount);
                break;
            case "fullWithdraw":
                modeMessage = "withdraw";
                //console.log("fullwithdraw");
                utility.fullWithdraw(req.session.user);
                break;
            default:
                console.log("error-bank");
        }
        res.render('bank', {
            title: "FFAえふ改",
            subTitle: "銀行",
            user: req.session.user,
            isFinished: true,
            mode: modeMessage
        });
    } else {
        res.redirect('/');
   }
});



function changeWeapon(user,target){
    return 0;
}

function changeArmor(user,target){
    return 0;
}

function changeAccessory(user, target) {
    return 0;
}


module.exports = router;