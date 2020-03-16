let battle = {};
let utility = require("./utility.js");
let fs = require("fs");
let jobInformation = require("./informations/jobInformation.js");

battle.battleAgainstMonster = function (user, enemy) {
    let stamina = utility.calculateStamina(user.lastBattleDate);
    user.lastBattleDate = (utility.getTime() - (stamina - 60) * 1000);
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
        userAttack = user.power;//utility.calculateAttack(user);
        let turn = 1;
        while (user.currentHP > 0 && enemy.currentHP > 0) {
            this.returnMessage += turn + "ターン目:<br>";
            this.returnMessage += user.userName + ":" + user.currentHP + "/" + user.maxHP + "VS" + enemy.enemyName + ":" + enemy.currentHP + "/" + enemy.maxHP + "<br>";
            enemy.currentHP -= userAttack;
            this.returnMessage += user.userName + "の攻撃!" + enemy.enemyName + "に" + userAttack + "ダメージを与えた<br>";
            user.currentHP -= enemy.attack;
            this.returnMessage += enemy.enemyName + "が襲い掛かった！" + user.userName + "は" + enemy.attack + "ダメージ受けた<br>";
            this.returnMessage += "<br>";
            turn++;
            if (turn === 151) {
                break;
            }
        }
        if (enemy.currentHP <= 0) {
            this.returnMessage += user.userName+"は戦闘に勝利した！！";
            this.win(user,enemy);
        } else if (user.currentHP <= 0) {
            this.returnMessage += "敗北した．．．";
            this.lose(user,enemy);   
        } else {
            this.returnMessage += "逃げ出した...♪";
            this.draw(user,enemy);
        }

        utility.writeUser(user);
        console.log("戦闘後ファイル書き換え完了");
        return this.returnMessage;
    }
};

battle.getExp = function(user, amount){
    user.exp += amount;
    this.returnMessage += user.userName + "は" + amount + "経験値を獲得．";
    this.levelup(user);
}

battle.levelup = function (user) {
    let levelDifference = 0;
    let userOld = {}; //能力の上昇量を表示するために使う．レベルアップ前の各能力値を入れる変数
    userOld.maxHP = user.maxHP;
    userOld.power = user.power;
    userOld.mana = user.mana;
    userOld.agility = user.agility;
    userOld.dexterity = user.dexterity;
    userOld.karma = user.karma;
    userOld.religion = user.religion;
    userOld.vitality = user.vitality;
    userOld.charm = user.charm;
    while (user.level * 300 <= user.exp) {
        user.exp -= (user.level) * 300;
        ++user.level;
        ++levelDifference;
        let abilityDifference = utility.random(1, jobInformation.jobList[user.job].powerGrowth) * utility.random(0, 1);
        user.power += abilityDifference;
        abilityDifference = utility.random(1, jobInformation.jobList[user.job].manaGrowth) * utility.random(0, 1);
        user.mana += abilityDifference;
        abilityDifference = utility.random(1, jobInformation.jobList[user.job].religionGrowth) * utility.random(0, 1);
        user.religion += abilityDifference;
        abilityDifference = utility.random(1, jobInformation.jobList[user.job].vitalityGrowth) * utility.random(0, 1);
        user.vitality += abilityDifference;
        abilityDifference = utility.random(1, jobInformation.jobList[user.job].agilityGrowth) * utility.random(0, 1);
        user.agility += abilityDifference;
        abilityDifference = utility.random(1, jobInformation.jobList[user.job].charmGrowth) * utility.random(0, 1);
        user.charm += abilityDifference;
        abilityDifference = utility.random(1, jobInformation.jobList[user.job].karmaGrowth) * utility.random(0, 1);
        user.karma += abilityDifference;
        abilityDifference = utility.random(1, jobInformation.jobList[user.job].dexterityGrowth) * utility.random(0, 1);
        user.dexterity += abilityDifference;
        user.maxHP += utility.random(1, 4) * user.vitality;
    }
    if (levelDifference > 0) {
        this.returnMessage += "<h1>" + user.userName + "のレベルが" + levelDifference + "上がった！</h1>";
        this.returnMessage += "最大HPが" + (user.maxHP - userOld.maxHP) + "上がった．";
        this.returnMessage += "力が" + (user.power - userOld.power) + "上がった．";
        this.returnMessage += "魔力が" + (user.mana - userOld.mana) + "上がった．";
        this.returnMessage += "信仰心が" + (user.religion - userOld.religion) + "上がった．";
        this.returnMessage += "生命力が" + (user.vitality - userOld.vitality) + "上がった．";
        this.returnMessage += "速さが" + (user.agility - userOld.agility) + "上がった．";
        this.returnMessage += "魅力が" + (user.charm - userOld.charm) + "上がった．";
        this.returnMessage += "器用さが" + (user.dexterity - userOld.dexterity) + "上がった．";
        this.returnMessage += "カルマが" + (user.karma - userOld.karma) + "上がった．";
    }
};


battle.win = function (user, enemy) {
    user.money += enemy.dropMoney;
    this.getExp(user, enemy.exp);
    this.returnMessage += enemy.dropMoney + "C入手した．";
    console.log(user);
};

battle.lose = function(user,enemy){
    user.money /= 10;
    this.getExp(user, 1);
    console.log(user)
};

battle.draw = function (user,enemy) {
    this.getExp(user, enemy.exp / 2);
    console.log(user);
}

module.exports = battle;