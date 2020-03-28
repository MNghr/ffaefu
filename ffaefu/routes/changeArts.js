var express = require('express');
var router = express.Router();
let utility = require("../utility.js");
let jobInformation = require("../informations/jobInformation.js");
let weaponInformation = require("../informations/weaponInformation.js");
let accessoryInformation = require("../informations/accessoryInformation.js");
let armorInformation = require("../informations/armorInformation.js");


router.get('/', function (req, res, next) {
    if (req.session.user !== undefined) {
        res.render('changeArts', { 
            title: "FFA えふ改",
            subTitle: "戦術を変更する",
            user: req.session.user,
            changeableArts: utility.getChangeableArts(req.session.user)
        });
    } else {
        res.redirect('/');
    }
});



module.exports = router;