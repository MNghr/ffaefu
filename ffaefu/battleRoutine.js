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
const formatter = new Intl.NumberFormat('ja-JP');

//戦闘周りの処理 戦闘突入に伴うスタミナ減少，戦闘，戦闘後の各種獲得処理，レベルアップ，レベルアップに伴う職業マスター処理をここに記述

battle.battleAgainstMonster = async function (user, difficulty) {
    let enemy = enemyInformation.vsMonster[difficulty][utility.random(0, enemyInformation.vsMonster[difficulty].length - 1)];
    user.vsMonsterLevel = difficulty;
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

    let isFinished = result === "lose" || result === "runAway" || (result === "win" && user.beingLegendPlace === -1 && user.legendPlaceProgress === 0);

    return isFinished;


}

battle.enemy;

battle.returnMessage = "";

//戦闘処理
battle.battleRoutine = async function (user, enemy, kind) {
    let _user = JSON.parse(JSON.stringify(user));
    let _enemy = JSON.parse(JSON.stringify(enemy));
    _user.weaponRatio = 1.0;
    _user.armorRatio = 1.0;
    _enemy.artsSealed = false;
    _user.artsSealed = false;
    

    loadEnemy(_enemy, enemy);
    loadArmor(_user, user);
    loadWeapon(_user, user);
    loadAccessory(_user, user);

    _user.gainMoney = 0;
    
    console.log(_enemy.artsEffect);
    console.log(enemy.artsEffect);
    console.log(_user.weapon)
    console.log(usersPeripheral.getAccessoryByIndex(user.weapon));
    console.log(_user);
    console.log(_enemy);


    this.returnMessage = "";
    let result = "";
    if (kind === 0) { //モンスター戦
        _enemy.currentHP = _enemy.maxHP;
        _enemy.element = "monster";
        
        let turn = 1;

        console.log("ユーザの戦術番号:"+_user.setArts)
        while (_user.currentHP > 0 && _enemy.currentHP > 0) {
            turnStartVsMonster(_user, _enemy);
            
            battle.returnMessage += turn + "ターン目:<br>";
            battle.returnMessage += _user.name + ":" + _user.currentHP + "/" + _user.maxHP + "VS" + _enemy.name + ":" + _enemy.currentHP + "/" + _enemy.maxHP + "<br>";

            let receiveData = invokeUserArts(_user,_enemy);
            let enemyReceiveData = invokeEnemyArts(_user, _enemy);
            let receiveDataDelayed = invokeUserArtsDelayed(_user,_enemy)
            let accessoryReceiveData = invokeUserAccessoryEffect(_user, _enemy); 
            let itemReceiveData = invokeCombatItemsEffect(_user, _enemy); 
            
            let userRecover = shapeHPRecover(_user, _user.recoverHP);
            let enemyRecover = shapeHPRecover(_enemy, _enemy.recoverHP);

            let userDodgeData = playerDodgeFromEnemy(_user,_enemy); 
            let enemyDodgeData = enemyDodge(_user, _enemy);
            
            let jobBonusData = jobBonus(_user, _enemy);

            affectArmorDefence(_user, _enemy);
            processDamage(_user, _enemy);
    
            this.returnMessage += _user.name + "は" + _user.weapon.name + "で攻撃！<br>" + receiveData.message + "<br>" + receiveDataDelayed.message + accessoryReceiveData.message + enemyDodgeData.message + _enemy.name + "に" + _enemy.receiveDamage + "ダメージを与えた。" + userRecover + "<br><br>";
            this.returnMessage += _enemy.name + "が襲い掛かった！<br>" + enemyReceiveData.message + "<br>"+itemReceiveData.message+userDodgeData.message+_user.name + "は" + _user.receiveDamage + "ダメージ受けた。"+enemyRecover+"<br>";
            this.returnMessage += "<br>";

            this.returnMessage += invokePhaseZeroItemsEffect(_user,_enemy).message;
            turn++;
            if (turn > configuration.turnLimit) {
                break;
            }
        }

        user.itemInventory = JSON.parse(JSON.stringify(_user.itemInventory));

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
        
        delete user.vsMonsterLevel;
        await usersPeripheral.writeUser(user);
        console.log("戦闘後ファイル書き換え完了");
    } else if (kind === 2 || kind === 1) { //対人戦

        loadWeapon(_enemy, enemy);
        loadArmor(_enemy, enemy);
        loadAccessory(_enemy, enemy);
        _enemy.armorRatio = 1.0;
        _enemy.weaponRatio = 1.0;

        let turn = 1;
        while (_user.currentHP > 0 && _enemy.currentHP > 0) {
            turnStartVsPlayer(_user, _enemy);
            
            this.returnMessage += _user.name + ":" + _user.currentHP + "/" + _user.maxHP + "VS " + _enemy.name + ":" + _enemy.currentHP + "/" + _enemy.maxHP + "<br><br>";

            let receiveData = invokeUserArts(_user, _enemy);
            let enemyReceiveData = invokeUserArts(_enemy, _user);
            let receiveDataDelayed = invokeUserArtsDelayed(_user, _enemy);
            let enemyReceiveDataDlayed = invokeUserArtsDelayed(_enemy, _user);
            let accessoryReceiveData = invokeUserAccessoryEffect(_user, _enemy);
            let enemyAccessoryReceiveData = invokeUserAccessoryEffect(_enemy, _user);

            let userRecover = shapeHPRecover(_user, _user.recoverHP);
            let enemyRecover = shapeHPRecover(_enemy, _enemy.recoverHP);

            let userDodgeData = playerDodgeFromPlayer(_user,_enemy); 
            let enemyDodgeData = playerDodgeFromPlayer(_enemy, _user);

            affectArmorDefence(_user, _enemy);
            affectArmorDefence(_enemy, _user);

            processDamage(_user, _enemy);

            this.returnMessage += _user.name + "は" + _user.weapon.name + "で攻撃!<br>" + receiveData.message + "<br>" + receiveDataDelayed.message+accessoryReceiveData.message+enemyDodgeData.message+_enemy.name + "に" + _enemy.receiveDamage + "ダメージを与えた。"+userRecover+"<br><br>";
            this.returnMessage += _enemy.name + "は" + _enemy.weapon.name + "で攻撃！<br>" + enemyReceiveData.message + "<br>" + enemyReceiveDataDlayed.message+enemyAccessoryReceiveData.message+userDodgeData.message+_user.name + "は" + _user.receiveDamage + "ダメージ受けた。"+enemyRecover+"<br><br>";
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
    }
    
    return result;
};

let turnStartVsPlayer = (user, enemy)=>{
    enemy.receiveDamage = 0; 
    enemy.recoverHP = 0; 
    enemy.evasiveness = configuration.calculateNaturalEvasive(enemy) + enemy.accessory.evasiveBias;
    enemy.accuracy = configuration.calculateNaturalAccuracy(enemy) + enemy.accessory.accuracyBias;
    enemy.currentHP = Math.min(enemy.maxHP, enemy.currentHP);
    enemy.armor.defence = Math.ceil(enemy.armorRatio * enemy.entityArmor.defence());
    enemy.receiveAdditionalDamage = 0;
    enemy.weapon.attack = Math.ceil(enemy.weaponRatio * enemy.entityWeapon.attack());
    enemy.attack = calculateAttack(enemy);
    enemy.receiveAdditionalDamage = 0;
    user.receiveDamage = 0;
    user.evasiveness = configuration.calculateNaturalEvasive(user)  + user.accessory.evasiveBias;
    user.accuracy = configuration.calculateNaturalAccuracy(user) + user.accessory.accuracyBias;
    user.armor.defence = Math.ceil(user.armorRatio * user.entityArmor.defence());
    user.currentHP = Math.min(user.maxHP, user.currentHP);
    user.recoverHP = 0;
    user.weapon.attack = Math.ceil(user.weaponRatio * user.entityWeapon.attack());
    user.attack = calculateAttack(user);
    user.artsActivated = false;
    enemy.artsActivated = false;
    user.receiveAdditionalDamage = 0;
}

let loadEnemy = (enemy, metaphysicalEnemy) => {
    enemy.artsEffect = metaphysicalEnemy.artsEffect; 
    battle.enemy = enemy;
}

let loadAccessory = (user, sessionUser) => {
    user.accessory = JSON.parse(JSON.stringify(usersPeripheral.getAccessoryByIndex(sessionUser.accessory)));
    user.accessory.effect = usersPeripheral.getAccessoryByIndex(sessionUser.accessory).effect;
}

let loadArmor = (user, sessionUser)=>{
    user.armor = JSON.parse(JSON.stringify(usersPeripheral.getArmorByIndex(sessionUser.armor)));
    user.entityArmor = JSON.parse(JSON.stringify(usersPeripheral.getArmorByIndex(sessionUser.armor)));
    user.entityArmor.defence = usersPeripheral.getArmorByIndex(sessionUser.armor).defence;
}

let loadWeapon = (user,sessionUser) => {
    user.weapon = JSON.parse(JSON.stringify(usersPeripheral.getWeaponByIndex(sessionUser.weapon)));
    user.entityWeapon = JSON.parse(JSON.stringify(usersPeripheral.getWeaponByIndex(sessionUser.weapon)));
    user.entityWeapon.attack = usersPeripheral.getWeaponByIndex(sessionUser.weapon).attack;
}

let processDamage = (user,enemy) => {
    enemy.currentHP -= Math.ceil(enemy.receiveDamage);
    enemy.currentHP -= enemy.receiveAdditionalDamage;
    enemy.currentHP += enemy.recoverHP;
    user.currentHP -= Math.ceil(user.receiveDamage);
    user.currentHP += user.recoverHP;
}

let turnStartVsMonster = (user, enemy) => {
    enemy.receiveDamage = 0; 
    enemy.recoverHP = 0; 
    enemy.evasiveness = enemy.evasive; 
    enemy.currentHP = Math.min(enemy.maxHP, enemy.currentHP);
    enemy.receiveAdditionalDamage = 0;
    enemy.attack = enemy.basicAttack + utility.random(1, enemy.oscillation);
    user.receiveDamage = 0;
    user.evasiveness = user.agility / 20 + user.accessory.evasiveBias;
    user.accuracy = user.dexterity / 10 + 51 + user.accessory.accuracyBias;
    user.receiveElement = "";
    user.armor.defence = Math.ceil(user.armorRatio * user.entityArmor.defence());
    user.currentHP = Math.min(user.maxHP, user.currentHP);
    user.recoverHP = 0;
    user.weapon.attack = Math.ceil(user.weaponRatio * user.entityWeapon.attack());
    user.attack = calculateAttack(user);
    user.artsActivated = false;
    enemy.artsActivated = false;
    user.receiveAdditionalDamage = 0;
}

let affectArmorDefence=(user,enemy)=>{
    user.receiveDamage -= user.armor.defence
    user.receiveDamage = Math.max(0,user.receiveDamage);
}


let jobBonus = (user, enemy) => {
    let returnData = {message:""};
    if (user.job > 17) {
        user.receiveDamage = Math.floor(user.receiveDamage/4);
        Math.floor(user.receiveDamage);
    } else if (user.job > 7){
        user.receiveDamage = Math.floor(user.receiveDamage/2);
        Math.floor(user.receiveDamage);
    }
    return returnData;
    //君はここに各職業の得られるボーナスを追加してここで実行してもいいし，しなくてもいい
}

//プレイヤーがNPCの攻撃をよける処理
let playerDodgeFromEnemy = (user, enemy)=>{
    let returnData = { message: "" };
    console.log(user.evasiveness)
    if (utility.random(1,Math.ceil(user.evasiveness)) > utility.random(0,100)) {
        returnData.message += user.name + "は身をかわした！";
        user.receiveDamage = 0;
    }

    return returnData;
}

//プレイヤーが相手プレイヤーの攻撃をよける処理
let playerDodgeFromPlayer = (user, enemy) => {
    let returnData = { message: "" };
    user.evasiveness -= (enemy.accuracy + enemy.accessory.accuracyBias);
    if (utility.random(1, Math.ceil(user.evasiveness)) > utility.random(1,100)){
        returnData.message += user.name + "は身をかわした！";
        user.receiveDamage = 0;
    }
    return returnData;
}

//NPCがプレイヤーの攻撃をよける処理
let enemyDodge = (user, enemy) => {
    returnData = { message: "" };
    enemy.evasiveness -= user.accuracy;
    if (utility.random(1,Math.ceil(enemy.evasiveness)) > utility.random(1,100)) {
        returnData.message += enemy.name + "は身をかわした！";
        enemy.receiveDamage = 0;
    }
    return returnData;
}


//プレイヤーの戦術発動
let invokeUserArts = function (user, enemy) {
    let receiveData = {};
    if (usersPeripheral.getArtsOfUser(user).invocationRate > utility.random(0, 99) || configuration.isDebugMode === true) {
        user.artsActivated = true;
        console.log("戦術発動");
        receiveData = usersPeripheral.getArtsOfUser(user).effect.immediateEffect(user,enemy);            
    } else {
        console.log("戦術不発");
        receiveData = usersPeripheral.getArtsById(0).effect.immediateEffect(user,enemy);
    }

    return receiveData;
}

let invokeUserArtsDelayed = function (user, enemy) {
    let receiveData = {};
    if (user.artsActivated === true) {
        receiveData = usersPeripheral.getArtsOfUser(user).effect.delayedEffect(user, enemy);
    } else {
        receiveData = usersPeripheral.getArtsById(0).effect.delayedEffect(user, enemy);
    }

    return receiveData;
}

//敵戦術効果発動
let invokeEnemyArts = function (user, enemy) {
    let enemyReceiveData = {};
    if (enemy.artsActivation > utility.random(0, 99) || configuration.isDebugMode === true) {
        console.log("敵戦術発動");
        enemyReceiveData = enemy.artsEffect(user, enemy);
    } else {
        console.log("敵戦術不発")
        enemyReceiveData = enemyArtsEffect.none(user, enemy);
    }

    return enemyReceiveData;
}

//アクセサリ効果発動
let invokeUserAccessoryEffect = function (user, enemy) {
    let accessoryReceiveData = {};
    if (user.accessory.invocationRate > utility.random(0, 99) || configuration.isDebugMode === true) {
        console.log("アクセサリ効果発動");
        accessoryReceiveData = user.accessory.effect(user, enemy);
        accessoryReceiveData.message += "<br>";
    } else {
        console.log("アクセサリ効果不発");
        accessoryReceiveData = accessoryEffect.none(user, enemy);
    }

    return accessoryReceiveData;
}

//経験値入手処理
battle.getExp = function(user, amount){
    user.exp += amount;
    this.returnMessage += user.name + "は" + formatter.format(amount) + "経験値を獲得．";
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
    while (configuration.requiredExperience(user) <= user.exp) {
        user.exp -= configuration.requiredExperience(user);
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

let invokeCombatItemsEffect = function (user, enemy) {
    let returnData = {};
    returnData.message = "";
    user.itemInventory.forEach((element, index) => {
        if (element > 0 && itemInformation.itemList[index].kind === "combat") {
            let ret = itemInformation.itemList[index].effect(user, enemy);
            console.log(ret);
            returnData.message += ret.message;
            user.itemInventory[index] -= ret.spentAmount;
        }
    });
    console.log(user.itemInventory);
    if (returnData.message !== "") {
        returnData.message += "<br>"
    }
    return returnData;
}

let invokePhaseZeroItemsEffect = function (user, enemy) {
    let returnData = {};
    returnData.message = "";
    user.itemInventory.forEach((element, index) => {
        if (element > 0 && itemInformation.itemList[index].kind === "phaseZero") {
            let ret = itemInformation.itemList[index].effect(user, enemy);
            console.log(ret);
            returnData.message += ret.message;
            user.itemInventory[index] -= ret.spentAmount;
        }
    });
    console.log(user.itemInventory);
    if (returnData.message !== "") {
        returnData.message += "<br>"
    }
    return returnData;
}

battle.win = function (user, enemy) {
    let getMoney = Math.floor(enemy.dropMoney * Math.random() * 10);
    user.money += getMoney;
    user.money = Math.min(user.money, configuration.maxMoney);
    this.getExp(user, enemy.exp);
    this.returnMessage += formatter.format(getMoney) + "C入手した．";

    if (user.beingLegendPlace >= 0) {  //レジェンドプレイス挑戦時の処理
        user.legendPlaceProgress += 1;
        if (user.legendPlaceProgress === enemyInformation.legendPlace[user.beingLegendPlace].length) {
            user.legendPlaceProgress = 0;
            if (user.degree <= user.beingLegendPlace) {
                user.degree += 1;
                this.returnMessage += "<h1>" + user.name + "はレジェンドプレイスを攻略した！！！称号が" + configuration.degree[user.degree] + "になった！！！</h1>"
            } else {
                this.returnMessage += "<h1>" + user.name + "はレジェンドプレイスを攻略した！！！";
            }
            user.beingLegendPlace = -1;
        }
    } else {
        if(configuration.itemDropRate < utility.random(1,100) || configuration.isDebugMode === true)
            itemDrop(user);
    }
    console.log(user.itemInventory);
};

let itemDrop = function (user) {
    let dropItem = configuration.vsMonsterDropItem[user.vsMonsterLevel][utility.random(0, configuration.vsMonsterDropItem[user.vsMonsterLevel].length-1)];
    user.itemInventory[dropItem] += 1;
    user.itemInventory[dropItem] = Math.min(user.itemInventory[dropItem], configuration.maxItem);
    battle.returnMessage += "<br>" +  itemInformation.itemList[dropItem].name + "を拾った．";
    return;
}


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
    let writeUser = JSON.parse(JSON.stringify(user));
    writeUser.currentHP = 1;
    writeUser.winningStreak = 1;
    writeUser.lastChallengerName = enemy.name;
    writeUser.lastChallengerHomePageName = enemy.homePageName;
    writeUser.lastChallengerHomePageURL = enemy.homePageURL;
    await usersPeripheral.writeChampion(writeUser);
}

battle.jobMaster = function (user) {
    user.artsInventory = user.artsInventory.concat(usersPeripheral.getJobElementOfUser(user).masterArts);
    user.career[usersPeripheral.getJobElementOfUser(user).id] = user.jobLevel;
}

let phaseZero = function (user,enemy) {
    invokePhaseZeroItemsEffect(user,enemy);
}

let soldierAttack = (user) => user.weapon.attack + user.power;
let mageAttack = (user) => user.weapon.attak + user.mana;
let priestAttack = (user) => user.weapon.attack + user.religion;
let thiefAttack = (user) => user.weapon.attack + user.dexterity;
let soilmancerAttack = (user) => user.weapon.attack + user.mana;
let roilmageAttack = (user) => user.weapon.attack + user.mana;
let bardAttack = (user) => user.weapon.attack + user.mana + user.charm;
let blagueurAttack = (user) => user.power + user.mana + user.religion + user.dexterity + user.agility + user.vitality + user.charm + user.karma;
let summonerAttack = (user) => user.weapon.attack + user.mana + user.charm;
let dragoonAttack = (user) => user.weapon.attack + user.power + user.dexterity;
let bishopAttack = (user) => user.weapon.attack + user.mana + user.religion;
let knightAttack = (user) => user.weapon.attack + user.power + user.religion;
let samuraiAttack = (user) => user.weapon.attack + user.power + user.mana;
let monkAttack = (user) => user.power + user.vitality;
let ninjaAttack = (user) => user.weapon.attack + user.power + user.agility;
let darkKnightAttack = (user) => user.weapon.attack + user.power + user.mana;
let mageWarriorAttack = (user) => user.weapon.attack + user.power + user.mana;
let mercenaryAttack = (user) => user.weapon.attack + user.power + user.agility;
let tamerAttack = (user) => user.weapon.attack + user.power + user.mana + user.religion + user.vitality + user.agility + user.dexterity + user.charm + user.karma;
let emperorAttack = (user) => user.weapon.attack + user.power + user.mana + user.religion + user.vitality + user.agility + user.dexterity + user.charm + user.karma;
let paladinAttack = (user) => user.weapon.attack + user.power + user.mana + user.religion + user.vitality + user.agility + user.dexterity + user.charm + user.karma;
let augurAttack = (user) => user.weapon.attack + user.power + user.mana + user.religion + user.vitality + user.agility + user.dexterity + user.charm + user.karma;
let administratorAttack = (user) => user.weapon.attack + user.power + user.mana + user.religion + user.vitality + user.agility + user.dexterity + user.charm + user.karma;
let onionSwordianAttack = (user) => user.weapon.attack + user.power;
let assassinAttack = (user) => user.weapon.attack + user.power + user.mana + user.religion + user.vitality + user.agility + user.dexterity + user.charm + user.karma;
let monsterTamerAttack = (user) => user.weapon.attack + user.power + user.mana + user.religion + user.vitality + user.agility + user.dexterity + user.charm + user.karma;
let sageAttack = (user) => user.weapon.attack + user.power + user.mana + user.religion + user.vitality + user.agility + user.dexterity + user.charm + user.karma;
let masterValorAttack = (user) => user.weapon.attack + user.power + user.mana + user.religion + user.vitality + user.agility + user.dexterity + user.charm + user.karma;
let arcanistAttack = (user) => user.weapon.attack + user.power + user.mana + user.religion + user.vitality + user.agility + user.dexterity + user.charm + user.karma;
let braveAttack = (user) => user.weapon.attack + user.power + user.mana + user.religion + user.vitality + user.agility + user.dexterity + user.charm + user.karma;
let grandMasterAttack = (user) => user.weapon.attack + user.power + user.mana + user.religion + user.vitality + user.agility + user.dexterity + user.charm + user.karma;

let calculateAttackTable = [
    soldierAttack,
    mageAttack,
    priestAttack,
    thiefAttack,
    soilmancerAttack,
    roilmageAttack,
    bardAttack,
    blagueurAttack,
    summonerAttack,
    dragoonAttack,
    bishopAttack,
    knightAttack,
    samuraiAttack,
    monkAttack,
    ninjaAttack,
    darkKnightAttack,
    mageWarriorAttack,
    mercenaryAttack,
    tamerAttack,
    emperorAttack,
    paladinAttack,
    augurAttack,
    administratorAttack,
    onionSwordianAttack,
    assassinAttack,
    monsterTamerAttack,
    sageAttack,
    masterValorAttack,
    arcanistAttack,
    braveAttack,
    grandMasterAttack
];

//攻撃力計算
let calculateAttack = function (user) {
    return calculateAttackTable[user.job](user);
};

//HP回復・ライフロス表示作成
let shapeHPRecover = (agent, amount) => {
    if (amount > 0) {
        return '<span class="hpRecover">' + agent.name + "のHPが" + amount + "回復した♪</span>"
    } else if (amount < 0) {
        return '<span class="hpLose">' + agent.name + "は" + Math.abs(amount) + "のライフロス！！</span>"
    } else {
        return "";
    }
};

module.exports = battle;