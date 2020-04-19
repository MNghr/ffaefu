let battle = {};
let usersPeripheral = require("./usersPeripheral.js");
let utility = require("./utility.js");
let fs = require("fs");
let jobInformation = require("./informations/jobInformation.js");
let artsInformation = require("./informations/artsInformation.js");
let enemyArtsEffect = require("./effects/enemyArtsEffect.js");
let accessoryEffect = require("./effects/accessoryEffect.js");
let configuration = require("./configuration.js");
let itemInformation = require("./informations/itemInformation");
let enemyInformation = require("./informations/enemyInformation");

//戦闘周りの処理 戦闘突入に伴うスタミナ減少，戦闘，戦闘後の各種獲得処理，レベルアップ，レベルアップに伴う職業マスター処理をここに記述

battle.battleAgainstMonster = async function (user, enemy) {
    let stamina = usersPeripheral.calculateStamina(user.lastBattleDate);
    user.lastBattleDate = (utility.getTime() - (stamina - configuration.vsMonsterStamina) * 1000);
    return await this.battleRoutine(user, enemy, 0);
};

battle.battleAgainstPlayer = async function (user, enemy) {
    let stamina = usersPeripheral.calculateStamina(user.lastBattleDate);
    user.lastBattleDate = (utility.getTime() - (stamina - configuration.vsChampionStamina) * 1000);
    return await this.battleRoutine(user, enemy, 1);
};

battle.battleAgainstChampion = async function (user, enemy) {
    return await this.battleRoutine(user, enemy, 2);
};

battle.goLegendPlace = async function (user) {
    let stamina = usersPeripheral.calculateStamina(user.lastBattleDate);
    user.lastBattleDate = (utility.getTime() - (stamina - configuration.vsMonsterStamina) * 1000);
    let enemy = enemyInformation.legendPlace[user.beingLegendPlace][user.legendPlaceProgress];
    let result = await this.battleRoutine(user, enemy, 0);

    let isFinished = result === "lose" || result === "draw" || (result === "win" && user.beingLegendPlace === -1 && user.legendPlaceProgress === 0);

    return isFinished;


}


battle.returnMessage = "";

//戦闘処理
battle.battleRoutine = async function (user, enemy, kind) {
    let _user = JSON.parse(JSON.stringify(user));
    let _enemy = JSON.parse(JSON.stringify(enemy));
    _user.weapon = JSON.parse(JSON.stringify(usersPeripheral.getWeaponByIndex(user.weapon)));
    _user.armor = JSON.parse(JSON.stringify(usersPeripheral.getWeaponByIndex(user.armor)));
    _user.accessory = JSON.parse(JSON.stringify(usersPeripheral.getWeaponByIndex(user.accessory)));
    _enemy.artsEffect = enemy.artsEffect; //関数だけJSON.stringifyの範囲外なので改めて追加
    console.log(_enemy.artsEffect);
    console.log(enemy.artsEffect);
    console.log(_user.weapon)
    console.log(usersPeripheral.getWeaponByIndex(user.weapon));
    console.log(_user);
    console.log(_enemy);

    this.returnMessage = "";
    if (kind === 0) { //モンスター戦
        _enemy.currentHP = _enemy.maxHP;
        let turn = 1;
        let result = "";
        console.log("ユーザの戦術番号:"+_user.setArts)
        while (_user.currentHP > 0 && _enemy.currentHP > 0) {
            _enemy.receiveDamage = 0; 
            _enemy.damageCutPercentage = 0.0; 
            _enemy.recoverHP = 0; 
            _enemy.evasiveness = enemy.evasive; 
            _enemy.currentHP = Math.min(_enemy.maxHP, _enemy.currentHP);
            _user.receiveDamage = 0;
            _user.damageCutPercentage = 0.0; //ユーザのダメージ軽減率
            _user.evasiveness = 50;
            _user.receiveElement = "";
            _user.currentHP = Math.min(_user.maxHP, _user.currentHP);
    
            this.returnMessage += turn + "ターン目:<br>";
            this.returnMessage += _user.name + ":" + _user.currentHP + "/" + _user.maxHP + "VS" + _enemy.name + ":" + _enemy.currentHP + "/" + _enemy.maxHP + "<br>";
            let receiveData = {};
            let enemyReceiveData = {};

            receiveData = invokeUserArts(_user,_enemy);
            enemyReceiveData = invokeEnemyArts(_user, _enemy);
            accessoryReceiveData = invokeUserAccessoryEffect(_user, _enemy);            

            _enemy.currentHP -= Math.ceil(_enemy.receiveDamage * Math.ceil(1 - _enemy.damageCutPercentage));
            this.returnMessage += _user.name + "は"+_user.weapon.name+"で攻撃!"+receiveData.message+_enemy.name + "に" + _enemy.receiveDamage + "ダメージを与えた<br>";
            _user.currentHP -= Math.ceil(_user.receiveDamage*Math.ceil(1-_user.damageCutPercentage));
            this.returnMessage += _enemy.name + "が襲い掛かった！" + enemyReceiveData.message + _user.name + "は" + _user.receiveDamage + "ダメージ受けた<br>";
            this.returnMessage += "<br>";
            turn++;
            if (turn > configuration.turnLimit) {
                break;
            }
        }

        if (_enemy.currentHP <= 0) {
            this.returnMessage += user.name+"は戦闘に勝利した！！";
            this.win(user, enemy);
            result = "win";
        } else if (_user.currentHP <= 0) {
            this.returnMessage += "敗北した．．．";
            this.lose(user, enemy);   
            result = "lose";
        } else {
            this.returnMessage += "逃げ出した...♪";
            this.draw(user, enemy);
            result = "runAway"
        }
        user.currentHP = _user.currentHP;
        if (user.currentHP <= 0) {
            user.currentHP = user.maxHP;
        }
        await usersPeripheral.writeUser(user);
        console.log("戦闘後ファイル書き換え完了");
        return result;
    } else if (kind === 2 || kind === 1) { //対人戦
        _enemy.weapon = JSON.parse(JSON.stringify(usersPeripheral.getWeaponByIndex(enemy.weapon)));
        _enemy.armor = JSON.parse(JSON.stringify(usersPeripheral.getWeaponByIndex(enemy.armor)));
        _enemy.accessory = JSON.parse(JSON.stringify(usersPeripheral.getWeaponByIndex(enemy.accessory)));
        let turn = 1;
        while (_user.currentHP > 0 && _enemy.currentHP > 0) {
            _enemy.currentHP = Math.min(_enemy.currentHP, _enemy.maxHP);
            _enemy.receiveDamage = 0;//敵が受けるダメージ
            _enemy.damageCutPercentage = 0.0;//敵が受けるダメージの軽減率
            _enemy.recoverHP = 0;//敵のHPの回復量(基本は0)
            _enemy.evasiveness = enemy.evasive; //敵の回避率
            _enemy.weaponRatio = 1.0;
            _user.currentHP = Math.min(_user.currentHP, _user.maxHP);
            _user.receiveDamage = 0; //ユーザの受けるダメージ
            _user.damageCutPercentage = 0.0; //ユーザのダメージ軽減率
            _user.evasiveness = 50; //ユーザの回避率
            _user.recoverHP = 0;
            _user.weaponRatio = 1.0;

            this.returnMessage += turn + "ターン目:<br>";
            this.returnMessage += _user.name + ":" + _user.currentHP + "/" + _user.maxHP + "VS " + _enemy.name + ":" + _enemy.currentHP + "/" + _enemy.maxHP + "<br><br>";
            let receiveData = {};
            let enemyReceiveData = {};

            receiveData = invokeUserArts(_user, _enemy);
            console.log(receiveData);
            enemyReceiveData = invokeUserArts(_enemy, _user);
            accessoryReceiveData = invokeUserAccessoryEffect(_user, _enemy);
            _enemy.currentHP -= Math.ceil(_enemy.receiveDamage * Math.ceil(1 - _enemy.damageCutPercentage));
            console.log(_enemy.receiveDamage);
            console.log(_user.receiveDamage)
            this.returnMessage += _user.name + "は" + _user.weapon.name + "で攻撃!" + receiveData.message + _enemy.name + "に" + _enemy.receiveDamage + "ダメージを与えた<br><br>";
            _user.currentHP -= Math.ceil(_user.receiveDamage * Math.ceil(1 - _user.damageCutPercentage));
            this.returnMessage += _enemy.name + "は" + _enemy.weapon.name + "で攻撃！" + enemyReceiveData.message + _user.name + "は" + _user.receiveDamage + "ダメージ受けた<br><br>";
            this.returnMessage += "<br>";
            turn++;
            if (turn > configuration.turnLimit) {
                break;
            }
        }
        if (kind === 2) {
            user.currentHP = _user.currentHP;
            if (user.currentHP <= 0)
                user.currentHP = user.maxHP;
            enemy.currentHP = _enemy.currentHP;
            if (_user.currentHP > 0 && _enemy.currentHP <= 0) {
                this.returnMessage += user.name + "は戦闘に勝利した！！";
                result = "win"
                await this.winChampion(user, enemy);
            } else if (_user.currentHP <= 0 && _enemy.currentHP <= 0) {
                user.currentHP = 1;
                result = "draw";
                this.returnMessage += user.name + "は"+ enemy.name +"と相打ちした！";
                await this.drawChampion(user, enemy);
            } else if (turn > configuration.turnLimit) {
                this.returnMessage += enemy.name + "との決着がつかなかった．．．";
                result = "timeUp";
                await this.timeUpChampion(user, enemy);
            } else {
                this.returnMessage += "敗北した．．．";
                result = "lose";
                await this.loseChampion(user, enemy);
            }
        }
        await usersPeripheral.writeUser(user);
        return result;
    }
};
//プレイヤーの戦術発動
invokeUserArts = function (user, enemy) {
    let receiveData = {};
    if (usersPeripheral.getArtsOfUser(user).invocationRate > utility.random(0, 99)) {
        console.log("戦術発動");
        receiveData = usersPeripheral.getArtsOfUser(user).effect(user, enemy);            
    } else {
        console.log("戦術不発");
        receiveData = usersPeripheral.getArtsById(0).effect(user,enemy);
    }

    return receiveData;
}

//敵戦術効果発動
invokeEnemyArts = function (user, enemy) {
    let enemyReceiveData = {};
    if (enemy.artsActivation > utility.random(0, 99)) {
        console.log("敵戦術発動");
        enemyReceiveData = enemy.artsEffect(user, enemy);
    } else {
        console.log("敵戦術不発")
        enemyReceiveData = enemyArtsEffect.none(user, enemy);
    }

    return enemyReceiveData;
}

//アクセサリ効果発動
invokeUserAccessoryEffect = function (user, enemy) {
    let accessoryReceiveData = {};
    if (user.accessory.invocationRate > utility.random(0, 99)) {
        console.log("アクセサリ効果発動");
        accessoryReceiveData = user.accessory.accessoryEffect(user, enemy);
    } else {
        console.log("アクセサリ効果不発");
        accessoryReceiveData = accessoryEffect.none(user, enemy);
    }

    return accessoryReceiveData;
}

//経験値入手処理
battle.getExp = function(user, amount){
    user.exp += amount;
    this.returnMessage += user.name + "は" + amount + "経験値を獲得．";
    this.levelup(user);
}

//レベルアップ処理
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
        if(user.itemInventory[index] > 0)
            itemInformation.itemList[index].itemEffect(user,enemy);
    });
}

battle.win = function (user, enemy) {
    user.money += enemy.dropMoney;
    this.getExp(user, enemy.exp);
    this.returnMessage += enemy.dropMoney + "C入手した．";

    if (user.beingLegendPlace >= 0) {  //レジェンドプレイス挑戦時の処理
        user.legendPlaceProgress += 1;
        if (user.legendPlaceProgress === enemyInformation.legendPlace[user.beingLegendPlace].length) {
            user.legendPlaceProgress = 0;
            user.beingLegendPlace = -1;
            if (user.degree <= user.beingLegendPlace) {
                user.degree += 1;
                this.returnMessage += "<h1>" + user.name + "はレジェンドプレイスを攻略した！！！称号が" + configuration.degree[user.degree] + "になった！！！</h1>"
            } else {
                this.returnMessage += "<h1>" + user.name + "はレジェンドプレイスを攻略した！！！";
            }
        }
    }
};

battle.lose = function(user,enemy){
    user.money /= 10;
    user.money = parseInt(user.money);
    this.getExp(user, 1);
    user.beingLegendPlace = -1;
    user.legendPlaceProgress = 0;
};

battle.draw = function (user, enemy) {
    this.getExp(user, Math.ceil(enemy.exp / 2));
    console.log(user);
    user.beingLegendPlace = -1;
    user.legendPlaceProgress = 0;
};

battle.winChampion = async function (user, enemy) {
    this.getExp(user, enemy.level * 30);
    let writeUser = JSON.parse(JSON.stringify(user));
    writeUser.winningStreak = 1;
    writeUser.lastChallengerName = enemy.name;
    writeUser.lastChallengerHomePageName = enemy.homePageName;
    writeUser.lastChallengerHomePageURL = enemy.homePageURL;
    await usersPeripheral.writeChampion(writeUser);
}

battle.loseChampion = async function (user, enemy) {
    this.getExp(user, Math.ceil(enemy.level / 2));
    enemy.winningStreak += 1;
    enemy.lastChallengerName = user.name;
    enemy.lastChallengerHomePageName = user.homePageName;
    enemy.lastChallengerHomePageURL = user.homePageName;
    await usersPeripheral.writeChampion(enemy);
}

battle.timeUpChampion = async function (user, enemy) {
    this.getExp(user, Math.ceil(enemy.level * 5));
    enemy.winningStreak += 1;
    enemy.lastChallengerName = user.name;
    enemy.lastChallengerHomePageName = user.homePageName;
    enemy.lastChallengerHomePageURL = user.homePageName;
    await usersPeripheral.writeChampion(enemy);
}

battle.drawChampion = async function (user, enemy) {
    this.getExp(user, Math.ceil(enemy.level * 10));
    writeUser.winningStreak = 1;
    writeUser.lastChallengerName = enemy.name;
    writeUser.lastChallengerHomePageName = enemy.homePageName;
    writeUser.lastChallengerHomePageURL = enemy.homePageURL;
    await usersPeripheral.writeChampion(user);
}

battle.jobMaster = function (user) {
    user.artsInventory = user.artsInventory.concat(usersPeripheral.getJobElementOfUser(user).masterArts);
    user.career[usersPeripheral.getJobElementOfUser(user).id] = user.jobLevel;
}

module.exports = battle;