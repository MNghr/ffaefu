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
    enemy.receiveDamage = calculateAttack(user);
    return returnData;
}

artsEffect.cutOneWay= function (user,enemy) {//凶斬り
    returnData.message = "<h2>カットワンウェイ！</h2>";
    enemy.receiveDamage = calculateAttack(user) * utility.random(1, 50);
    enemy.erasiveness -= 9;
    return returnData;
}

artsEffect.furyCutter = function (user,enemy) {//連続斬り
    let hitAmount = utility.random(1, 8);
    returnData.message = "<p><h2>連続斬り！</h2>"+hitAmount+"回 あたった！</p>";
    enemy.receiveDamage = hitAmount*calculateAttack(user)*utility.random(1, 35);
    enemy.erasiveness -= 999999;
    return returnData;
}

artsEffect.fireBlast = function (user,enemy) {//ファイアブラスト
    returnData.message = "<h2>炎熱魔法・ファイアブラスト！</h2>";
    enemy.receiveDamage = (user.mana + user.jobLevel) * utility.random(1, 50);
    enemy.erasiveness = -999999;
    return returnData;
}

artsEffect.meteor = function (user,enemy) {//リュウセイグン
    let hitAmount = utility.random(1, 16);
    returnData.message = "<p><h2>"+user.name+"は流星群を呼んだ！</h2>"+hitAmount+"回 あたった！</p>";
    enemy.receiveDamage = hitAmount*user.mana*utility.random(20, 35);
    enemy.erasiveness -= 9999999;
    return returnData;
}

artsEffect.recover = function (user,enemy) {//リカバリー
    user.recoveryHP = (user.mana + user.religion) * utility.random(50, 100);
    returnData.message = "<h2>治癒術式リカバリー！</h2>" + user.name + "のHPが" + user.recoveryHP + "回復した♪";
    enemy.receiveDamage = 0;
    return returnData;
}

artsEffect.circleOfProtection = function (user,enemy) {//防御円
    user.damageCutPercent = 90;
    returnData.message = "<h2>防御円！</h2>" + user.name + "の受けるダメージを1/10に軽減！";
    enemy.receiveDamage = calculateAttack(user);
    return returnData;
}

artsEffect.cleansing = function (user,enemy) {//浄化
    returnData.message = "<h2>浄化！</h2>";
    enemy.receiveDamage = user.mana * utility.random(75, 250);
    user.erasiveness -= 999999;

    return returnData;
}

artsEffect.stealMoney = function (user,enemy) {//お金を盗む
    let returnData = {};
    returnData.message = enemy.name+"からお金を盗んだ！";
    enemy.receiveDamage = calculateAttack(user);
    user.gainMoney = Math.ceil(enemy.dropMoney * utility.random(100, 500) / 100.0 * enemy.receiveDamage / enemy.maxHP);
    enemy.erasiveness -= 0;
    
    return returnData;
}

//斬鉄剣
artsEffect.zantetsuken = function (user, enemy) { 
    let returnData = {};
    returnData.message = "斬"
    enemy.receiveDamage = enemy.attack;
    if (utility.random(1, 10) <= 8) {
        returnData.message += "  鉄";
        if (utility.random(1, 10) <= 7) {
            "  剣！！";
            enemy.receiveDamage = Math.ceil(enemy.currentHP*1.3);
        } else {
            returnData.message += "．．．失敗！";
        }
    } else {
        returnData.message += "．．．失敗！";
    }
    enemy.erasiveness -= 999999;
    return returnData;
}

artsEffect.deadlyMessage = function (user, enemy) { 
    let returnData = {};
    returnData.message = "死のメッセージ！";
    enemy.receiveDamage = enemy.maxHP*5;
    let lut = "DEATH";
    for (let i = 0; i < 5; ++i){
        if (utility.random(1, 10) == 10) {
            returnData.message += "...失敗！";
            enemy.receiveDamage = calculateAttack(user);
            break;
        } else {
            returnData.message += lut[i];
        }
    }

    enemy.erasiveness -= 999999;
    return returnData;
}


let calculateAttack = function (user) {
    //職業や装備によって計算するところを今は力をそのまま返すことにする．
    return user.power;
}



module.exports = artsEffect;
