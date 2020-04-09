let accessoryEffect = require("../effects/accessoryEffect.js");
let accessoryInformation = {};
accessoryInformation.accessoryList = [
    { id: 0,  name: "なし", value: 0, effect: accessoryEffect.none,invocationRate:999999},
    { id: 1,  name: "パワーボーナス", value: 10000, effect: accessoryEffect.none,invocationRate:999999 },
    { id: 2,  name: "破壊の地下足袋", value: 100000, effect: accessoryEffect.none,invocationRate:999999  },
    { id: 3,  name: "はやぶさリング", value: 500000, effect: accessoryEffect.none ,invocationRate:999999 },
    { id: 4, name: "バーサクリング", value: 1000000, effect: accessoryEffect.none, invocationRate: 999999 },
    { id: 5, name: "魔人の指輪", value: 1000000, effect: accessoryEffect.majinRing, invocationRate: 999999 },
    { id: 6,  name: "オーラの結晶", value: 1000000, effect: accessoryEffect.aura ,invocationRate:999999 },
];

module.exports = accessoryInformation;