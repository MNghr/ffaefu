//敵の戦術の処理
let utility = require("../utility.js");
let enemyArtsEffect = {};

//通常攻撃
enemyArtsEffect.none = function (user,enemy) { 
    let returnData = {};
    returnData.message= "";
    user.receiveDamage += enemy.attack;
    user.evasiveness -= 0;
    return returnData;
}

//ファイア
enemyArtsEffect.fire = function (user, enemy) { 
    let returnData = {};
    returnData.message= shapeArtsName("黒魔法 ファイア！","darkred");
    user.receiveDamage = enemy.attack;
    user.receiveElement = "fire";
    user.evasiveness -= 999;
    return returnData;
}
//ブリザード
enemyArtsEffect.blizzard = function (user, enemy) { 
    let returnData = {};
    returnData.message= shapeArtsName("黒魔法 ブリザード！","royalblue");
    user.receiveDamage = enemy.attack;
    user.receiveElement = "ice";
    user.evasiveness -= 999;
    return returnData;
}
//サンダー
enemyArtsEffect.thunder = function (user, enemy) { 
    let returnData = {};
    returnData.message= shapeArtsName("黒魔法 サンダー！","yellow");
    user.receiveDamage = enemy.attack;
    user.receiveElement = "thunder";
    user.evasiveness -= 999;
    return returnData;
}

//ファイア2
enemyArtsEffect.fire2 = function (user, enemy) { 
    let returnData = {};
    returnData.message= shapeArtsName("黒魔法 ファイア2！","darkred");
    user.receiveDamage = enemy.attack*2;
    user.receiveElement = "fire";
    user.evasiveness -= 999;
    return returnData;
}

//ブリザード2
enemyArtsEffect.blizzard2 = function (user, enemy) { 
    let returnData = {};
    returnData.message= shapeArtsName("黒魔法 ブリザード2！","royalblue");
    user.receiveDamage = enemy.attack*2;
    user.receiveElement = "ice";
    user.evasiveness -= 999;
    return returnData;
}

//サンダー2
enemyArtsEffect.thunder2 = function (user, enemy) { 
    let returnData = {};
    returnData.message= shapeArtsName("黒魔法 サンダー2！","yellow");
    user.receiveDamage= enemy.attack*2;
    user.receiveElement = "thunder";
    user.evasiveness -= 999;
    return returnData;
}

//メテオ
enemyArtsEffect.meteor = function (user, enemy) { 
    let returnData = {};
    let hitAmount = utility.random(1, 16);
    returnData.message = shapeArtsName("古代魔法 ミーティア！","blue") + shapeHitAmount(hitAmount + "ヒット！");
    user.receiveDamage = enemy.attack * 2 * hitAmount;
    user.evasiveness -= 999;
    return returnData;
}

//斬鉄剣 80%で2段階目成功，70% で3段階目成功．20%か30%を片方でも踏んだら失敗
enemyArtsEffect.zantetsuken = function (user, enemy) { 
    let returnData = {};
    returnData.message = "斬"
    user.receiveDamage = enemy.attack;
    if (utility.random(1, 10) <= 8) {
        returnData.message += "  鉄";
        if (utility.random(1, 10) <= 7) {
            "  剣！！";
            user.receiveDamage = Math.ceil(user.currentHP*1.3);
        } else {
            returnData.message += "．．．失敗！";
        }
    } else {
        returnData.message += "．．．失敗！";
    }
    returnData.message += shapeArtsName(returnData.message, "gray");
    user.evasiveness -= 99999999;
    user.receiveElement = "zantetsuken";
    return returnData;
}

//死のメッセージ
enemyArtsEffect.deadlyMessage = function (user, enemy) { 
    let returnData = {};
    returnData.message = "死のメッセージ！";
    user.receiveDamage = user.currentHP;
    let lut = "DEATH";
    for (let i = 0; i < 5; ++i){
        if (utility.random(1, 10) == 10) {
            returnData.message += "...失敗！";
            user.receiveDamage = enemy.attack;
            break;
        } else {
            returnData.message += lut[i];
        }
    }
    returnData.message = shapeArtsName(returnData.message, "purple");
    user.evasiveness -= 999999999;
    return returnData;
}

//ボーナスモンスター用 
enemyArtsEffect.efu = function (user, enemy) { 
    let returnData = {};
    if (utility.random(1, 1000) === 1000) {
        returnData.message = shapeArtsName("Fatal User's Critical Killer","blue");
       user.receiveDamage = 9999999999999999;
    } else {
        returnData.message = shapeArtsName("管理者特権","yellow");
        user.receiveDamage -= 100000000;
    }
    user.evasiveness -= 99999999;
    return returnData;
}
//ホーリーパネル
enemyArtsEffect.hollyPanel = function (user, enemy) {
    let returnData = {};
    returnData.message = shapeArtsName("防御術式展開・ホーリパネル！！","yellow");
    user.receiveDamage = enemy.attack;
    enemy.damageCutPercentage = 90;
    return returnData;
}
//アルテマ
enemyArtsEffect.ultima = function (user, enemy) {
    let returnData = {};
    returnData.message = shapeArtsName("禁断魔法アルティメイタム！","gray");
    user.receiveDamage = enemy.attack * 50;
    user.receiveElement = "forbidden";
    return returnData;
}

//デジョン
enemyArtsEffect.desion = function (user, enemy) {
    let returnData = {};
    returnData.message = "時空魔法 デジョン！！";
    if (utility.random(0, 3) === 3) {
        user.receiveDamage = user.currentHP;
    } else {
        returnData.message +="失敗した．．．"
        user.receiveDamage = enemy.attack;
    }
    user.receiveElement = "desion";
    returnData.message = shapeArtsName(returnData.message, "blue");
    return returnData;
}

enemyArtsEffect.drain = function (user, enemy) {
    let returnData = {};
    returnData.message = shapeArtsName("暗黒魔法 ドレイン！","purple");
    user.receiveDamage = enemy.attack * 2;
    enemy.recoveryHP = user.receiveDamage;

    return returnData;
}

enemyArtsEffect.gravity = function (user, enemy) {
    let returnData = {};
    returnData.message = shapeArtsName("古代魔法 ディザスター！","royalblue");
    user.receiveDamage = Math.ceil(user.currentHP/3);
    return returnData;
}


//ファイア，ブリザード，サンダーを等確率で打ち分け
enemyArtsEffect.blackMagics = function (user,enemy) { 
    let returnData = {};
    let dice = Math.random(1, 6);
    if (dice <= 2) {
        returnData = enemyArtsEffect.fire(user,enemy);
    } else if (dice <= 4) {
        returnData = enemyArtsEffect.blizzard(user,enemy);
    } else {
        returnData = enemyArtsEffect.thunder(user,enemy);
    }
    return returnData;
}


//必殺技の表示形成
let shapeArtsName = function(artsName, color){  
    return '<span class="arts'+color+'">'+artsName+"</span>";
}

//ヒット回数の表示形成
let shapeHitAmount = function (hitAmount, color) {
    return '<span class="hitAmount'+color+'">'+hitAmount+"</span>";
}
module.exports = enemyArtsEffect;