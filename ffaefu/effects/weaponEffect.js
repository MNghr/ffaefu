//武器の特殊効果を処理するルーチンをここに記述
let weaponEffect = {};
weaponEffect.none = function (user, enemy) {
    let returnData = {};
    returnData.returnMessage = "";

    return returnData;
};

//どくばり
weaponEffect.poisonNeedle = function (user, enemy) {
    enemy.receiveDamage = 1;
    let returnData = {};
    returnData.message = "";
    if (Math.random(1, 1000) <= 25) {
        enemy.receiveDamage = enemy.maxHP;
        enemy.recoverHP = -enemy.recoverHP;
        returnData.message += enemy.name + "の息の根を止めた！！";
    }

    return returnData;
}

//ムラマサ
weaponEffect.muramasa = function (user, enemy) {
    user.weapon.attack = 4000000 * (user.currentHP / user.maxHP);
    let returnData = { message: "" };

    return returnData;
};

//エクスカリパー   
weaponEffect.Excalipur = function (user, enemy) {
    let returnData = { message: "" };
    user.weapon.attack = utility.random(1, user.power + user.mana + user.religion + user.dexterity + user.vitality + user.agility + user.charm + user.karma);
    if (utility.random(1, 2) === 1) {
        user.weapon.attack = 1;
    }

    return returnData;
} 

module.exports = weaponEffect;