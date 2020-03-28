//戦術一覧
let artsInformation = {};
let artsEffect = require("../effects/artsEffect.js");
artsInformation.artsList = [
    { id: 0, name: "普通に戦う", effect:  artsEffect.none},
    { id: 1, name: "凶斬り", effect: artsEffect.crossSlash },
    { id: 2, name: "連続斬り" , effect: artsEffect.crossSlash },
];