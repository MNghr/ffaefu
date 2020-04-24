let enemyArtsEffect = require("../effects/enemyArtsEffect.js");
let enemyInformation = {};
enemyInformation.vsMonster = [];
enemyInformation.vsMonster[0] = [
    {enemyId: "0a",name:"ブロブ",maxHP:100,attack:4, dropMoney: 1000,exp:9000, accuracy:70,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.none},
    {enemyId: "1a",name:"メタルブロブ",maxHP:100,attack:4, dropMoney: 1000,exp:9000, accuracy:70,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.none},
    {enemyId: "2a",name:"淫邪トットリくん",maxHP:100,attack:4, dropMoney: 1000,exp:9000, accuracy:70,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.none},
    {enemyId: "3a",name:"ドバえもん",maxHP:100,attack:4, dropMoney: 1000,exp:9000, accuracy:70,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.none},
    {enemyId: "4a",name:"きんじょのおっちゃん",maxHP:100,attack:4, dropMoney: 1000,exp:9000, accuracy:70,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.none},
    {enemyId: "5a",name: "ヘルハウンド", maxHP: 100, attack: 4, dropMoney: 1000, exp: 9000, accuracy: 70, artsActivation: 40, evasive: 50, artsEffect: enemyArtsEffect.none },
    {enemyId: "6a",name:"でかいミミズ",maxHP:100,attack:4, dropMoney: 1000,exp:9000, accuracy:70,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.none},
    {enemyId: "7a",name:"でかいネズミ",maxHP:100,attack:4, dropMoney: 1000,exp:9000, accuracy:70,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.none},
    {enemyId: "8a",name:"でかいネクタイ",maxHP:100,attack:4, dropMoney: 1000,exp:9000, accuracy:70,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.none},
    {enemyId: "9a",name:"ダークこうもり",maxHP:100,attack:4, dropMoney: 1000,exp:9000, accuracy:70,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.none},
    {enemyId: "10a",name: "ブロブベス", maxHP: 100, attack: 4, dropMoney: 1000, exp: 9000, accuracy: 70, artsActivation: 40, evasive: 50, artsEffect: enemyArtsEffect.none },
    {enemyId: "11a",name:"つまようじマン",maxHP:100,attack:4, dropMoney: 1000,exp:9000, accuracy:70,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.none},
    {enemyId: "12a",name:"夜露死苦男",maxHP:100,attack:4, dropMoney: 1000,exp:9000, accuracy:70,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.none},
    {enemyId: "13a",name:"Gあん",maxHP:100,attack:4, dropMoney: 1000,exp:9000, accuracy:70,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.none},
    {enemyId: "14a",name:"あくまつき",maxHP:100,attack:4, dropMoney: 1000,exp:9000, accuracy:70,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.none},
    {enemyId: "15a",name: "シャッキー・ツェン", maxHP: 100, attack: 4, dropMoney: 1000, exp: 9000, accuracy: 70, artsActivation: 40, evasive: 50, artsEffect: enemyArtsEffect.none },
    {enemyId: "16a",name:"ホーチョーマン",maxHP:100,attack:4, dropMoney: 1000,exp:9000, accuracy:70,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.none},
    {enemyId: "17a",name:"コッコロ大魔王",maxHP:100,attack:4, dropMoney: 1000,exp:9000, accuracy:70,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.none},
    {enemyId: "18a",name:"コジュニア",maxHP:100,attack:4, dropMoney: 1000,exp:9000, accuracy:70,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.none},
    {enemyId: "19a",name:"伸びたくん",maxHP:100,attack:4, dropMoney: 1000,exp:9000, accuracy:70,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.none},
    {enemyId: "20a", name: "クソザコピエロ", maxHP: 100, attack: 4, dropMoney: 1000, exp: 9000, accuracy: 70, artsActivation: 40, evasive: 50, artsEffect: enemyArtsEffect.none },
    {enemyId: "21a",name:"チビ神キングゥ",maxHP:100,attack:4, dropMoney: 1000,exp:9000, accuracy:70,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.none},
    {enemyId: "22a",name:"ブラストマン",maxHP:100,attack:4, dropMoney: 1000,exp:9000, accuracy:70,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.none},
    {enemyId: "23a",name:"ありがとウサギ",maxHP:100,attack:4, dropMoney: 1000,exp:9000, accuracy:70,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.none},
    {enemyId: "24a",name:"こんばんワニ",maxHP:100,attack:4, dropMoney: 1000,exp:9000, accuracy:70,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.none},
    {enemyId: "25a",name: "さよなライオン", maxHP: 100, attack: 4, dropMoney: 1000, exp: 9000, accuracy: 70, artsActivation: 40, evasive: 50, artsEffect: enemyArtsEffect.desion },
    {enemyId: "26a",name:"かみ",maxHP:100,attack:4, dropMoney: 1000,exp:9000, accuracy:70,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.none},
    {enemyId: "27a",name:"汚職した政治家",maxHP:100,attack:4, dropMoney: 1000,exp:9000, accuracy:70,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.none},
    {enemyId: "28a",name:"Gこつせんし",maxHP:100,attack:4, dropMoney: 1000,exp:9000, accuracy:70,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.none},
    {enemyId: "29a", name: "メタルブロブキング", maxHP: 10011, attack: 145, dropMoney: 1000, exp: 9000, accuracy: 70, artsActivation: 40, evasive: 50, artsEffect: enemyArtsEffect.none },
    {enemyId: "30a", name: "えふ", maxHP: 10000000000000, attack: 100000000000000, dropMoney: 10000000000, exp: 700000, accuracy: 70, artsActivation: 100, evasive: 50, artsEffect: enemyArtsEffect.efu },
    {enemyId: "31a",name:"ごちそうさマウス",maxHP:100,attack:4, dropMoney: 1000,exp:9000, accuracy:70,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.none},
    {enemyId: "32a",name:"いってきまスカンク",maxHP:100,attack:4, dropMoney: 1000,exp:9000, accuracy:70,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.none},
    {enemyId: "33a",name:"ただいマンボウ",maxHP:100,attack:4, dropMoney: 1000,exp:9000, accuracy:70,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.none},
    {enemyId: "34a",name:"おはよウナギ",maxHP:100,attack:4, dropMoney: 1000,exp:9000, accuracy:70,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.none},
    {enemyId: "35a",name: "おやすみなサイ", maxHP: 100, attack: 4, dropMoney: 1000, exp: 9000, accuracy: 70, artsActivation: 40, evasive: 50, artsEffect: enemyArtsEffect.none },
    {enemyId: "36a",name:"完全変態ハゲオヤジ",maxHP:100,attack:4, dropMoney: 1000,exp:9000, accuracy:70,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.none},
    {enemyId: "37a",name:"ケツアゴ",maxHP:100,attack:4, dropMoney: 1000,exp:9000, accuracy:70,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.none},
    {enemyId: "38a",name:"でんぎあらすG3",maxHP:100,attack:4, dropMoney: 1000,exp:9000, accuracy:70,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.none},
    {enemyId: "39a", name: "ケンカ売るならF〇ckOFF", maxHP: 10011, attack: 145, dropMoney: 1000, exp: 9000, accuracy: 70, artsActivation: 40, evasive: 50, artsEffect: enemyArtsEffect.none },
];
enemyInformation.vsMonster[1] = [
    { enemyId: "0b", name: "アカブロブ", maxHP: 100, attack: 4, dropMoney: 1000, exp: 9000, accuracy: 70, artsActivation: 40, evasive: 50, artsEffect: enemyArtsEffect.fire },
    { enemyId: "1b", name: "ケルベロ", maxHP: 100, attack: 4, dropMoney: 1000, exp: 9000, accuracy: 70, artsActivation: 40, evasive: 50, artsEffect: enemyArtsEffect.fire },
    { enemyId: "2b", name: "アオブロブ", maxHP: 100, attack: 4, dropMoney: 1000, exp: 9000, accuracy: 70, artsActivation: 40, evasive: 50, artsEffect: enemyArtsEffect.blizzard },
    { enemyId: "3b", name: "マジックマッシュルーム", maxHP: 100, attack: 4, dropMoney: 1000, exp: 9000, accuracy: 25, artsActivation: 40, evasive: 9, artsEffect: enemyArtsEffect.thunder },
    { enemyId: "4b", name: "キブロブ", maxHP: 100, attack: 4, dropMoney: 1000, exp: 9000, accuracy: 70, artsActivation: 40, evasive: 9, artsEffect: enemyArtsEffect.thunder },
    { enemyId: "5b", name: "ヘビーメタルブロブ", maxHP: 100, attack: 4, dropMoney: 1000, exp: 9000, accuracy: 70, artsActivation: 40, evasive: 9999, artsEffect: enemyArtsEffect.thunder },
    { enemyId: "6b", name: "キブロブ", maxHP: 100, attack: 4, dropMoney: 1000, exp: 9000, accuracy: 70, artsActivation: 40, evasive: 9999, artsEffect: enemyArtsEffect.thunder },
    { enemyId: "7b", name: "キブロブ", maxHP: 100, attack: 4, dropMoney: 1000, exp: 9000, accuracy: 70, artsActivation: 40, evasive: 9999, artsEffect: enemyArtsEffect.thunder },
    { enemyId: "8b", name: "スィンダーバルーン", maxHP: 100, attack: 4, dropMoney: 1000, exp: 9000, accuracy: 70, artsActivation: 40, evasive: 9999, artsEffect: enemyArtsEffect.thunder },
    { enemyId: "9b", name: "ブラストマンEX", maxHP: 100, attack: 4, dropMoney: 1000, exp: 9000, accuracy: 70, artsActivation: 40, evasive: 9999, artsEffect: enemyArtsEffect.thunder },
    {enemyId: "10b", name: "えふ☆", maxHP: 10000000000000, attack: 100000000000000, dropMoney: 10000000000, exp: 700000, accuracy: 70, artsActivation: 100, evasive: 50, artsEffect: enemyArtsEffect.efu },
    
];

enemyInformation.vsMonster[2] = [
    {enemyId: "0c",name:"テュロス",maxHP:100,attack:4, dropMoney: 1000,exp:9000, accuracy:70,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.fire},
    {enemyId: "1c",name:"ダイダロス",maxHP:100,attack:4, dropMoney: 1000,exp:9000, accuracy:70,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.fire},
    {enemyId: "2c",name:"オイディプス",maxHP:100,attack:4, dropMoney: 1000,exp:9000, accuracy:70,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.fire},
    {enemyId: "3c", name: "ころころ虫", maxHP: 100, attack: 4, dropMoney: 1000, exp: 9000, accuracy: 70, artsActivation: 40, evasive: 99999999999, artsEffect: enemyArtsEffect.fire },
    { enemyId: "4c", name: "タルタロス", maxHP: 100, attack: 4, dropMoney: 1000, exp: 9000, accuracy: 70, artsActivation: 40, evasive: 99999999999, artsEffect: enemyArtsEffect.fire },
    {enemyId: "30a", name: "えふ☆☆", maxHP: 10000000000000, attack: 100000000000000, dropMoney: 10000000000, exp: 700000, accuracy: 70, artsActivation: 100, evasive: 50, artsEffect: enemyArtsEffect.efu },
];

enemyInformation.vsMonster[3] = [
    { enemyId: "0d",name:"ファーヴニル",maxHP:100,attack:4,dropMoney:100000000,exp:650000,accuracy:75,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.meteor},
    { enemyId: "1d", name: "ネブ=タ=ジェセル", maxHP: 100, attack: 4, dropMoney: 1000, exp: 100000, accuracy: 75, artsActivation: 40, evasive: 50, artsEffect: enemyArtsEffect.deadlyMessage },
    { enemyId: "2d",name:"ウルトラメタキン",maxHP:100,attack:4,dropMoney:1000,exp:999999,accuracy:75,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.deadlyMessage},
    { enemyId: "3d", name: "えふ☆☆☆", maxHP: 100000000000000, attack: 9999999999999999, dropMoney: 400000000000, exp: 2400000, accuracy: 9999999999, artsActivation: 100, evasive: 999999999, artsEffect: enemyArtsEffect.efu },
    { enemyId: "4d", name: "えふ☆☆☆☆", maxHP: 1000000000000000, attack: 99999999999999999, dropMoney: 600000000000, exp: 4800000, accuracy: 9999999999, artsActivation: 100, evasive: 999999999, artsEffect: enemyArtsEffect.efu},
    { enemyId: "5d", name: "帰ってきた刃の翼", maxHP: 100, attack: 4, dropMoney: 1000, exp: 100000, accuracy: 75, artsActivation: 40, evasive: 50, artsEffect: enemyArtsEffect.deadlyMessage },
    { enemyId: "6d",name: "ウルトラキング", maxHP:1000013,attack:999999,dropMoney:1000,exp:100000,accuracy:275,artsActivation: 40,evasive:999999,artsEffect: enemyArtsEffect.deadlyMessage }
];

enemyInformation.legendPlace = [];
enemyInformation.legendPlace[0] = [
    { enemyId: "0l1",name:"メカブロブ",maxHP:100,attack:4,dropMoney:100000000,exp:650000,accuracy:75,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.none},
    { enemyId: "1l1", name: "ラージバルーン", maxHP: 100, attack: 4, dropMoney: 1000, exp: 100000, accuracy: 75, artsActivation: 40, evasive: 50, artsEffect: enemyArtsEffect.none },
    { enemyId: "2l1",name: "ラージハツカネズミ",maxHP:100,attack:4,dropMoney:1000,exp:999999,accuracy:75,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.none},
    { enemyId: "3l1", name: "アンティ", maxHP: 1000, attack: 9, dropMoney: 400000000000, exp: 2400000, accuracy: 9999999999, artsActivation: 100, evasive: 999999999, artsEffect: enemyArtsEffect.none },
    { enemyId: "4l1", name: "スノーナイト", maxHP: 100, attack: 9, dropMoney: 400000000000, exp: 2400000, accuracy: 9999999999, artsActivation: 100, evasive: 999999999, artsEffect: enemyArtsEffect.none},
    { enemyId: "5l1", name: "ボックスライム", maxHP: 100, attack: 4, dropMoney: 1000, exp: 100000, accuracy: 75, artsActivation: 40, evasive: 50, artsEffect: enemyArtsEffect.blizzard },
    { enemyId: "6l1", name: "チビゴーレム", maxHP: 113, attack: 9, dropMoney: 1000, exp: 100000, accuracy: 275, artsActivation: 40, evasive: 999999, artsEffect: enemyArtsEffect.none },
    { enemyId: "7l1", name: "プチベロス", maxHP: 10, attack: 99, dropMoney: 400000000000, exp: 2400000, accuracy: 9999999999, artsActivation: 100, evasive: 999999999, artsEffect: enemyArtsEffect.none},
    { enemyId: "8l1", name: "プチタイガー", maxHP: 100, attack: 4, dropMoney: 1000, exp: 100000, accuracy: 75, artsActivation: 40, evasive: 50, artsEffect: enemyArtsEffect.none },
    { enemyId: "9l1",name: "ディアブロケラトプス", maxHP:1013,attack:9,dropMoney:1000,exp:100000,accuracy:275,artsActivation: 40,evasive:999999,artsEffect: enemyArtsEffect.none }
]

enemyInformation.legendPlace[1] = [
    { enemyId: "0l2",name:"オルトロス",maxHP:100,attack:4,dropMoney:100000000,exp:650000,accuracy:75,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.meteor},
    { enemyId: "1l2", name: "氷の女王", maxHP: 100, attack: 4, dropMoney: 1000, exp: 100000, accuracy: 75, artsActivation: 40, evasive: 50, artsEffect: enemyArtsEffect.deadlyMessage },
    { enemyId: "2l2",name: "炎の女王",maxHP:100,attack:4,dropMoney:1000,exp:999999,accuracy:75,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.deadlyMessage},
    { enemyId: "3l2", name: "蔦の女王", maxHP: 100000000000000, attack: 9999999999999999, dropMoney: 400000000000, exp: 2400000, accuracy: 9999999999, artsActivation: 100, evasive: 999999999, artsEffect: enemyArtsEffect.efu },
    { enemyId: "4l2", name: "グレートありがとウサギ", maxHP: 100000000000000, attack: 9999999999999999, dropMoney: 400000000000, exp: 2400000, accuracy: 9999999999, artsActivation: 100, evasive: 999999999, artsEffect: enemyArtsEffect.efu},
    { enemyId: "5l2", name: "エルダー・恐竜", maxHP: 100, attack: 4, dropMoney: 1000, exp: 100000, accuracy: 75, artsActivation: 40, evasive: 50, artsEffect: enemyArtsEffect.deadlyMessage },
    { enemyId: "6l2", name: "エルダー・ドラゴン", maxHP: 1000013, attack: 999999, dropMoney: 1000, exp: 100000, accuracy: 275, artsActivation: 40, evasive: 999999, artsEffect: enemyArtsEffect.deadlyMessage },
    { enemyId: "7l2", name: "フェニックス", maxHP: 100000000000000, attack: 9999999999999999, dropMoney: 400000000000, exp: 2400000, accuracy: 9999999999, artsActivation: 100, evasive: 999999999, artsEffect: enemyArtsEffect.efu},
    { enemyId: "8l2", name: "ケルベロス", maxHP: 100, attack: 4, dropMoney: 1000, exp: 100000, accuracy: 75, artsActivation: 40, evasive: 50, artsEffect: enemyArtsEffect.deadlyMessage },
    { enemyId: "9l2",name: "敵キャンディ", maxHP:1000013,attack:999999,dropMoney:1000,exp:100000,accuracy:275,artsActivation: 40,evasive:999999,artsEffect: enemyArtsEffect.deadlyMessage }
]

enemyInformation.legendPlace[2] = [
    { enemyId: "0l3",name:"アラクノフォビア",maxHP:100,attack:4,dropMoney:100000000,exp:650000,accuracy:75,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.meteor},
    { enemyId: "1l3", name: "クラウストロフォビア", maxHP: 100, attack: 4, dropMoney: 1000, exp: 100000, accuracy: 75, artsActivation: 40, evasive: 50, artsEffect: enemyArtsEffect.deadlyMessage },
    { enemyId: "2l3",name: "アクロフォビア",maxHP:100,attack:4,dropMoney:1000,exp:999999,accuracy:75,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.deadlyMessage},
    { enemyId: "3l3", name: "アクアフォビア", maxHP: 100000000000000, attack: 9999999999999999, dropMoney: 400000000000, exp: 2400000, accuracy: 9999999999, artsActivation: 100, evasive: 999999999, artsEffect: enemyArtsEffect.efu },
    { enemyId: "4l3", name: "アストラフォビア", maxHP: 100000000000000, attack: 9999999999999999, dropMoney: 400000000000, exp: 2400000, accuracy: 9999999999, artsActivation: 100, evasive: 999999999, artsEffect: enemyArtsEffect.efu},
    { enemyId: "5l3", name: "パイロフォビア", maxHP: 100, attack: 4, dropMoney: 1000, exp: 100000, accuracy: 75, artsActivation: 40, evasive: 50, artsEffect: enemyArtsEffect.deadlyMessage },
    { enemyId: "6l3", name: "モノフォビア", maxHP: 1000013, attack: 999999, dropMoney: 1000, exp: 100000, accuracy: 275, artsActivation: 40, evasive: 999999, artsEffect: enemyArtsEffect.deadlyMessage },
    { enemyId: "7l3", name: "スコトフォビア", maxHP: 100000000000000, attack: 9999999999999999, dropMoney: 400000000000, exp: 2400000, accuracy: 9999999999, artsActivation: 100, evasive: 999999999, artsEffect: enemyArtsEffect.efu},
    { enemyId: "8l3", name: "トリスカイデカフォビア", maxHP: 1313131, attack: 4, dropMoney: 13131313, exp: 131313, accuracy: 13, artsActivation: 13, evasive: 13, artsEffect: enemyArtsEffect.deadlyMessage },
    { enemyId: "9l3",name: "タナトフォビア", maxHP:1000013,attack:999999,dropMoney:1000,exp:100000,accuracy:275,artsActivation: 10,evasive:999999,artsEffect: enemyArtsEffect.deadlyMessage }
]

enemyInformation.legendPlace[3] = [
    { enemyId: "0l4",name:"ブラストマンRV",maxHP:14739274,attack:4,dropMoney:10029322,exp:650000,accuracy:75,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.none},
    { enemyId: "1l4", name: "アンドロメダ", maxHP: 247563846, attack: 4, dropMoney: 1000, exp: 100000, accuracy: 75, artsActivation: 40, evasive: 50, artsEffect: enemyArtsEffect.deadlyMessage },
    { enemyId: "2l4",name: "ラ・ムー",maxHP:301635273,attack:4,dropMoney:19289319,exp:999999,accuracy:75,artsActivation: 40,evasive:50,artsEffect: enemyArtsEffect.deadlyMessage},
    { enemyId: "3l4", name: "クリムゾンドラゴン", maxHP: 352618273, attack: 9999999999999999, dropMoney: 400000000000, exp: 2400000, accuracy: 9999999999, artsActivation: 100, evasive: 999999999, artsEffect: enemyArtsEffect.efu },
    { enemyId: "4l4", name: "グレイガ", maxHP: 493728374, attack: 9999999999999999, dropMoney: 400000000000, exp: 2400000, accuracy: 9999999999, artsActivation: 100, evasive: 999999999, artsEffect: enemyArtsEffect.efu},
    { enemyId: "5l4", name: "ファルザー", maxHP: 55382383, attack: 4, dropMoney: 1000, exp: 100000, accuracy: 75, artsActivation: 40, evasive: 50, artsEffect: enemyArtsEffect.deadlyMessage },
    { enemyId: "6l4", name: "ネビュラグレイ", maxHP: 655323832, attack: 999999, dropMoney: 1000, exp: 100000, accuracy: 275, artsActivation: 40, evasive: 999999, artsEffect: enemyArtsEffect.deadlyMessage },
    { enemyId: "7l4", name: "ブルースFZ", maxHP: 476314980, attack: 9999999999999999, dropMoney: 400000000000, exp: 2400000, accuracy: 9999999999, artsActivation: 100, evasive: 999999999, artsEffect: enemyArtsEffect.efu},
    { enemyId: "8l4", name: "フォルテGS", maxHP: 557623817, attack: 4, dropMoney: 1000, exp: 100000, accuracy: 75, artsActivation: 40, evasive: 50, artsEffect: enemyArtsEffect.deadlyMessage },
    { enemyId: "9l4", name: "セレナード", maxHP: 653827381, attack: 999999, dropMoney: 1000, exp: 100000, accuracy: 275, artsActivation: 40, evasive: 999999, artsEffect: enemyArtsEffect.deadlyMessage },
    { enemyId: "10l4", name: "ゴスペル", maxHP: 729379319, attack: 999999, dropMoney: 1000, exp: 100000, accuracy: 275, artsActivation: 40, evasive: 999999, artsEffect: enemyArtsEffect.deadlyMessage },
    { enemyId: "11l4", name: "プロト", maxHP: 838462846, attack: 999999, dropMoney: 1000, exp: 100000, accuracy: 275, artsActivation: 40, evasive: 999999, artsEffect: enemyArtsEffect.deadlyMessage },
    { enemyId: "12l4", name: "デューオ", maxHP: 851738048, attack: 999999, dropMoney: 1000, exp: 100000, accuracy: 275, artsActivation: 40, evasive: 999999, artsEffect: enemyArtsEffect.deadlyMessage },
    { enemyId: "13l4", name: "フォルテXX", maxHP: 947183829, attack: 999999, dropMoney: 1000, exp: 100000, accuracy: 275, artsActivation: 40, evasive: 999999, artsEffect: enemyArtsEffect.deadlyMessage },
    { enemyId: "14l4", name: "ロード・オブ・カオス", maxHP: 947193843, attack: 999999, dropMoney: 1000, exp: 100000, accuracy: 65, artsActivation: 40, evasive: 999999, artsEffect: enemyArtsEffect.deadlyMessage },
    { enemyId: "15l4",name: "全能神えふ", maxHP:4928372921,attack:999999,dropMoney:1000,exp:100000,accuracy:275,artsActivation: 100,evasive:999999,artsEffect: enemyArtsEffect.deadlyMessage }
]

module.exports = enemyInformation