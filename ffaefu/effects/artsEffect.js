//戦術を処理するルーチンをここに記述
let utility = require("../utility.js");
let artsEffect = {};

let returnData = {
    message: "",
    dealDamage: 0,
    recoveryHP: 0,
    damageCutPercent: 0,
    accuracyBias: 0
};

artsEffect.none = function (user,enemy) { //通常攻撃
    returnData.message= "";
    returnData.dealDamage = calculateAttack(user);
    return returnData;
}

artsEffect.crossSlash = function (user,enemy) {//凶斬り
    returnData.message = "<h2>必殺！凶斬り！！</h2>";
    returnData.dealDamage = calculateAttack(user)*utility.random(1, 50);

    return returnData;
}

artsEffect.furyCutter = function (user,enemy) {//連続斬り
    let hitAmount = utility.random(1, 8);
    returnData.message = "<p><h2>連続斬り！</h2>"+hitAmount+"回 あたった！</p>";
    returnData.dealDamage = hitAmount*calculateAttack(user)*utility.random(1, 35);

    return returnData;
}

artsEffect.fireBlast = function (user,enemy) {//ファイアブラスト
    returnData.message = "<h2>炎熱魔法・ファイアブラスト！</h2>";
    returnData.dealDamage = user.mana*utility.random(30, 70);

    return returnData;
}

artsEffect.meteor = function (user,enemy) {//リュウセイグン
    let hitAmount = utility.random(1, 16);
    returnData.message = "<p><h2>"+user.userName+"は流星群を呼んだ！</h2>"+hitAmount+"回 あたった！</p>";
    returnData.dealDamage = hitAmount*user.mana*utility.random(20, 35);

    return returnData;
}

artsEffect.recover = function (user,enemy) {//リカバリー
    returnData.recoveryHP = (user.mana + user.religion) * utility.random(50, 100);
    returnData.message = "<h2>治癒術式リカバリー！</h2>" + user.userName + "のHPが" + pulsHP + "回復した♪";
    returnData.dealDamage = 0;
    return returnData;
}

artsEffect.circleOfProtection = function (user,enemy) {//防御円
    returnData.damageCutPercent = 90;
    returnData.message = "<h2>防御円！</h2>" + user.userName + "の受けるダメージを1/10に軽減！";
    returnData.dealDamage = calculateAttack(user);
    returnData.accuracyBias = 99999;
    return returnData;
}

artsEffect.cleansing = function (user,enemy) {//浄化
    returnData.message = "<h2>浄化！</h2>";
    returnData.dealDamage = user.mana * utility.random(75, 250);
    returnData.accuracyBias = 99999;

    return returnData;
}

artsEffect.stealMoney = function (user,enemy) {//お金を盗む
    let returnData = {};
    returnData.message = enemy.enemyName+"からお金を盗んだ！";
    returnData.dealDamage = calculateAttack(user);
    returnData.gainMoney = Math.ceil(enemy.dropMoney * utility.random(100, 500) / 100.0 * returnData.dealDamage / enemy.maxHP);
    returnData.accuracyBias = 0;
    
    return returnData;
}

//斬鉄剣
artsEffect.zantetsuken = function (user, enemy) { 
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

artsEffect.deadlyMessage = function (user, enemy) { 
    let returnData = {};
    returnData.message = "死のメッセージ！";
    returnData.dealDamage = enemy.currentHP*5;
    let lut = "DEATH";
    for (let i = 0; i < 5; ++i){
        if (utility.random(1, 10) == 10) {
            returnData.message += "...失敗！";
            returnData.dealDamage = calculateAttack(user);
            break;
        } else {
            returnData.message += lut[i];
        }
    }

    returnData.accuracyBias = 999999999;
    return returnData;
}


let calculateAttack = function (user) {
    //職業や装備によって計算するところを今は力をそのまま返すことにする．
    return user.power;
}



module.exports = artsEffect;
