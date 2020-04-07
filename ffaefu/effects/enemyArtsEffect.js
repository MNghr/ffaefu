//敵の戦術の処理
let utility = require("../utility.js");
let enemyArtsEffect = {};

//通常攻撃
enemyArtsEffect.none = function (user,enemy) { 
    let returnData = {};
    returnData.message= "";
    user.receiveDamage = enemy.attack;
    user.erasiveness -= 0;
    return returnData;
}

//ファイア
enemyArtsEffect.fire = function (user, enemy) { 
    let returnData = {};
    returnData.message= "黒魔法 ファイア！";
    user.receiveDamage = enemy.attack;
    returnData.element = "fire";
    user.erasiveness -= 999;
    return returnData;
}
//ブリザード
enemyArtsEffect.blizzard = function (user, enemy) { 
    let returnData = {};
    returnData.message= "黒魔法 ブリザード！";
    user.receiveDamage = enemy.attack;
    returnData.element = "ice";
    user.erasiveness -= 999;
    return returnData;
}
//サンダー
enemyArtsEffect.thunder = function (user, enemy) { 
    let returnData = {};
    returnData.message= "黒魔法 サンダー！";
    user.receiveDamage = enemy.attack;
    returnData.element = "thunder";
    user.erasiveness -= 999;
    return returnData;
}

//ファイア2
enemyArtsEffect.fire2 = function (user, enemy) { 
    let returnData = {};
    returnData.message= "黒魔法 ファイア2！";
    user.receiveDamage = enemy.attack*2;
    returnData.element = "fire";
    user.erasiveness -= 999;
    return returnData;
}

//ブリザード2
enemyArtsEffect.blizzard2 = function (user, enemy) { 
    let returnData = {};
    returnData.message= "黒魔法 ブリザード2！";
    user.receiveDamage = enemy.attack*2;
    returnData.element = "ice";
    user.erasiveness -= 999;
    return returnData;
}

//サンダー2
enemyArtsEffect.thunder2 = function (user, enemy) { 
    let returnData = {};
    returnData.message= "黒魔法 サンダー2！";
    user.receiveDamage= enemy.attack*2;
    returnData.element = "thunder";
    user.erasiveness -= 999;
    return returnData;
}

//メテオ
enemyArtsEffect.meteor = function (user, enemy) { 
    let returnData = {};
    let hitAmount = utility.random(1, 16);
    returnData.message = "古代魔法 ミーティア！" + hitAmount + "ヒット！";
    user.receiveDamage = enemy.attack * 2 * hitAmount;
    user.erasiveness -= 999;
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
    user.erasiveness -= 99999999;
    returnData.element = "zantetsuken";
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

    user.erasiveness -= 999999999;
    return returnData;
}

//ボーナスモンスター用 
enemyArtsEffect.efu = function (user, enemy) { 
    let returnData = {};
    if (utility.random(1, 1000) === 1000) {
        returnData.message = "Fatal User's Critical Killer";
       user.receiveDamage = 9999999999999999;
    } else {
        returnData.message = "管理者特権";
        user.receiveDamage -= 1000000000000;
    }
    user.erasiveness -= 9999999999;
    return returnData;
}
//ホーリーパネル
enemyArtsEffect.hollyPanel = function (user, enemy) {
    let returnData = {};
    returnData.message = "防御術式展開・ホーリパネル！！";
    user.receiveDamage = enemy.attack;
    enemy.damageCutPercentage = 90;
    return returnData;
}
//アルテマ
enemyArtsEffect.ultima = function (user, enemy) {
    let returnData = {};
    returnData.message = "禁断魔法アルティメイタム！";
    user.receiveDamage = enemy.attack * 50;
    returnData.element = "forbidden";
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
    returnData.element = "desion";
    return returnData;
}

enemyArtsEffect.drain = function (user, enemy) {
    let returnData = {};
    returnData.message = "暗黒魔法 ドレイン！";
    user.receiveDamage = enemy.attack * 2;
    enemy.recoveryHP = user.receiveDamage;

    return returnData;
}

enemyArtsEffect.gravity = function (user, enemy) {
    let returnData = {};
    returnData.message = "古代魔法 ディザスター！";
    user.receiveDamage = Math.ceil(user.currentHP/3);
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