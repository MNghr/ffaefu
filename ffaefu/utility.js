let fs = require("fs").promises;
let utility = {};
let weaponInformation = require("./informations/weaponInformation.js");
let armorInformation = require("./informations/armorInformation.js");
let accessoryInformation = require("./informations/accessoryInformation.js");
let artsInformation = require("./informations/artsInformation");
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
    console.log(user);
    user = { ...JSON.parse(data) };
    console.log(user);
    console.log("ファイル読み込み完了");
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

utility.readAllDataOfUser = async function (user) {
    let kernelData =  this.readUser(user);
    let equipInventory = this.readEquipInventory(user);
    let itemInventory =  this.readItemInventory(user);
    let artsInventory =  this.readArtsInventory(user);
    let userData = await Promise.all([kernelData, equipInventory, itemInventory, artsInventory]);

    return userData;
}

//ユーザ登録処理
utility.registerUser = async function (user) {
    await fs.mkdir('./database/userData/' + user.userId);
    await Promise.all([
    this.writeUser(user),
    this.writeEquipInventory(user, []),
    this.writeItemInventory(user, []),
    this.writeArtsInventory(user, [0].concat(this.getBasicArtsNumbersByUser(user)))]);
}

utility.writeUser = async function(user) {
    await fs.writeFile('./database/userData/' + user.userId + "/"+user.userId+".json", JSON.stringify(user));
    console.log("ユーザファイル書き込み完了！");
}

utility.writeEquipInventory = async function (user,equipInventory) {
    await fs.writeFile('./database/userData/' + user.userId + "/equipment.json", JSON.stringify(equipInventory));
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

utility.writeAllDataOfUser = async function(user, equipmentInventory, itemInventory, artsInventory){
    await Promise.all([
        this.writeUser(user),
        this.writeEquipInventory(user, equipmentInventory),
        this.writeItemInventory(user, itemInventory),
        this.writeArtsInventory(user, artsInventory)]);
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

utility.getJobElement = function (user) {
    return jobInformation.jobList[user.job];
}

utility.getBasicArtsNumbers = function (job) {//対象の職業の基本技を得る
    let basicArts=[];
    job.basicArts.forEach(element => basicArts.push(element));
    return basicArts;
}

utility.getBasicArtsNumbersByUser= function (user){//ユーザの職業の基本技の番号を得る
    return this.getBasicArtsNumbers(this.getJobElement(user));
}

utility.isChangeable = function (user, job) {
    let isChangeable = false;
    if (user.power >= job.powerRequired
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

utility.getChangeableJobs = function () {
    console.log(utility);
    let changeableJobs = [];
    jobInformation.jobList.forEach(function (element) {
        if (isChangeable(element)) {
            changeableJobs.push(element.id);
        }
    });
    return changeableJobs;
}

utility.changeJob = function (user,target) {
    user.job = target;
}


module.exports = utility;