//戦術一覧
let artsInformation = {};
let artsEffect = require("../effects/artsEffect.js");
artsInformation.artsList = [
    { id: 0, name: "普通に戦う", effect:  artsEffect.none , explain: "普通に戦います．特にメリットはありません．"},
    { id: 1, name: "凶斬り", effect: artsEffect.crossSlash , explain: "敵に中威力の攻撃を仕掛けます．発動率中"},
    { id: 2, name: "連続斬り", effect: artsEffect.crossSlash , explain: "敵に威力小の攻撃を1~8回仕掛けます．発動率低"},
];

module.exports = artsInformation;