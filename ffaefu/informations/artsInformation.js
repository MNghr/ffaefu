//戦術一覧
let artsInformation = {};
let artsEffect = require("../effects/artsEffect.js");
artsInformation.artsList = [
    { id: 0, name: "普通に戦う", effect:  artsEffect.none , explain: "普通に戦います．特にメリットはありません．", invocationRate: 999999},
    { id: 1, name: "カットワンウェイ", effect: artsEffect.cutOneWay , explain: "敵に威力中の物理攻撃を仕掛けます．発動率中", invocationRate: 75},
    { id: 2, name: "連続斬り", effect: artsEffect.furyCutter, explain: "敵に威力小の物理攻撃を1~8回仕掛けます．発動率低" , invocationRate: 40},
    { id: 3, name: "ファイアブラスト", effect:  artsEffect.fireBlast , explain: "敵に威力中の魔法攻撃を仕掛けます．発動率中", invocationRate: 75},
    { id: 4, name: "リュウセイグン", effect: artsEffect.meteor , explain: "威力小の魔法攻撃を1~16回仕掛けます．発動率低", invocationRate: 40},
    { id: 5, name: "リカバリー", effect: artsEffect.recover, explain: "威力中の魔法回復を自分に仕掛けます．発動率中" , invocationRate: 75},
    { id: 6, name: "防御円", effect: artsEffect.circleOfProtection, explain: "敵から受けるダメージを1/10にします．発動率高" , invocationRate: 90},
    { id: 7, name: "浄化", effect: artsEffect.cleansing, explain: "敵に威力大の魔法攻撃を仕掛けます．相手の回避率を無視します．発動率やや低" , invocationRate: 60},
    { id: 8, name: "お金を盗む", effect: artsEffect.stealMoney, explain: "敵からお金を盗みます．発動率低" , invocationRate: 50},
    { id: 9, name: "だましうち", effect: artsEffect.crossSlash, explain: "敵から受けるダメージを0にし，自分の攻撃を必中にします．発動率中" , invocationRate: 75},
    { id: 10, name: "ソウルスティール", effect: artsEffect.crossSlash, explain: "敵の体力を盗み取ります．発動率低", invocationRate: 10 },
    { id: 11, name: "ワムプス", effect: artsEffect.crossSlash, explain: "地面をぬかるませ，敵の動きを止めます．発動率高", invocationRate: 10 },
    { id: 12, name: "台地錬成", effect: artsEffect.crossSlash, explain: "地面を隆起させ，自分の回避率を上げます．発動率高", invocationRate: 10 },
    { id: 13, name: "トップウ", effect: artsEffect.crossSlash, explain: "敵に威力小の魔法攻撃を仕掛けます．発動率高", invocationRate: 10 },
    { id: 14, name: "ゲイルホーン", effect: artsEffect.crossSlash, explain: "敵に威力中の魔法攻撃を1~4回仕掛けます．発動以降，敵の防具の防御力を無効にします．発動率低", invocationRate: 10 },
    { id: 15, name: "追い風", effect: artsEffect.crossSlash, explain: "敵の攻撃を無効にします．発動率低", invocationRate: 10 },
    { id: 16, name: "トップウ", effect: artsEffect.crossSlash, explain: "敵に威力小の魔法攻撃を仕掛けます．発動率高", invocationRate: 10 },
    { id: 17, name: "ゲイルホーン", effect: artsEffect.crossSlash, explain: "敵に威力中の魔法攻撃を1~4回仕掛けます．発動以降，敵の防具の防御力を無効にします．発動率低", invocationRate: 10 },
    { id: 18, name: "追い風", effect: artsEffect.crossSlash, explain: "敵の攻撃を無効にします．発動率低" , invocationRate: 10},
];

module.exports = artsInformation;