let accessoryEffect = {};

accessoryEffect.none = function (user,enemy) {
    let returnData = {};
    returnData.message = "";
    return returnData;
};

accessoryEffect.majinRing = function (user,enemy) {
    let returnData = {};
    enemy.receiveDamage *= 1.5;
    Math.ceil(enemy.receiveDamage);
    returnData.message = "";
    return returnData;
};

accessoryEffect.aura = function (user, enemy) {
    let returnData = {};
    user.weapon.attack *= 2;
    returnData.message = "オーラの結晶が光を放つ．．．武器の効果二倍！(効果継続・重複有効)";
    return returnData;
}


module.exports = accessoryEffect;