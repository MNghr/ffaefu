var express = require('express');
var router = express.Router();
let utility = require("../utility.js");
let jobInformation = require("../informations/jobInformation.js");
let weaponInformation = require("../informations/weaponInformation.js");
let accessoryInformation = require("../informations/accessoryInformation.js");
let armorInformation = require("../informations/armorInformation.js");


router.get('/', function (req, res, next) {
    if (req.session.user !== undefined) {
        res.render('changeJob', { 
            title: "FFA えふ改",
            subTitle: "転職の祠",
            user: req.session.user,
            changeableJobs: utility.getChangeableJobs(req.session.user)
        });
    } else {
        res.redirect('/');
    }
});



module.exports = router;