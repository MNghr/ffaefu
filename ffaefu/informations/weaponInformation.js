let weaponEffect = require("../effects/weaponEffect.js");
let weaponInformation = {};
weaponInformation.weaponList = [
    { id: 0, attack: 0, name: "徒手空拳", value: 0, effect: weaponEffect.none },
    { id: 1, attack: 50, name: "棒切れ", value: 10000, effect: weaponEffect.none },
    { id: 2, attack: 100, name: "銅の剣", value: 100000, effect: weaponEffect.none },
    { id: 3, attack: 1000, name: "ローグソード", value: 1000000, effect: weaponEffect.none },
    { id: 4, attack: 9900, name: "バスタードソード", value: 10000000, effect: weaponEffect.none },
    { id: 5, attack: 50, name: "木の杖", value: 10000, effect: weaponEffect.none },
    { id: 6, attack: 1000, name: "応力の杖", value: 100000, effect: weaponEffect.none },
    { id: 7, attack: 5000, name: "毒針", value: 1000000, effect: weaponEffect.none },
    { id: 8, attack: 9600, name: "アイアンロッド", value: 10000000, effect: weaponEffect.none },
    { id: 9, attack: 20, name: "くたびれた本", value: 10000, effect: weaponEffect.none },
    { id: 10, attack: 2500, name: "釘バット", value: 100000, effect: weaponEffect.none },
    { id: 11, attack: 5000, name: "メイス", value: 1000000, effect: weaponEffect.none },
    { id: 12, attack: 7200, name: "ゾンビキラー", value: 10000000, effect: weaponEffect.none },
    { id: 13, attack: 20, name: "錆びたナイフ", value: 10000, effect: weaponEffect.none },
    { id: 14, attack: 500, name: "ブロンズナイフ", value: 100000, effect: weaponEffect.none },
    { id: 15, attack: 5000, name: "シミター", value: 1000000, effect: weaponEffect.none },
    { id: 16, attack: 9000, name: "グラディウス", value: 10000000, effect: weaponEffect.none }
];

module.exports = weaponInformation;