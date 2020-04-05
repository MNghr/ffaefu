var express = require('express');
var router = express.Router();
let usersPeripheral = require("../usersPeripheral.js");
let jobInformation = require("../informations/jobInformation.js");
let weaponInformation = require("../informations/weaponInformation.js");
let accessoryInformation = require("../informations/accessoryInformation.js");
let armorInformation = require("../informations/armorInformation.js");
let ArtsInformation = require("../informations/artsInformation");

router.get('/', function (req, res, next) {
    if (req.session.user !== undefined) {
        res.render('changeArts', { 
            title: "FFA えふ改",
            subTitle: "戦術を変更する",
            user: req.session.user,
            changeableArts: usersPeripheral.getChangeableArts(req.session.user),
            setArts: usersPeripheral.getArtsOfUser(req.session.user),
            mode: "selectArts"
        });
    } else {
        res.redirect('/');
    }
});

router.post('/', function (req, res, next) {
    if (req.session.user !== undefined) {
        if (req.body.artsNumber !== undefined) {
            console.log(req.session.user.setArts);
            req.session.user.setArts = req.body.artsNumber;
            console.log(req.session.user.setArts);
            console.log(usersPeripheral.getArtsOfUser(req.session.user));
            res.render('changeArts', {
                title: "FFA えふ改",
                subTitle: "戦術を変更する",
                user: req.session.user,
                changeableArts: usersPeripheral.getChangeableArts(req.session.user),
                setArts: ArtsInformation.artsList[req.session.user.setArts],

                mode: "done"
            });
        } else {
            res.render('changeArts', {
                title: "FFA えふ改",
                subTitle: "戦術を変更する",
                user: req.session.user,
                changeableArts: usersPeripheral.getChangeableArts(req.session.user),
                setArts: ArtsInformation.artsList[req.session.user.setArts],
                mode: "error"
            }); 
        }
    } else {
        res.redirect('/');
    }
});



module.exports = router;