let fs = require("fs").promises;
let utility = {};
let weaponInformation = require("./informations/weaponInformation.js");
let armorInformation = require("./informations/armorInformation.js");
let accessoryInformation = require("./informations/accessoryInformation.js");

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
    let data = await fs.readFile('./database/userData/' + user.userId + ".json", "utf-8");
    console.log(user);
    user = { ...JSON.parse(data) };
    console.log(user);
    console.log("ファイル読み込み完了");
    return user;
}

utility.readUserDetail = async function (user) {
    
}

utility.readEquipInventory = async function(user){
    let equipInventory = await fs.readFile('./database/userData/' + user.userId + "/"+user.userId+"/equipment.json");
    console.log(equipInventory);
    console.log("装備品倉庫読み込み完了")
    return equipInventory;
}

utility.readItemInventory = async function(user){
    let itemInventory = await fs.readFile('./database/userData/' + user.userId + "/item.json");
    console.log(equipInventory);
    console.log("装備品倉庫読み込み完了")
    return equipInventory;
}

utility.writeUser = async function(user) {
    await fs.writeFile('./database/userData/' + user.userId + ".json", JSON.stringify(user));
    console.log("ファイル書き込み完了！");
}

utility.writeEquipInventory = async function (user,equipInventory) {
    await await fs.writeFile('./database/userData/' + user.userId + ".json", JSON.stringify(equipInventory));
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




module.exports = utility;