let enemyArtsEffect = require("../effects/enemyArtsEffect.js");
enemy = {};
enemy.level1 = [
    {enemyId: "1a",name:"ブロブ",maxHP:100,attack:4, dropMoney: 1000,exp:9000, accuracy:70,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.fire},
    {},
    {}
];
enemy.level2 = [
    {},
    {},
    {}
];

enemy.level3 = [
    {},
    {},
    {}
];

enemy.level4 = [
    { enemyId: "1d",name:"ネブ=タ=ジェセル",maxHP:100,attack:4,dropMoney:1000,exp:100000,accuracy:75,artsActivation: 40,erasive:50,artsEffect: enemyArtsEffect.deadlyMessage},
    { enemyId: "2d",name:"ウルトラメタキン",maxHP:100,attack:4,dropMoney:1000,exp:999999,accuracy:75,artsActivation: 40,erasive:50,artsEffect: enemyArtsEffect.deadlyMessage},
    { enemyId: "3d", name: "えふ☆☆☆", maxHP: 100000000000000, attack: 9999999999999999, dropMoney: 400000000000, exp: 2400000, accuracy: 9999999999, artsActivation: 100, erasive: 999999999, artsEffect: enemyArtsEffect.efu },
    { enemyId: "4d", name: "えふ☆☆☆", maxHP: 100000000000000, attack: 9999999999999999, dropMoney: 400000000000, exp: 2400000, accuracy: 9999999999, artsActivation: 100, erasive: 999999999, artsEffect: enemyArtsEffect.efu},
    { enemyId: "5d", name: "帰ってきた刃の翼", maxHP: 100, attack: 4, dropMoney: 1000, exp: 100000, accuracy: 75, artsActivation: 40, erasive: 50, artsEffect: enemyArtsEffect.deadlyMessage },
    { enemyId: "6d",name: "ウルトラキング", maxHP:1000013,attack:999999,dropMoney:1000,exp:100000,accuracy:275,artsActivation: 40,erasive:999999,artsEffect: enemyArtsEffect.deadlyMessage }
];
