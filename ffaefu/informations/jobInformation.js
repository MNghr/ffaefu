let jobInformation = {};
//職業情報 

//各職業の攻撃力計算


//各種能力の成長率，要求される各種能力値，x屋に並ぶx(x \in {"武器","防具","装飾品"})，転職することで使えるようになるスキル，マスターすることで使えるようになるスキル，要求される職歴(これらをマスターしていないと転職できない)を記述．
jobInformation.jobList = [
    { id: 0, name: "戦士", powerGrowth: 4, manaGrowth: 1, religionGrowth: 1, vitalityGrowth: 4, agilityGrowth: 2, dexterityGrowth: 2, charmGrowth: 1, karmaGrowth: 4, powerRequired: 0, manaRequired: 0, religionRequired: 0, vitalityRequired: 0, agilityRequired: 0, dexterityRequired: 0, charmRequired: 0, karmaRequired: 0, weapon: [1, 2, 3, 4], armor: [1, 2, 3, 4], accessory: [1, 2, 3, 4], basicArts: [1], masterArts: [2], jobsRequired: []},
    { id: 1, name: "魔法使い", powerGrowth: 1, manaGrowth: 16, religionGrowth: 1, vitalityGrowth: 1, agilityGrowth: 1, dexterityGrowth: 1, charmGrowth: 1, karmaGrowth: 1, powerRequired: 0, manaRequired: 0, religionRequired: 0, vitalityRequired: 0, agilityRequired: 0, dexterityRequired: 0, charmRequired: 0, karmaRequired: 0, weapon: [5, 6, 7, 8], armor: [1, 2, 3, 4], accessory: [1, 2, 3, 4], basicArts: [3], masterArts: [4], jobsRequired: []},
    { id: 2, name: "僧侶", powerGrowth: 1, manaGrowth: 2, religionGrowth: 4, vitalityGrowth: 2, agilityGrowth: 1, dexterityGrowth: 1, charmGrowth: 4, karmaGrowth: 2, powerRequired: 0, manaRequired: 0, religionRequired: 0, vitalityRequired: 0, agilityRequired: 0, dexterityRequired: 0, charmRequired: 0, karmaRequired: 0, weapon: [9, 10, 11, 12], armor: [1, 2, 3, 4], accessory: [1, 2, 3, 4], basicArts: [5, 6], masterArts: [7], jobsRequired: [] },
    { id: 3, name: "盗賊", powerGrowth: 2, manaGrowth: 1, religionGrowth: 1, vitalityGrowth: 2, agilityGrowth: 4, dexterityGrowth: 4, charmGrowth: 1, karmaGrowth: 2, powerRequired: 0, manaRequired: 0, religionRequired: 0, vitalityRequired: 0, agilityRequired: 0, dexterityRequired: 0, charmRequired: 0, karmaRequired: 0, weapon: [13, 14, 15,16 ], armor: [1, 2, 3, 4], accessory: [1, 2, 3, 4], basicArts: [8, 9], masterArts: [10], jobsRequired: [] },
    { id: 4, name: "地術師", powerGrowth: 2, manaGrowth: 8, religionGrowth: 4, vitalityGrowth: 2, agilityGrowth: 4, dexterityGrowth: 4, charmGrowth: 4, karmaGrowth: 1, powerRequired: 35, manaRequired: 35, religionRequired: 30, vitalityRequired: 50, agilityRequired: 50, dexterityRequired: 35, charmRequired: 35, karmaRequired: 25, weapon: [17, 18, 19, 20], armor: [1, 2, 3, 4], accessory: [1, 2, 3, 4], basicArts: [11, 12], masterArts: [], jobsRequired: [] },
    { id: 5, name: "嵐導士", powerGrowth: 2, manaGrowth: 8, religionGrowth: 8, vitalityGrowth: 2, agilityGrowth: 2, dexterityGrowth: 2, charmGrowth: 2, karmaGrowth: 1, powerRequired: 0, manaRequired: 50, religionRequired: 0, vitalityRequired: 0, agilityRequired: 35, dexterityRequired: 0, charmRequired: 0, karmaRequired: 25, weapon: [21, 22, 23, 24], armor: [1, 2, 3, 4], accessory: [1, 2, 3, 4], basicArts: [13, 14], masterArts: [15], jobsRequired: [1] },
    { id: 6, name: "詩人", powerGrowth: 4, manaGrowth: 4, religionGrowth: 4, vitalityGrowth: 4, agilityGrowth: 4, dexterityGrowth: 4, charmGrowth: 8, karmaGrowth: 2, powerRequired: 0, manaRequired: 35, religionRequired: 0, vitalityRequired: 0, agilityRequired: 35, dexterityRequired: 35, charmRequired: 35, karmaRequired: 25, weapon: [25, 26, 27, 28], armor: [1, 2, 3, 4], accessory: [1, 2, 3, 4], basicArts: [16, 17], masterArts: [18], jobsRequired: [] },
    { id: 7, name: "ほら吹き", powerGrowth: 8, manaGrowth: 8, religionGrowth: 8, vitalityGrowth: 8, agilityGrowth: 8, dexterityGrowth: 8, charmGrowth: 8, karmaGrowth: 64, powerRequired: 0, manaRequired: 0, religionRequired: 0, vitalityRequired: 0, agilityRequired: 50, dexterityRequired: 50, charmRequired: 50, karmaRequired: 25, weapon: [29], armor: [1, 2, 3, 4], accessory: [1, 2, 3, 4], basicArts: [], masterArts: [19], jobsRequired: [0, 1, 2, 3]},
    { id: 8, name: "召喚士", powerGrowth: 1, manaGrowth: 16, religionGrowth: 16, vitalityGrowth: 1, agilityGrowth: 1, dexterityGrowth: 1, charmGrowth: 4, karmaGrowth: 1, powerRequired: 35, manaRequired: 70, religionRequired: 0, vitalityRequired: 35, agilityRequired: 0, dexterityRequired: 0, charmRequired: 35, karmaRequired: 25, weapon: [30, 31, 32, 33], armor: [1, 2, 3, 4], accessory: [1, 2, 3, 4], basicArts: [20,21], masterArts: [22], jobsRequired: [1] },
    { id: 9, name: "ドラグーン", powerGrowth: 16, manaGrowth: 1, religionGrowth: 1, vitalityGrowth: 8, agilityGrowth: 8, dexterityGrowth: 8, charmGrowth: 4, karmaGrowth: 2, powerRequired: 100, manaRequired: 0, religionRequired: 75, vitalityRequired: 100, agilityRequired: 100, dexterityRequired: 150, charmRequired: 75, karmaRequired: 50, weapon: [34, 35, 36, 37], armor: [1, 2, 3, 4], accessory: [1, 2, 3, 4], basicArts: [23,24], masterArts: [25], jobsRequired: [0] },
    { id: 10, name: "僧正", powerGrowth: 1, manaGrowth: 16, religionGrowth: 16, vitalityGrowth: 1, agilityGrowth: 1, dexterityGrowth: 1, charmGrowth: 1, karmaGrowth: 16, powerRequired: 0, manaRequired: 150, religionRequired: 150, vitalityRequired: 0, agilityRequired: 0, dexterityRequired: 0, charmRequired: 150, karmaRequired: 50, weapon: [38, 39, 40, 41], armor: [1, 2, 3, 4], accessory: [1, 2, 3, 4], basicArts: [26,27], masterArts: [28], jobsRequired: [1, 2] },
    { id: 11, name: "騎士", powerGrowth: 8, manaGrowth: 4, religionGrowth: 8, vitalityGrowth: 16, agilityGrowth: 8, dexterityGrowth: 8, charmGrowth: 8, karmaGrowth: 4, powerRequired: 150, manaRequired: 125, religionRequired: 150, vitalityRequired: 150, agilityRequired: 125, dexterityRequired: 125, charmRequired: 180, karmaRequired: 75, weapon: [42, 43, 44, 45], armor: [1, 2, 3, 4], accessory: [1, 2, 3, 4], basicArts: [29,30], masterArts: [31], jobsRequired: [0, 2] },
    { id: 12, name: "侍", powerGrowth: 16, manaGrowth: 4, religionGrowth: 4, vitalityGrowth: 16, agilityGrowth: 16, dexterityGrowth: 4, charmGrowth: 4, karmaGrowth: 2, powerRequired: 180, manaRequired: 100, religionRequired: 0, vitalityRequired: 180, agilityRequired: 125, dexterityRequired: 150, charmRequired: 100, karmaRequired: 75, weapon: [46, 47, 48, 49], armor: [1, 2, 3, 4], accessory: [1, 2, 3, 4], basicArts: [32,33], masterArts: [34], jobsRequired: [0, 1] },
    { id: 13, name: "僧兵", powerGrowth: 16, manaGrowth: 1, religionGrowth: 1, vitalityGrowth: 32, agilityGrowth: 8, dexterityGrowth: 8, charmGrowth: 1, karmaGrowth: 8, powerRequired: 180, manaRequired: 75, religionRequired: 125, vitalityRequired: 0, agilityRequired: 100, dexterityRequired: 150, charmRequired: 100, karmaRequired: 75, weapon: [50, 51, 52, 53], armor: [1, 2, 3, 4], accessory: [1, 2, 3, 4], basicArts: [35,36], masterArts: [37], jobsRequired: [2] },
    { id: 14, name: "乱波", powerGrowth: 12, manaGrowth: 12, religionGrowth: 2, vitalityGrowth: 16, agilityGrowth: 12, dexterityGrowth: 12, charmGrowth: 4, karmaGrowth: 8, powerRequired: 180, manaRequired: 125, religionRequired: 100, vitalityRequired: 180, agilityRequired: 180, dexterityRequired: 200, charmRequired: 0, karmaRequired: 75, weapon: [54, 55, 56, 57], armor: [1, 2, 3, 4], accessory: [1, 2, 3, 4], basicArts: [38,39], masterArts: [40], jobsRequired: [3, 6] },
    { id: 15, name: "暗黒騎士", powerGrowth: 16, manaGrowth: 8, religionGrowth: 1, vitalityGrowth: 16, agilityGrowth: 16, dexterityGrowth: 16, charmGrowth: 8, karmaGrowth: 4, powerRequired: 350, manaRequired: 0, religionRequired: 0, vitalityRequired: 350, agilityRequired: 250, dexterityRequired: 250, charmRequired: 0, karmaRequired: 100, weapon: [58, 59, 60, 61,62], armor: [1, 2, 3, 4], accessory: [1, 2, 3, 4], basicArts: [41,42], masterArts: [43], jobsRequired: [1, 11] },
    { id: 16, name: "魔法戦士", powerGrowth: 16, manaGrowth: 16, religionGrowth: 8, vitalityGrowth: 4, agilityGrowth: 8, dexterityGrowth: 8, charmGrowth: 16, karmaGrowth: 4, powerRequired:300, manaRequired: 300, religionRequired: 0, vitalityRequired: 300, agilityRequired: 250, dexterityRequired: 250, charmRequired: 0, karmaRequired: 100, weapon: [63, 64, 65, 66,67], armor: [1, 2, 3, 4], accessory: [1, 2, 3, 4], basicArts: [44,45], masterArts: [46], jobsRequired: [5, 6] },
    { id: 17, name: "ゲリラ兵", powerGrowth: 8, manaGrowth: 8, religionGrowth: 8, vitalityGrowth: 8, agilityGrowth: 32, dexterityGrowth: 32, charmGrowth: 8, karmaGrowth: 4, powerRequired: 250, manaRequired: 350, religionRequired: 0, vitalityRequired: 250, agilityRequired: 350, dexterityRequired: 250, charmRequired: 0, karmaRequired: 100, weapon: [68, 69, 70, 71,72], armor: [1, 2, 3, 4], accessory: [1, 2, 3, 4], basicArts: [47,48], masterArts: [49], jobsRequired: [3, 4] },
    { id: 18, name: "幻獣使い", powerGrowth: 4, manaGrowth: 32, religionGrowth: 32, vitalityGrowth: 4, agilityGrowth: 8, dexterityGrowth: 8, charmGrowth: 32, karmaGrowth: 8, powerRequired: 0, manaRequired: 500, religionRequired: 500, vitalityRequired: 400, agilityRequired: 0, dexterityRequired: 0, charmRequired: 500, karmaRequired: 150, weapon: [73, 74], armor: [1, 2, 3, 4], accessory: [1, 2, 3, 4], basicArts: [50, 51], masterArts: [52], jobsRequired: [6, 7] },
    { id: 19, name: "帝", powerGrowth: 16, manaGrowth: 16, religionGrowth: 16, vitalityGrowth: 16, agilityGrowth: 16, dexterityGrowth: 16, charmGrowth: 32, karmaGrowth: 4, powerRequired: 500, manaRequired: 500, religionRequired: 500, vitalityRequired: 500, agilityRequired: 500, dexterityRequired: 500, charmRequired: 600, karmaRequired: 200, weapon: [75, 76, 77, 78], armor: [1, 2, 3, 4], accessory: [1, 2, 3, 4], basicArts: [53, 54], masterArts: [55], jobsRequired: [15, 16]},
    { id: 20, name: "パラディン", powerGrowth: 32, manaGrowth: 8, religionGrowth: 8, vitalityGrowth: 32, agilityGrowth: 32, dexterityGrowth: 32, charmGrowth: 4, karmaGrowth: 32, powerRequired: 500, manaRequired: 0, religionRequired: 0, vitalityRequired: 500, agilityRequired: 350, dexterityRequired: 350, charmRequired: 0, karmaRequired: 150, weapon: [79, 80, 81, 82], armor: [1, 2, 3, 4], accessory: [1, 2, 3, 4], basicArts: [56,57], masterArts: [58], jobsRequired: [7, 10, 13, 15] },
    { id: 21, name: "卜占士", powerGrowth: 2, manaGrowth: 32, religionGrowth: 32, vitalityGrowth: 4, agilityGrowth: 8, dexterityGrowth: 4, charmGrowth: 8, karmaGrowth: 16, powerRequired: 400, manaRequired: 450, religionRequired: 450, vitalityRequired: 400, agilityRequired: 400, dexterityRequired: 400, charmRequired: 400, karmaRequired: 150, weapon: [83, 84, 85, 86], armor: [1, 2, 3, 4], accessory: [1, 2, 3, 4], basicArts: [59,60], masterArts: [61], jobsRequired: [6,8] },
    { id: 22, name: "管理人", powerGrowth: 64, manaGrowth: 64, religionGrowth: 64, vitalityGrowth: 64, agilityGrowth: 64, dexterityGrowth: 64, charmGrowth: 64, karmaGrowth: 64, powerRequired: 70, manaRequired: 700, religionRequired: 700, vitalityRequired: 700, agilityRequired: 700, dexterityRequired: 700, charmRequired: 700, karmaRequired: 300, weapon: [87, 88, 89, 90], armor: [1, 2, 3, 4], accessory: [1, 2, 3, 4], basicArts: [62,63], masterArts: [64], jobsRequired: [18,19,20] },
    
    { id: 23, name: "オニオンソーディアン", powerGrowth: 74, manaGrowth: 64, religionGrowth: 74, vitalityGrowth: 64, agilityGrowth: 74, dexterityGrowth: 64, charmGrowth: 74, karmaGrowth: 84, powerRequired: 1700, manaRequired: 1700, religionRequired: 1700, vitalityRequired: 1700, agilityRequired: 1700, dexterityRequired: 1700, charmRequired: 1700, karmaRequired: 1700, weapon: [91,92, 93, 94], armor: [1, 2, 3, 4], accessory: [1, 2, 3, 4], basicArts: [], masterArts: [], jobsRequired: [] },
    { id: 24, name: "ヒットパーソン", powerGrowth: 34, manaGrowth: 64, religionGrowth: 64, vitalityGrowth: 124, agilityGrowth: 64, dexterityGrowth: 64, charmGrowth: 64, karmaGrowth: 64, powerRequired: 2700, manaRequired: 1700, religionRequired: 2700, vitalityRequired: 1700, agilityRequired: 2700, dexterityRequired: 1700, charmRequired: 700, karmaRequired: 300, weapon: [95,96] , armor: [1, 2, 3, 4], accessory: [1, 2, 3, 4], basicArts: [65], masterArts: [66], jobsRequired: [] },
    { id: 25, name: "まものつかい", powerGrowth: 64, manaGrowth: 64, religionGrowth: 64, vitalityGrowth: 64, agilityGrowth: 64, dexterityGrowth: 64, charmGrowth: 64, karmaGrowth: 64, powerRequired: 700, manaRequired: 700, religionRequired: 700, vitalityRequired: 700, agilityRequired: 700, dexterityRequired: 700, charmRequired: 700, karmaRequired: 300, weapon: [97], armor: [1, 2, 3, 4], accessory: [1, 2, 3, 4], basicArts: [], masterArts: [], jobsRequired: [22, 24] },
    { id: 26, name: "賢者", powerGrowth: 64, manaGrowth: 64, religionGrowth: 64, vitalityGrowth: 64, agilityGrowth: 64, dexterityGrowth: 64, charmGrowth: 64, karmaGrowth: 64, powerRequired: 1700, manaRequired: 2700, religionRequired: 1700, vitalityRequired: 2700, agilityRequired: 1700, dexterityRequired: 2700, charmRequired: 1700, karmaRequired: 300, weapon: [98], armor: [1, 2, 3, 4], accessory: [1, 2, 3, 4], basicArts: [67], masterArts: [68], jobsRequired: [22, 24] },
    { id: 27, name: "武聖", powerGrowth: 64, manaGrowth: 64, religionGrowth: 64, vitalityGrowth: 64, agilityGrowth: 64, dexterityGrowth: 64, charmGrowth: 64, karmaGrowth: 64, powerRequired: 1700, manaRequired: 2700, religionRequired: 1700, vitalityRequired: 2700, agilityRequired: 1700, dexterityRequired: 2700, charmRequired: 700, karmaRequired: 400, weapon: [99], armor: [1, 2, 3, 4], accessory: [1, 2, 3, 4], basicArts: [69], masterArts: [70], jobsRequired: [22, 24] },
    { id: 28, name: "アルカニスト", powerGrowth: 64, manaGrowth: 64, religionGrowth: 64, vitalityGrowth: 64, agilityGrowth: 64, dexterityGrowth: 64, charmGrowth: 64, karmaGrowth: 64, powerRequired: 1700, manaRequired: 2700, religionRequired: 2700, vitalityRequired: 2700, agilityRequired: 2700, dexterityRequired: 2700, charmRequired: 700, karmaRequired: 400, weapon: [100], armor: [1, 2, 3, 4], accessory: [1, 2, 3, 4], basicArts: [71], masterArts: [72], jobsRequired: [25,26,27] },
    { id: 29, name: "勇者", powerGrowth: 64, manaGrowth: 64, religionGrowth: 64, vitalityGrowth: 64, agilityGrowth: 64, dexterityGrowth: 64, charmGrowth: 64, karmaGrowth: 64, powerRequired: 1700, manaRequired: 2700, religionRequired: 1700, vitalityRequired: 2700, agilityRequired: 1700, dexterityRequired: 2700, charmRequired: 1700, karmaRequired: 2700, weapon: [101], armor: [1, 2, 3, 4], accessory: [1, 2, 3, 4], basicArts: [73], masterArts: [74], jobsRequired: [28] },
    { id: 30, name: "グランドマスター", powerGrowth: 24, manaGrowth: 24, religionGrowth: 24, vitalityGrowth: 24, agilityGrowth: 24, dexterityGrowth: 24, charmGrowth: 24, karmaGrowth: 24, powerRequired: 6700, manaRequired: 6700, religionRequired: 6700, vitalityRequired: 6700, agilityRequired: 6700, dexterityRequired: 6700, charmRequired: 6700, karmaRequired: 6700, weapon: [102], armor: [1, 2, 3, 4], accessory: [1, 2, 3, 4], basicArts: [75], masterArts: [76], jobsRequired: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29] },
    //追加したい職業があったらグランドマスターに続けて記述．id:31は例
    //{ id: 31, name: "星使い", powerGrowth: 48, manaGrowth: 48, religionGrowth: 48, vitalityGrowth: 48, agilityGrowth: 48, dexterityGrowth: 48, charmGrowth: 48, karmaGrowth: 48, powerRequired: 100000, manaRequired: 100000, religionRequired: 100000, vitalityRequired: 100000, agilityRequired: 100000, dexterityRequired: 100000, charmRequired: 100000, karmaRequired: 100000, weapon: [1, 2, 3, 4], armor: [1, 2, 3, 4], accessory: [1, 2, 3, 4], basicArts: [3], masterArts: [4], jobsRequired: [30] },

    { id: 999, name: "管理人", powerGrowth: 999999, manaGrowth: 999999, religionGrowth: 999999, vitalityGrowth: 999999, agilityGrowth: 999999, dexterityGrowth: 999999, charmGrowth: 999999, karmaGrowth: 127, powerRequired: 100, manaRequired: 100, religionRequired: 100, vitalityRequired: 100, agilityRequired: 100, dexterityRequired: 100, charmRequired: 100, karmaRequired: 0, weapon: [1, 2, 3, 4], armor: [1, 2, 3, 4], accessory: [1, 2, 3, 4], basicArts: [999, 1000], masterArts: [10000], jobsRequired: [] }
];




module.exports = jobInformation;

//id22までが通常ジョブ，23以降が隠しジョブ