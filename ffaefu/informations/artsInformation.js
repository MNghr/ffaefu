//戦術一覧
let artsInformation = {};
let artsEffect = require("../effects/artsEffect.js");
artsInformation.artsList = [
    { id: 0, name: "普通に戦う", effect:  artsEffect.none , explain: "普通に戦います．特にメリットはありません．"},
    { id: 1, name: "凶斬り", effect: artsEffect.crossSlash , explain: "敵に威力中の物理攻撃を仕掛けます．発動率中"},
    { id: 2, name: "連続斬り", effect: artsEffect.crossSlash, explain: "敵に威力小の物理攻撃を1~8回仕掛けます．発動率低" },
    { id: 3, name: "パイロブラスト", effect:  artsEffect.none , explain: "敵に威力中の魔法攻撃を仕掛けます．発動率中"},
    { id: 4, name: "メテオ", effect: artsEffect.crossSlash , explain: "威力小の魔法攻撃を1~16回仕掛けます．発動率低"},
    { id: 5, name: "リカバリー", effect: artsEffect.crossSlash, explain: "威力中の魔法回復を自分に仕掛けます．発動率中" },
    { id: 6, name: "防御円", effect: artsEffect.crossSlash, explain: "敵から受けるダメージを1/10にします．発動率高" },
    { id: 7, name: "浄化", effect: artsEffect.crossSlash, explain: "敵に威力大の魔法攻撃を仕掛けます．発動率やや低" },
    { id: 8, name: "お金を盗む", effect: artsEffect.crossSlash, explain: "敵からお金を盗みます．発動率低" },
    { id: 9, name: "だましうち", effect: artsEffect.crossSlash, explain: "敵から受けるダメージを0にし，自分の攻撃を必中にします．発動率中" },
    { id: 10, name: "浄化", effect: artsEffect.crossSlash, explain: "敵に威力大の魔法攻撃を仕掛けます．発動率やや低" },
];

module.exports = artsInformation;