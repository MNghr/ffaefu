let armorEffect = require("../effects/armorEffect.js");
let armorInformation = {};
armorInformation.armorList = [
    { id: 0, defence: 0, name: "インナー", value: 0, effect: armorEffect.none },
    { id: 1, defence: 50, name: "革の鎧", value: 10000, effect: armorEffect.none },
    { id: 2, defence: 100, name: "チェーンメイル", value: 100000, effect: armorEffect.none },
    { id: 3, defence: 500, name: "バトルアーマー", value: 500000, effect: armorEffect.none },
    { id: 4, defence: 1000, name: "戦士の鎧", value: 1000000, effect: armorEffect.none }
];

module.exports = armorInformation;