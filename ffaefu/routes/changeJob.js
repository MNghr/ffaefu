var express = require('express');
var router = express.Router();
let usersPeripheral = require("../usersPeripheral.js");
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
            changeableJobs: usersPeripheral.getChangeableJobs(req.session.user),
            changeableAndNotYetMasterJobs: usersPeripheral.getChangeableAndNotYetMasterJobs(req.session.user),
            jobElement: usersPeripheral.getJobElementOfUser(req.session.user),
            mode:"selectJob"
        });
    } else {
        res.redirect('/');
    }
});

router.post('/', function (req, res, next) {
    (async () => {
        if (req.session.user !== undefined) {
            await usersPeripheral.changeJob(req.session.user, parseInt(req.body.jobNumber));
            res.render('changeJob', {
                title: "FFA えふ改",
                subTitle: "転職の祠",
                user: req.session.user,
                changeableJobs: usersPeripheral.getChangeableJobs(req.session.user),
                changeableAndNotYetMasterJobs: usersPeripheral.getChangeableAndNotYetMasterJobs(req.session.user),
                jobElement: usersPeripheral.getJobElementOfUser(req.session.user),
                mode: "done"
            });
        } else {
            res.redirect('/');
        }
    })().catch(next);
});



module.exports = router;