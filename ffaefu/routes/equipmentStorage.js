var express = require('express');
var router = express.Router();
let fs = require("fs");
let utility = require("../utility.js")

/* GET users listing. */
router.get('/', function (req, res, next){
    if (req.session.user !== undefined) {
        res.render('equipmentStorage', {
            title: "FFAえふ改",
            subTitle: "装備品倉庫",
            user: req.session.user,
            content: "",
            isFinished: false,
            weapons: utility.getWeaponsOfUser(req.session.user),
            armors: utility.getArmorsOfUser(req.session.user),
            accessories:utility.getAccessoriesOfUser(req.session.user)
        });
    } else {
        res.redirect('/');
    }
});

router.post('/', function (req, res, next) {
    (async () => {
        if (req.session.user !== undefined) {
            let content = "";
            switch (req.body.mode) {
                case "weapon":
                    changeWeapon(req.session.user, parseInt(req.body.targetWeapon));
                    content += req.session.user.name + "は" + utility.getWeaponByIndex(req.session.user.weapon).name + "を装備した";
                    break;
                case "armor":
                    changeArmor(req.session.user, parseInt(req.body.targetArmor));
                    content += req.session.user.name + "は" + utility.getArmorByIndex(req.session.user.armor).name + "を装備した";
                    break;
                case "accessory":
                    changeAccessory(req.session.user, parseInt(req.body.targetAccessory));
                    content += req.session.user.name + "は" + utility.getAccessoryByIndex(req.session.user.accessory).name + "を装備した";
                    break;
            }
            await utility.writeUser(req.session.user);
            res.render('equipmentStorage', {
                title: "FFAえふ改",
                subTitle: "装備品倉庫",
                user: req.session.user,
                isFinished: true,
                content: content
            });
        } else {
            res.redirect('/');
        }
    })().catch(next);
});



function changeWeapon(user, target) {
    if (user.weapon === 0) {
        user.weapon = user.equipmentInventory.weapons[target];
        user.equipmentInventory.weapons.splice(target,1);
    } else {
        let tmp = user.weapon;
        user.weapon = user.equipmentInventory.weapons[target];
        user.equipmentInventory.weapons[target] = tmp;
    }
    return 0;
}

function changeArmor(user, target) {
    if (user.armor === 0) {
        user.armor = user.equipmentInventory.armors[target];
        user.equipmentInventory.armors.splice(target,1);
    } else {
        let tmp = user.armor;
        user.armor = user.equipmentInventory.armors[target];
        user.equipmentInventory.armors[target] = tmp;
    }
    return 0;
}

function changeAccessory(user, target) {
    if (user.accessory === 0) {
        user.accessory = user.equipmentInventory.accessories[target];
        user.equipmentInventory.accessories.splice(target,1);
    } else {
        let tmp = user.accessory;
        user.accessory = user.equipmentInventory.accessories[target];
        user.equipmentInventory.accessories[target]=tmp;
    }
    return 0;
}


module.exports = router;