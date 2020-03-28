//戦術を処理するルーチンをここに記述
let utility = require("../utility.js");
let artsEffect = {};

artsEffect.none = function (user) { //通常攻撃
    console.log(utility);
    let returnData = {};
    returnData.message= "";
    returnData.dealDamage = utility.calculateAttack(user);
    return returnData;
}

artsEffect.crossSlash = function (user) {
    let returnData = {};
    returnData.message = "凶斬り！！";
    returnData.dealDamage = utility.calculateAttack(user)*utility.random(1, 50);

    return returnData;
}

artsEffect.furyCutter = function (user) {
    let returnData = {};
    let hitAmount = utility.random(1,8);
    returnData.message = "連続斬り！"+hitAmount+"回 あたった！";
    returnData.dealDamage = hitAmount*utility.calculateAttack(user)*utility.random(1, 35);

    return returnData;
}

module.exports = artsEffect;
