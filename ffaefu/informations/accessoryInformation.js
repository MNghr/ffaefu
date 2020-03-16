let accessoryEffect = require("../effects/accessoryEffect.js");
let accessoryInformation = {};
accessoryInformation.accessoryList = [
    { id: 0,  name: "なし", value: 0, effect: accessoryEffect.none },
    { id: 1,  name: "パワーボーナス", value: 10000, effect: accessoryEffect.none },
    { id: 2,  name: "破壊の地下足袋", value: 100000, effect: accessoryEffect.none },
    { id: 3,  name: "はやぶさリング", value: 500000, effect: accessoryEffect.none },
    { id: 4,  name: "バーサクリング", value: 1000000, effect: accessoryEffect.none },
];

module.exports = accessoryInformation;