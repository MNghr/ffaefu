let battle = {};
let usersPeripheral = require("./usersPeripheral.js");
let utility = require("./utility.js");
let fs = require("fs");
let jobInformation = require("./informations/jobInformation.js");
let artsInformation = require("./informations/artsInformation.js");
let enemyArtsEffect = require("./effects/enemyArtsEffect.js");
let configuration = require("./configuration.js");
let itemInformation = require("./informations/itemInformation");

//戦闘周りの処理 戦闘突入に伴うスタミナ減少，戦闘，戦闘後の各種獲得処理，レベルアップ，レベルアップに伴う職業マスター処理をここに記述

battle.battleAgainstMonster = function (user, enemy) {
    let stamina = usersPeripheral.calculateStamina(user.lastBattleDate);
    user.lastBattleDate = (utility.getTime() - (stamina - configuration.vsMonsterStamina) * 1000);
    return this.battleRoutine(user, enemy, 0);
};
battle.battleAgainstPlayer = function (user, enemy) {
    return this.battleRoutine(user, enemy, 1);
};
battle.returnMessage = "";
battle.battleRoutine = function (user, enemy, kind) {
    let _user = JSON.parse(JSON.stringify(user));
    let _enemy = JSON.parse(JSON.stringify(enemy));
    _user.weapon = JSON.parse(JSON.stringify(usersPeripheral.getWeaponByIndex(user.weapon)));
    _user.armor = JSON.parse(JSON.stringify(usersPeripheral.getWeaponByIndex(user.armor)));
    _user.accessory = JSON.parse(JSON.stringify(usersPeripheral.getWeaponByIndex(user.accessory)));

    _enemy.artsEffect = enemyArtsEffect.fire2;
    console.log(_user.weapon)
    console.log(usersPeripheral.getWeaponByIndex(user.weapon));
    console.log(_user);
    console.log(_enemy);

    this.returnMessage = "";
    if (kind === 0) { //モンスター戦
        _enemy.currentHP = _enemy.maxHP;

        userAttack = usersPeripheral.calculateAttack(_user);
        let turn = 1;
        console.log("ユーザの戦術番号:"+_user.setArts)
        while (_user.currentHP > 0 && _enemy.currentHP > 0) {
            _enemy.receiveDamage = 0; 
            _enemy.damageCutPercentage = 0.0; 
            _enemy.recoverHP = 0; 
            _enemy.erasiveness = enemy.erasive; 
            _user.receiveDamage = 0;
            _user.damageCutPercentage = 0.0; //ユーザのダメージ軽減率
            _user.erasiveness = 50;
            _user.receiveElement = "";
    
            this.returnMessage += turn + "ターン目:<br>";
            this.returnMessage += _user.name + ":" + _user.currentHP + "/" + _user.maxHP + "VS" + _enemy.name + ":" + _enemy.currentHP + "/" + _enemy.maxHP + "<br>";
            let receiveData = {};
            let enemyReceiveData = {};

            if (usersPeripheral.getArtsOfUser(_user).invocationRate > utility.random(0, 99)) {
                console.log("戦術発動");
                receiveData = usersPeripheral.getArtsOfUser(_user).effect(_user, _enemy);            
            } else {
                console.log("戦術不発");
                receiveData = usersPeripheral.getArtsById(0).effect(_user,_enemy);
            }

            if (_enemy.artsActivation > utility.random(0, 99)) {
                console.log("敵戦術発動");
                enemyReceiveData = _enemy.artsEffect(_user, _enemy);
            } else {
                console.log("敵戦術不発")
                enemyReceiveData = enemyArtsEffect.none(_user, _enemy);
            }

            if (_user.accessory.invocationRate > utility.random(0, 99)) {
                console.log("アクセサリ効果発動");
                _user.accessory.accessoryEffect(_user, _enemy);
            } else{
                console.log("アクセサリ効果不発")
            }

            
            _enemy.currentHP -= Math.ceil(_enemy.receiveDamage*Math.ceil(1-_enemy.damageCutPercentage));
            this.returnMessage += _user.name + "の攻撃!"+receiveData.message+_enemy.name + "に" + _enemy.receiveDamage + "ダメージを与えた<br>";
            _user.currentHP -= Math.ceil(_user.receiveDamage*Math.ceil(1-_user.damageCutPercentage));
            this.returnMessage += _enemy.name + "が襲い掛かった！" + enemyReceiveData.message + _user.name + "は" + _user.receiveDamage + "ダメージ受けた<br>";
            this.returnMessage += "<br>";
            turn++;
            if (turn > turnLimit) {
                break;
            }
        }

        if (_enemy.currentHP <= 0) {
            this.returnMessage += user.name+"は戦闘に勝利した！！";
            this.win(user,enemy);
        } else if (_user.currentHP <= 0) {
            this.returnMessage += "敗北した．．．";
            this.lose(user,enemy);   
        } else {
            this.returnMessage += "逃げ出した...♪";
            this.draw(user,enemy);
        }
        user.currentHP = _user.currentHP;
        if (user.currentHP <= 0) {
            user.currentHP = user.maxHP;
        }
        usersPeripheral.writeUser(user);
        console.log("戦闘後ファイル書き換え完了");
        return this.returnMessage;
    } else if (kind === 1) { //対人戦
        
    }
};

battle.getExp = function(user, amount){
    user.exp += amount;
    this.returnMessage += user.name + "は" + amount + "経験値を獲得．";
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
    userOld.jobLevel = user.jobLevel;
    while (user.level * 300 <= user.exp) {
        user.exp -= (user.level) * 300;
        ++user.level;
        ++levelDifference;
        ++user.jobLevel;
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
        user.jobLevel = Math.min(60, user.jobLevel);
        this.returnMessage += "<h1>" + user.name + "のレベルが" + levelDifference + "上がった！";
        if (user.jobLevel === 60 && userOld.jobLevel < 60) {
            this.returnMessage += usersPeripheral.getJobElementOfUser(user).name + "をマスターした！！！";
            this.jobMaster(user);
        }
        this.returnMessage += "</h1>"
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

battle.itemsEffect= function(user, enemy){
    user.itemInventory.forEach((element, index) => {
        itemInformation.itemList[index].itemEffect(user,enemy);
    });
}

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

battle.draw = function (user, enemy) {
    this.getExp(user, enemy.exp / 2);
    console.log(user);
};

battle.jobMaster = function (user) {
    user.artsInventory = user.artsInventory.concat(usersPeripheral.getJobElementOfUser(user).masterArts);
    user.career[usersPeripheral.getJobElementOfUser(user).id] = user.jobLevel;
}

module.exports = battle;