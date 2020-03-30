//戦術を処理するルーチンをここに記述
let utility = require("../utility.js");
let artsEffect = {};

artsEffect.none = function (user,enemy) { //通常攻撃
    console.log(utility);
    let returnData = {};
    returnData.message= "";
    returnData.dealDamage = calculateAttack(user);
    return returnData;
}

artsEffect.crossSlash = function (user,enemy) {
    let returnData = {};
    returnData.message = "<h2>必殺！凶斬り！！</h2>";
    returnData.dealDamage = calculateAttack(user)*random(1, 50);

    return returnData;
}

artsEffect.furyCutter = function (user,enemy) {
    let returnData = {};
    let hitAmount = utility.random(1,8);
    returnData.message = "連続斬り！"+hitAmount+"回 あたった！";
    returnData.dealDamage = hitAmount*calculateAttack(user)*random(1, 35);

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
