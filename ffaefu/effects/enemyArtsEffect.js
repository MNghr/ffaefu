//敵の戦術の処理
let utility = require("../utility.js");
let enemyArtsEffect = {};

//通常攻撃
enemyArtsEffect.none = function (user,enemy) { 
    let returnData = {};
    returnData.message= "";
    returnData.dealDamage = enemy.attack;
    returnData.accuracyBias = 0;
    return returnData;
}

//ファイア
enemyArtsEffect.fire = function (user, enemy) { 
    let returnData = {};
    returnData.message= "黒魔法 ファイア！";
    returnData.dealDamage = enemy.attack;
    returnData.element = "fire";
    returnData.accuracyBias = 999;
    return returnData;
}
//ブリザード
enemyArtsEffect.blizzard = function (user, enemy) { 
    let returnData = {};
    returnData.message= "黒魔法 ブリザード！";
    returnData.dealDamage = enemy.attack;
    returnData.element = "ice";
    returnData.accuracyBias = 999;
    return returnData;
}
//サンダー
enemyArtsEffect.thunder = function (user, enemy) { 
    let returnData = {};
    returnData.message= "黒魔法 サンダー！";
    returnData.dealDamage = enemy.attack;
    returnData.element = "thunder";
    returnData.accuracyBias = 999;
    return returnData;
}

//ファイア2
enemyArtsEffect.fire2 = function (user, enemy) { 
    let returnData = {};
    returnData.message= "黒魔法 ファイア2！";
    returnData.dealDamage = enemy.attack*2;
    returnData.element = "fire";
    returnData.accuracyBias = 999;
    return returnData;
}

//ブリザード2
enemyArtsEffect.blizzard2 = function (user, enemy) { 
    let returnData = {};
    returnData.message= "黒魔法 ブリザード2！";
    returnData.dealDamage = enemy.attack*2;
    returnData.element = "ice";
    returnData.accuracyBias = 999;
    return returnData;
}

//サンダー2
enemyArtsEffect.thunder2 = function (user, enemy) { 
    let returnData = {};
    returnData.message= "黒魔法 サンダー2！";
    returnData.dealDamage = enemy.attack*2;
    returnData.element = "thunder";
    returnData.accuracyBias = 999;
    return returnData;
}

//メテオ
enemyArtsEffect.meteor = function (user, enemy) { 
    let returnData = {};
    let hitAmount = utility.random(1, 16);
    returnData.message = "古代魔法 ミーティア！" + hitAmount + "ヒット！";
    returnData.dealDamage = enemy.attack * 2 * hitAmount;
    return returnData;
}

//斬鉄剣 80%で2段階目成功，70% で3段階目成功．20%か30%を片方でも踏んだら失敗
enemyArtsEffect.zantetsuken = function (user, enemy) { 
    let returnData = {};
    returnData.message = "斬"
    returnData.dealDamage = enemy.attack;
    if (utility.random(1, 10) <= 8) {
        returnData.message += "  鉄";
        if (utility.random(1, 10) <= 7) {
            "  剣！！";
            returnData.dealDamage = Math.ceil(user.currentHP*1.3);
        } else {
            returnData.message += "．．．失敗！";
        }
    } else {
        returnData.message += "．．．失敗！";
    }
    returnData.accuracyBias = 99999999;
    return returnData;
}

//死のメッセージ
enemyArtsEffect.deadlyMessage = function (user, enemy) { 
    let returnData = {};
    returnData.message = "死のメッセージ！";
    returnData.dealDamage = user.currentHP;
    let lut = "DEATH";
    for (let i = 0; i < 5; ++i){
        if (utility.random(1, 10) == 10) {
            returnData.message += "...失敗！";
            returnData.dealDamage = enemy.attack;
            break;
        } else {
            returnData.message += lut[i];
        }
    }

    returnData.accuracyBias = 999999999;
    return returnData;
}

//ボーナスモンスター用 
enemyArtsEffect.efu = function (user, enemy) { 
    let returnData = {};
    if (utility.random(1, 1000) === 1000) {
        returnData.message = "Fatal User's Critical Killer";
        returnData.dealDamage = 9999999999999999;
    } else {
        returnData.message = "管理者特権";
        returnData.dealDamage -= 1000000000000;
    }
    returnData.accuracyBias = 9999999999;
    return returnData;
}
//ホーリーパネル
enemyArtsEffect.hollyPanel = function (user, enemy) {
    let returnData = {};
    returnData.message = "防御術式展開・ホーリパネル！！";
    returnData.dealDamage = enemy.attack;
    returnData.accuracyBias = 0;
    return returnData;
}
//アルテマ
enemyArtsEffect.ultima = function (user, enemy) {
    let returnData = {};
    returnData.message = "禁断魔法アルテマ！";
    returnData.dealDamage = enemy.attack * 50;
    returnData.element = "forbidden";
    return returnData;
}

//デジョン
enemyArtsEffect.desion = function (user, enemy) {
    let returnData = {};
    returnData.message = "禁断魔法アルテマ！";
    returnData.dealDamage = enemy.attack * utility.random(1,50);
    returnData.element = "forbidden";
    return returnData;
}

enemyArtsEffect.drain = function (user, enemy) {
    let returnData = {};
    returnData.message = "暗黒魔法 ドレイン！";
    returnData.dealDamage = enemy.attack * 2;
    returnData.recoveryHP = returnData.dealDamage;
    return returnData;
}

//ファイア，ブリザード，サンダーを等確率で打ち分け
enemyArtsEffect.blackMagics = function (user,enemy) { 
    let returnData = {};
    let dice = Math.random(1, 6);
    if (dice <= 2) {
        returnData = this.fire;
    } else if (dice <= 4) {
        returnData = this.blizzard;
    } else {
        returnData = this.thunder;
    }
    return returnData;
}

module.exports = enemyArtsEffect;