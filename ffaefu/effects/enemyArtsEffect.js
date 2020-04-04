//敵の戦術の処理
let utility = require("../utility.js");
let enemyArtsEffect = {};

enemyArtsEffect.none = function (user,enemy) { //通常攻撃
    let returnData = {};
    returnData.message= "";
    returnData.dealDamage = calculateAttack(user);
    return returnData;
}

enemyArtsEffect.none = function (user,enemy) { //通常攻撃
    let returnData = {};
    returnData.message= "";
    returnData.dealDamage = calculateAttack(user);
    return returnData;
}

