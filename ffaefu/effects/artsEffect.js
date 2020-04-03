//戦術を処理するルーチンをここに記述
let utility = require("../utility.js");
let artsEffect = {};

artsEffect.none = function (user,enemy) { //通常攻撃
    let returnData = {};
    returnData.message= "";
    returnData.dealDamage = calculateAttack(user);
    return returnData;
}

artsEffect.crossSlash = function (user,enemy) {//凶斬り
    let returnData = {};
    returnData.message = "<h2>必殺！凶斬り！！</h2>";
    returnData.dealDamage = calculateAttack(user)*random(1, 50);

    return returnData;
}

artsEffect.furyCutter = function (user,enemy) {//連続斬り
    let returnData = {};
    let hitAmount = random(1, 8);
    returnData.message = "<p><h2>連続斬り！</h2>"+hitAmount+"回 あたった！</p>";
    returnData.dealDamage = hitAmount*calculateAttack(user)*random(1, 35);

    return returnData;
}

artsEffect.fireBlast = function (user,enemy) {//ファイアブラスト
    let returnData = {};
    returnData.message = "<h2>炎熱魔法・ファイアブラスト！</h2>";
    returnData.dealDamage = user.mana*random(30, 70);

    return returnData;
}

artsEffect.meteor = function (user,enemy) {//リュウセイグン
    let returnData = {};
    let hitAmount = random(1, 16);
    returnData.message = "<p><h2>"+user.userName+"は流星群を呼んだ！</h2>"+hitAmount+"回 あたった！</p>";
    returnData.dealDamage = hitAmount*user.mana*random(20, 35);

    return returnData;
}

artsEffect.recover = function (user,enemy) {//リカバリー
    let returnData = {};
    returnData.pulsHP = (user.mana + user.religion) * random(50, 100);
    returnData.message = "<h2>治癒術式リカバリー！</h2>" + user.userName + "のHPが" + pulsHP + "回復した♪";
    returnData.dealDamage = 0;
    return returnData;
}

artsEffect.circleOfProtection = function (user,enemy) {//防御円
    let returnData = {};
    returnData.damageCutPercent = 90;
    returnData.message = "<h2>防御円！</h2>" + user.userName + "の受けるダメージを1/10に軽減！";
    returnData.dealDamage = calculateAttack(user);
    return returnData;
}

artsEffect.cleansing = function (user,enemy) {//浄化
    let returnData = {};
    returnData.message = "<h2>浄化！</h2>";
    returnData.dealDamage = user.mana * random(75, 250);
    
    return returnData;
}

artsEffect.stealMoney = function (user,enemy) {//お金を盗む
    let returnData = {};
    returnData.message = enemy.enemyName+"からお金を盗んだ！";
    returnData.dealDamage = calculateAttack(user);
    returnData.gainMoney = Math.ceil(enemy.dropMoney * random(100, 500) / 100.0*returnData.dealDamage / enemy.maxHP);
    
    return returnData;
}





let calculateAttack = function (user) {
    //職業や装備によって計算するところを今は力をそのまま返すことにする．
    return user.power;
}

let random = function (min, max) {
    if (min > max) {
        let tmp = min;
        min = max;
        max = tmp;
    }
    let ret = Math.ceil(Math.random() * (max - min + 1) + min - 1);
    return ret;
}

module.exports = artsEffect;
