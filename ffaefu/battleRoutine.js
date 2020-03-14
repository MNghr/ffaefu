let battle = {};
let utility = require("./utility.js");
let fs = require("fs");

battle.battleAgainstMonster = function(user, enemy){
    return this.battleRoutine(user, enemy, 0);
};
battle.battleAgainstPlayer = function (user, enemy) {
    return this.battleRoutine(user, enemy, 1);
};
battle.returnMessage = "";
battle.battleRoutine = function (user, enemy, kind) {
    this.returnMessage = "";
    if (kind === 0) {
        enemy.currentHP = enemy.maxHP;
        userAttack = utility.calculateAttack(user);
        let turn = 1;
        while (user.currentHP > 0 && enemy.currentHP > 0) {
            this.returnMessage += turn + "ターン目:<br>";
            enemy.currentHP -= userAttack;
            this.returnMessage += user.userName + "の攻撃!" + enemy.enemyName + "に" + userAttack + "ダメージを与えた<br>";
            user.currentHP -= enemy.attack;
            this.returnMessage += enemy.enemyName + "が襲い掛かった！" + user.userName + "は" + enemy.attack + "ダメージ受けた<br>";
            this.returnMessage += "<br>"
            turn++;
            if (turn === 151) {
                break;
            }
        }
        if (enemy.currentHP < 0) {
            this.returnMessage += user.userName+"は戦闘に勝利した！！";
            this.win(user,enemy);
        } else if (user.currentHP < 0) {
            this.returnMessage += "敗北した．．．";
            this.lose(user,enemy);   
        } else {
            this.returnMessage += "逃げ出した...";
            this.draw(user,enemy);
        }

        fs.writeFileSync('./database/userData' + user.userId + ".json", JSON.stringify(user));
        console.log("戦闘後ファイル書き換え完了");
        return this.returnMessage;
    }
};

battle.win = function (user, enemy) {
    user.money += enemy.dropMoney;
    utility.getExp(user, enemy.exp);
    console.log(user);
};

battle.lose = function(user,enemy){
    user.money /= 10;
    utility.getExp(user, 1);
    console.log(user)
};

battle.draw = function (user,enemy) {
    utility.getExp(user, enemy.exp / 2);
    console.log(user);
}

module.exports = battle;