let weaponEffect = require("../effects/weaponEffect.js");
let weaponInformation = {};
weaponInformation.weaponList = [
    { id: 0, attack: 0, name: "徒手空拳", value: 0, effect: weaponEffect.none },
    { id: 1, attack: 50, name: "棒切れ", value: 10000, effect: weaponEffect.none },
    { id: 2, attack: 100, name: "銅の剣", value: 100000, effect: weaponEffect.none },
    { id: 3, attack: 1000, name: "ローグソード", value: 1000000, effect: weaponEffect.none },
    { id: 4, attack: 7200, name: "鋼の剣", value: 10000000, effect: weaponEffect.none }
];

module.exports = weaponInformation;