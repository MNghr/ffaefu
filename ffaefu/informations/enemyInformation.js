let enemyArtsEffect = require("../effects/enemyArtsEffect.js");
let enemyInformation = {};
enemyInformation.level1 = [
    {enemyId: "0a",name:"ブロブ",maxHP:100,attack:4, dropMoney: 1000,exp:9000, accuracy:70,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.fire},
    {enemyId: "1a",name:"ブロブ",maxHP:100,attack:4, dropMoney: 1000,exp:9000, accuracy:70,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.fire},
    {enemyId: "2a",name:"ブロブ",maxHP:100,attack:4, dropMoney: 1000,exp:9000, accuracy:70,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.fire},
    {enemyId: "3a",name:"ブロブ",maxHP:100,attack:4, dropMoney: 1000,exp:9000, accuracy:70,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.fire}
];
enemyInformation.level2 = [
    { enemyId: "0b", name: "アカブロブ", maxHP: 100, attack: 4, dropMoney: 1000, exp: 9000, accuracy: 70, artsActivation: 40, evasive: 50, artsEffect: enemyArtsEffect.fire },
    { enemyId: "1b", name: "ケルベロ", maxHP: 100, attack: 4, dropMoney: 1000, exp: 9000, accuracy: 70, artsActivation: 40, evasive: 50, artsEffect: enemyArtsEffect.fire },
    { enemyId: "2b", name: "アオブロブ", maxHP: 100, attack: 4, dropMoney: 1000, exp: 9000, accuracy: 70, artsActivation: 40, evasive: 50, artsEffect: enemyArtsEffect.blizzard },
    { enemyId: "3b", name: "マジックマッシュルーム", maxHP: 100, attack: 4, dropMoney: 1000, exp: 9000, accuracy: 25, artsActivation: 40, evasive: 9, artsEffect: enemyArtsEffect.thunder },
    { enemyId: "4b", name: "キブロブ", maxHP: 100, attack: 4, dropMoney: 1000, exp: 9000, accuracy: 70, artsActivation: 40, evasive: 9, artsEffect: enemyArtsEffect.thunder },
    { enemyId: "5b", name: "メタルブロブ", maxHP: 100, attack: 4, dropMoney: 1000, exp: 9000, accuracy: 70, artsActivation: 40, evasive: 9999, artsEffect: enemyArtsEffect.thunder },
    { enemyId: "6b", name: "キブロブ", maxHP: 100, attack: 4, dropMoney: 1000, exp: 9000, accuracy: 70, artsActivation: 40, evasive: 9999, artsEffect: enemyArtsEffect.thunder },
    { enemyId: "7b", name: "キブロブ", maxHP: 100, attack: 4, dropMoney: 1000, exp: 9000, accuracy: 70, artsActivation: 40, evasive: 9999, artsEffect: enemyArtsEffect.thunder },
    { enemyId: "8b", name: "スィンダーバルーン", maxHP: 100, attack: 4, dropMoney: 1000, exp: 9000, accuracy: 70, artsActivation: 40, evasive: 9999, artsEffect: enemyArtsEffect.thunder },
    
];

enemyInformation.level3 = [
    {enemyId: "0c",name:"テュロス",maxHP:100,attack:4, dropMoney: 1000,exp:9000, accuracy:70,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.fire},
    {enemyId: "1c",name:"ダイダロス",maxHP:100,attack:4, dropMoney: 1000,exp:9000, accuracy:70,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.fire},
    {enemyId: "2c",name:"オイディプス",maxHP:100,attack:4, dropMoney: 1000,exp:9000, accuracy:70,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.fire},
    {enemyId: "3c",name:"ころころ虫",maxHP:100,attack:4, dropMoney: 1000,exp:9000, accuracy:70,artsActivation: 40,evasive:99999999999,artsEffect: enemyArtsEffect.fire},
];

enemyInformation.level4 = [
    { enemyId: "0d",name:"ファーヴニル",maxHP:100,attack:4,dropMoney:100000000,exp:650000,accuracy:75,artsActivation: 40,erasive:50,artsEffect: enemyArtsEffect.meteor},
    { enemyId: "1d", name: "ネブ=タ=ジェセル", maxHP: 100, attack: 4, dropMoney: 1000, exp: 100000, accuracy: 75, artsActivation: 40, erasive: 50, artsEffect: enemyArtsEffect.deadlyMessage },
    { enemyId: "2d",name:"ウルトラメタキン",maxHP:100,attack:4,dropMoney:1000,exp:999999,accuracy:75,artsActivation: 40,erasive:50,artsEffect: enemyArtsEffect.deadlyMessage},
    { enemyId: "3d", name: "えふ☆☆☆", maxHP: 100000000000000, attack: 9999999999999999, dropMoney: 400000000000, exp: 2400000, accuracy: 9999999999, artsActivation: 100, erasive: 999999999, artsEffect: enemyArtsEffect.efu },
    { enemyId: "4d", name: "えふ☆☆☆", maxHP: 100000000000000, attack: 9999999999999999, dropMoney: 400000000000, exp: 2400000, accuracy: 9999999999, artsActivation: 100, erasive: 999999999, artsEffect: enemyArtsEffect.efu},
    { enemyId: "5d", name: "帰ってきた刃の翼", maxHP: 100, attack: 4, dropMoney: 1000, exp: 100000, accuracy: 75, artsActivation: 40, erasive: 50, artsEffect: enemyArtsEffect.deadlyMessage },
    { enemyId: "6d",name: "ウルトラキング", maxHP:1000013,attack:999999,dropMoney:1000,exp:100000,accuracy:275,artsActivation: 40,erasive:999999,artsEffect: enemyArtsEffect.deadlyMessage }
];

module.exports = enemyInformation