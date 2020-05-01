var express = require('express');
var router = express.Router();
let fs = require("fs");
let usersPeripheral = require("../usersPeripheral.js")

/* GET users listing. */
router.get('/', function (req, res, next){
    if (req.session.user !== undefined) {
        res.render('equipmentStorage', {
            title: "FFAえふ改",
            subTitle: "装備品倉庫",
            user: req.session.user,
            content: "",
            isFinished: false,
            weapons: usersPeripheral.getWeaponsOfUser(req.session.user),
            armors: usersPeripheral.getArmorsOfUser(req.session.user),
            accessories:usersPeripheral.getAccessoriesOfUser(req.session.user)
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
                    content += req.session.user.name + "は" + usersPeripheral.getWeaponByIndex(req.session.user.weapon).name + "を装備した.";
                    break;
                case "armor":
                    changeArmor(req.session.user, parseInt(req.body.targetArmor));
                    content += req.session.user.name + "は" + usersPeripheral.getArmorByIndex(req.session.user.armor).name + "を装備した";
                    break;
                case "accessory":
                    changeAccessory(req.session.user, parseInt(req.body.targetAccessory));
                    content += req.session.user.name + "は" + usersPeripheral.getAccessoryByIndex(req.session.user.accessory).name + "を装備した";
                    break;
                case "weaponRenounce":
                    content += req.session.user.name + "は" + usersPeripheral.getWeaponByIndex(req.session.user.equipmentInventory.armors[parseInt(req.body.targetWeapon)]).name + "を投げ捨てた";
                    renounceWeapon(req.session.user, parseInt(req.body.targetWeapon));
                    break;
                case "armorRenounce":
                    content += req.session.user.name + "は" + usersPeripheral.getArmorByIndex(req.session.user.equipmentInventory.armors[parseInt(req.body.targetArmor)]).name + "を投げ捨てた";
                    renounceArmor(req.session.user, parseInt(req.body.targetArmor));
                    break;
                case "accessoryRenounce":
                    content += req.session.user.name + "は" + usersPeripheral.getAccessoryByIndex(req.session.user.equipmentInventory.accessories[parseInt(req.body.targetAccessory)]).name + "を投げ捨てた";
                    renounceAccessory(req.session.user, parseInt(req.body.targetAccessory));
                    break;
            }
            
            await usersPeripheral.writeUser(req.session.user);
            res.render('equipmentStorage', {
                title: "FFAえふ改",
                subTitle: "装備品倉庫",
                user: req.session.user,
                isFinished: true,
                content: content,
            });
        } else {
            res.redirect('/');
        }
    })().catch(next);
});



function changeWeapon(user, targetIndex) {
    if (user.weapon === 0) {
        user.weapon = user.equipmentInventory.weapons[targetIndex];
        user.equipmentInventory.weapons.splice(targetIndex,1);
    } else {
        let tmp = user.weapon;
        user.weapon = user.equipmentInventory.weapons[targetIndex];
        user.equipmentInventory.weapons[targetIndex] = tmp;
    }
    return 0;
}

function renounceWeapon(user, targetIndex) {
    user.equipmentInventory.weapons.splice(targetIndex, 1);
    return 0;
}

function changeArmor(user, targetIndex) {
    if (user.armor === 0) {
        user.armor = user.equipmentInventory.armors[targetIndex];
        user.equipmentInventory.armors.splice(targetIndex,1);
    } else {
        let tmp = user.armor;
        user.armor = user.equipmentInventory.armors[targetIndex];
        user.equipmentInventory.armors[targetIndex] = tmp;
    }
    return 0;
}

function renounceArmor(user, targetIndex) {
    user.equipmentInventory.armors.splice(targetIndex, 1);
    return 0;
}

function changeAccessory(user, targetIndex) {
    if (user.accessory === 0) {
        user.accessory = user.equipmentInventory.accessories[targetIndex];
        user.equipmentInventory.accessories.splice(targetIndex,1);
    } else {
        let tmp = user.accessory;
        user.accessory = user.equipmentInventory.accessories[targetIndex];
        user.equipmentInventory.accessories[targetIndex]=tmp;
    }
    return 0;
}

function renounceAccessory(user, targetIndex) {
    user.equipmentInventory.accessories.splice(targetIndex,1);
    return 0;
}



module.exports = router;