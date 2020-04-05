var express = require('express');
var router = express.Router();
let fs = require("fs");
let usersPeripheral = require("../usersPeripheral.js")
/* GET users listing. */
router.get('/', function (req, res, next){
    if (req.session.user !== undefined) {
        res.render('bank', {
            title: "FFAえふ改",
            subTitle: "銀行",
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
                usersPeripheral.deposit(req.session.user,req.body.amount);
                break;
            case "fullDeposit":
                modeMessage = "deposit";
                //console.log("fullDeposit");
                usersPeripheral.fullDeposit(req.session.user);
                break;
            case "withdraw":
                modeMessage = "withdraw";
                //console.log("withdraw");
                usersPeripheral.withdraw(req.session.user,req.body.amount);
                break;
            case "fullWithdraw":
                modeMessage = "withdraw";
                //console.log("fullwithdraw");
                usersPeripheral.fullWithdraw(req.session.user);
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

module.exports = router;