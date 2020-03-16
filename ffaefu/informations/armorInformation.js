let armorEffect = require("../effects/armorEffects");
let armorInformation = {};
armorInformation.armorList = [
    { id: 0, defence: 0, name: "インナー", effect: armorEffect.none },
    { id: 1, defence: 50, name: "旅人の服", effect: armorEffect.none },
];

module.exports = armor;