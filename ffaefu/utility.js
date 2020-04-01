let fs = require("fs").promises;
let utility = {};
let weaponInformation = require("./informations/weaponInformation.js");
let armorInformation = require("./informations/armorInformation.js");
let accessoryInformation = require("./informations/accessoryInformation.js");
let artsInformation = require("./informations/artsInformation.js");
let jobInformation = require("./informations/jobInformation.js");

utility.random = function (min, max) {
    if (min > max) {
        let tmp = min;
        min = max;
        max = tmp;
    }
    let ret = Math.ceil(Math.random() * (max - min + 1) + min - 1);
    return ret;
}

utility.deposit = function(user,amount) {
    if (user.money < amount)
        return;    
    user.money -= amount;
    user.bank += amount;
    this.writeUser(user);
}

utility.fullDeposit = function(user) {
    let amount = user.money;
    this.deposit(user, amount);    
}

utility.withdraw = function (user, amount) {
    console.log(amount);
    amount = Math.min(amount, user.bank);
    user.bank -= amount;
    user.money += amount;
    this.writeUser(user);
}

utility.fullWithdraw = function(user) {
    let amount = 0;
    amount = Math.min(user.bank, 1000000000000 - user.money);
    this.withdraw(user, amount);    
}

utility.readUser = async function (user) {
    let data = await fs.readFile('./database/userData/' + user.userId + "/"+user.userId+".json", "utf-8");
    user = { ...JSON.parse(data) };
    return user;
}

utility.readEquipInventory = async function(user){
    let equipInventory = JSON.parse(await fs.readFile('./database/userData/' + user.userId + "/equipmentInventory.json"));
    console.log(equipInventory);
    console.log("装備品倉庫読み込み完了")
    return equipInventory;
}

utility.readItemInventory = async function(user){
    let itemInventory = JSON.parse(await fs.readFile('./database/userData/' + user.userId + "/itemInventory.json"));
    console.log(itemInventory);
    console.log("道具倉庫読み込み完了")
    return itemInventory;
}

utility.readArtsInventory = async function (user) {
    let artsInventory = JSON.parse(await fs.readFile('./database/userData/' + user.userId + "/artsInventory.json"));
    console.log(artsInventory);
    console.log("戦術情報読み込み完了")
    return artsInventory;
}

utility.readCareer = async function (user) {
    let career= JSON.parse(await fs.readFile('./database/userData/' + user.userId + "/career.json"));
    console.log(career);
    console.log("職歴読み込み完了")
    return career;
}

utility.readAllDataOfUser = async function (user) {
    let kernelData =  this.readUser(user);
    //let equipInventory = this.readEquipInventory(user);
    //let itemInventory =  this.readItemInventory(user);
    //let artsInventory = this.readArtsInventory(user);
    //let career = this.readCareer(user);
    let userData = await Promise.all([kernelData])//, equipInventory, itemInventory, artsInventory,career]);

    return userData;
}

//ユーザ登録処理
utility.registerUser = async function (user) {
    await fs.mkdir('./database/userData/' + user.userId);
    let career = new Array(jobInformation.jobList.length);
    career.fill(0);
    career[user.job] = user.jobLevel;
    user.career = career;
    user.equipInventory = {};
    user.equipInventory.weapons = [];
    user.equipInventory.armors = [];
    user.equipInventory.accessories = [];
    user.itemInventory = [];
    user.artsInventory = [0];
    user.artsInventory = user.artsInventory.concat(this.getBasicArtsNumbersByUser(user));
    console.log(this.getBasicArtsNumbersByUser(user));
    console.log(user.artsInventory);
    
    await Promise.all([
        this.writeUser(user),
        //this.writeEquipInventory(user, []),
        //this.writeItemInventory(user, user.itemInventory),
        //this.writeArtsInventory(user, [0].concat(this.getBasicArtsNumbersByUser(user))),
        //this.writeCareer(user, career)
    ]);
}

utility.writeUser = async function(user) {
    await fs.writeFile('./database/userData/' + user.userId + "/"+user.userId+".json", JSON.stringify(user));
    console.log("ユーザファイル書き込み完了！");
}

utility.writeEquipInventory = async function (user,equipInventory) {
    await fs.writeFile('./database/userData/' + user.userId + "/equipmentInventory.json", JSON.stringify(equipInventory));
    console.log("ユーザの装備品情報書き込み完了");
}

utility.writeItemInventory = async function (user,itemInventory) {
    await fs.writeFile('./database/userData/' + user.userId + "/itemInventory.json", JSON.stringify(itemInventory));
    console.log("ユーザの道具情報書き込み完了");
}

utility.writeArtsInventory = async function (user, artsInventory) {
    await fs.writeFile('./database/userData/' + user.userId + "/artsInventory.json", JSON.stringify(artsInventory));
    console.log("ユーザの戦術情報書き込み完了");
}

utility.writeCareer = async function (user, career) {
    await fs.writeFile('./database/userData/' + user.userId + "/career.json", JSON.stringify(career));
    console.log("ユーザの戦術情報書き込み完了");
}

utility.writeAllDataOfUser = async function(user, equipmentInventory, itemInventory, artsInventory,career){
    await Promise.all([
        this.writeUser(user),
        //this.writeEquipInventory(user, equipmentInventory),
        //this.writeItemInventory(user, itemInventory),
        //this.writeArtsInventory(user, artsInventory),
        //this.writeCareer(user, career)
    ]);
}


utility.calculateAttack = function (user) {
    //職業や装備によって計算するところを今は力をそのまま返すことにする．
    return user.power;
}

utility.getDate = function () {
    let date = new Date();
    return date;
}

utility.getTime = function () {
    let date = new Date();
    return date.getTime();
}

utility.calculateStamina = function (lastBattleDate) {
    let now = new Date();
    return Math.min(600, Math.floor((now.getTime() - lastBattleDate)/1000));
}

utility.buyWeapon = function(user,targetWeapon){ 
    user.weapon = targetWeapon.id;
    user.money -= targetWeapon.value;
    this.writeUser(user);
}

utility.buyArmor = function (user,targetArmor) {
    user.armor = targetArmor.id;
    user.money -= targetArmor.value;
    this.writeUser(user);
}

utility.buyAccessory = function (user,targetAccessory) {
    user.accessory = targetAccessory.id;
    user.money -= targetAccessory.value;
    this.writeUser(user);
}

utility.getJobElementOfUser = function (user) {
    return jobInformation.jobList[user.job];
}

utility.getBasicArtsNumbers = function (job) {//対象の職業の基本技を得る
    let basicArts=[];
    job.basicArts.forEach(element => basicArts.push(element));
    return basicArts;
}

utility.getBasicArtsNumbersByUser= function (user){//ユーザの職業の基本技の番号を得る
    return this.getBasicArtsNumbers(this.getJobElementOfUser(user));
}

utility.isChangeable = function (user, job) {
    let isChangeable = false;
    if (   user.job != job.id
        && user.power >= job.powerRequired
        && user.mana >= job.manaRequired
        && user.religion >= job.religionRequired
        && user.vitality >= job.vitalityRequired
        && user.agility >= job.agilityRequired
        && user.dexterity >= job.dexterityRequired
        && user.charm >= job.charmRequired
        && user.karma >= job.karmaRequired
    ) {
        isChangeable = true;
    }
        return isChangeable;
}

utility.getChangeableJobs = function (user) {
    let changeableJobs = [];
    console.log(jobInformation.jobList);
    jobInformation.jobList.forEach(element => { 
        if (this.isChangeable(user,element)) {
            changeableJobs.push(element);
        }
    });
    return changeableJobs;
}

utility.getChangeableAndNotYetMasterJobs = function (user) {//未マスターかつ転職可能な職業を取得
    let changeableJobs = this.getChangeableJobs(user);
    let changeableAndNotYetMasterJobs = [];
    changeableJobs.forEach(element => {
        changeableAndNotYetMasterJobs.push(element);
    });
}

utility.changeJob = async function (user,targetJobId) {
    user.career[user.job] = user.jobLevel;
    if (user.jobLevel < 60) {//ジョブをマスターしてなければその職業の技を削除
        let removeArts = this.getBasicArtsNumbersByUser(user);
        console.log(removeArts);
        user.artsInventory = user.artsInventory.filter(function (element) {
            for (let i = 0; i < removeArts.length; ++i){
                if (element === removeArts[i]) {
                    return false;
                }
                return true;
            }
        });
        user.setArts = 0;
    }
    console.log(user.artsInventory);
    user.job = targetJobId;
    user.jobLevel = user.career[user.job];
    user.jobLevel = Math.max(user.jobLevel, 1);
    let addArts = this.getBasicArtsNumbersByUser(user);
    user.artsInventory = user.artsInventory.concat(addArts);
    user.artsInventory.sort(function (a, b) {
        if (a < b)
            return -1;
        if (a > b)
            return 1;
        return 0;
    });
    await this.writeUser(user);
    console.log(user.job);
    console.log(user.jobLevel);
    console.log(user.artsInventory);
}

utility.getChangeableArtsByArtsInventory = function(user){
    let changeableArts = [];
    console.log(user);
    console.log(artsInformation.artsList);
    user.artsInventory.forEach(element => {
        changeableArts.push(artsInformation.artsList[element]);
    });
    console.log(changeableArts);
    return changeableArts;
}

utility.getChangeableArts = function (user) {
    return this.getChangeableArtsByArtsInventory(user);
}

utility.getArtsByIndex = function (index) {
    return artsInformation.artsList[index];
}

utility.getArtsById = function (id) {
    console.log(artsInformation.artsList[id]);
    console.log("requestedid:" + id);
    console.log("artsInformation.artsList[id].id:"+artsInformation.artsList[id].id)
    if (artsInformation.artsList[id].id === id) {
        console.log("技のidと要求されたidが一致したのでそのまま返します");
        console.log(artsInformation.artsList[id]);
        return this.getArtsByIndex(id);
    } else {
        console.log("一致しなかったため検索します");
        let returnArts = {};
        artsInformation.artsList.forEach(element => {
            if (element.id === id)
                returnArts = element;
        });
        return returnArts;
    }
}

utility.getArtsOfUser = function (user) {
    //return this.getArtsById(user.setArts);
    return this.getArtsByIndex(user.setArts);
}



module.exports = utility;