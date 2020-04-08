//ユーザ情報，または職業武器防具装飾品等の各種情報を引数に取ったり返したりする関数を収録
let fs = require("fs").promises;
let usersPeripheral= {};
let weaponInformation = require("./informations/weaponInformation.js");
let armorInformation = require("./informations/armorInformation.js");
let accessoryInformation = require("./informations/accessoryInformation.js");
let artsInformation = require("./informations/artsInformation.js");
let jobInformation = require("./informations/jobInformation.js");
let configuration = require("./configuration.js")

usersPeripheral.deposit = function(user,amount) {
    if (user.money < amount)
        return;    
    user.money -= amount;
    user.bank += amount;
    this.writeUser(user);
}

usersPeripheral.fullDeposit = function(user) {
    let amount = user.money;
    this.deposit(user, amount);    
}

usersPeripheral.withdraw = function (user, amount) {
    console.log(amount);
    amount = Math.min(amount, user.bank);
    user.bank -= amount;
    user.money += amount;
    this.writeUser(user);
}

usersPeripheral.fullWithdraw = function(user) {
    let amount = 0;
    amount = Math.min(user.bank, 1000000000000 - user.money);
    this.withdraw(user, amount);    
}

usersPeripheral.readUser = async function (user) {
    let data = await fs.readFile('./database/userData/' + user.userId + "/"+user.userId+".json", "utf-8");
    user = { ...JSON.parse(data) };
    return user;
}

usersPeripheral.readAllDataOfUser = async function (user) {
    let kernelData =  this.readUser(user);

    let userData = await Promise.all([kernelData])//, equipInventory, itemInventory, artsInventory,career]);

    return userData;
}

//ユーザ登録処理
usersPeripheral.registerUser = async function (user) {
    await fs.mkdir('./database/userData/' + user.userId);
    let career = new Array(jobInformation.jobList.length);
    career.fill(0);
    career[user.job] = user.jobLevel;
    user.career = career;
    user.equipmentInventory = {};
    user.equipmentInventory.weapons = [];
    user.equipmentInventory.armors = [];
    user.equipmentInventory.accessories = [];
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

usersPeripheral.writeUser = async function(user) {
    await fs.writeFile('./database/userData/' + user.userId + "/"+user.userId+".json", JSON.stringify(user));
    console.log("ユーザファイル書き込み完了！");
}

usersPeripheral.writeEquipInventory = async function (user,equipInventory) {
    await fs.writeFile('./database/userData/' + user.userId + "/equipmentInventory.json", JSON.stringify(equipInventory));
    console.log("ユーザの装備品情報書き込み完了");
}

usersPeripheral.writeItemInventory = async function (user,itemInventory) {
    await fs.writeFile('./database/userData/' + user.userId + "/itemInventory.json", JSON.stringify(itemInventory));
    console.log("ユーザの道具情報書き込み完了");
}

usersPeripheral.writeArtsInventory = async function (user, artsInventory) {
    await fs.writeFile('./database/userData/' + user.userId + "/artsInventory.json", JSON.stringify(artsInventory));
    console.log("ユーザの戦術情報書き込み完了");
}

usersPeripheral.writeCareer = async function (user, career) {
    await fs.writeFile('./database/userData/' + user.userId + "/career.json", JSON.stringify(career));
    console.log("ユーザの戦術情報書き込み完了");
}

usersPeripheral.writeAllDataOfUser = async function(user, equipmentInventory, itemInventory, artsInventory,career){
    await Promise.all([
        this.writeUser(user),
        //this.writeEquipInventory(user, equipmentInventory),
        //this.writeItemInventory(user, itemInventory),
        //this.writeArtsInventory(user, artsInventory),
        //this.writeCareer(user, career)
    ]);
}


usersPeripheral.calculateAttack = function (user) {
    //職業や装備によって計算するところを今は力をそのまま返すことにする．
    return user.power;
}

usersPeripheral.calculateStamina = function (lastBattleDate) {
    let now = new Date();
    return Math.min(configuration.maxStamina, Math.floor((now.getTime() - lastBattleDate)/1000));
}

usersPeripheral.buyWeapon = function(user,targetWeapon){ 
    user.weapon = targetWeapon.id;
    user.money -= targetWeapon.value;
    this.writeUser(user);
}

usersPeripheral.buyArmor = function (user,targetArmor) {
    user.armor = targetArmor.id;
    user.money -= targetArmor.value;
    this.writeUser(user);
}

usersPeripheral.buyAccessory = function (user,targetAccessory) {
    user.accessory = targetAccessory.id;
    user.money -= targetAccessory.value;
    this.writeUser(user);
}

usersPeripheral.getJobElementOfUser = function (user) {
    return jobInformation.jobList[user.job];
}

usersPeripheral.getBasicArtsNumbers = function (job) {//対象の職業の基本技を得る
    let basicArts=[];
    job.basicArts.forEach(element => basicArts.push(element));
    return basicArts;
}

usersPeripheral.getBasicArtsNumbersByUser= function (user){//ユーザの職業の基本技の番号を得る
    return this.getBasicArtsNumbers(this.getJobElementOfUser(user));
}


usersPeripheral.isChangeable = function (user, job) {
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

    job.jobsRequired.forEach(element => {
        isChangeable = isChangeable && !(user.career[element] < configuration.jobMasterLevel);
    });
        return isChangeable;
}

usersPeripheral.getChangeableJobs = function (user) {
    let changeableJobs = [];
    console.log(jobInformation.jobList);
    jobInformation.jobList.forEach(element => { 
        if (this.isChangeable(user,element)) {
            changeableJobs.push(element);
        }
    });
    return changeableJobs;
}

usersPeripheral.getChangeableAndNotYetMasterJobs = function (user) {//未マスターかつ転職可能な職業を取得
    return this.getChangeableJobs(user).filter((element) => user.career[element.id] < configuration.jobMasterLevel);
}

usersPeripheral.changeJob = async function (user,targetJobId) {
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
    if (user.jobLevel < 60) { //転職先が未マスターの場合のみ，転職でスキル追加
        let addArts = this.getBasicArtsNumbersByUser(user);
        user.artsInventory = user.artsInventory.concat(addArts);
        user.artsInventory.sort(function (a, b) {
            if (a < b)
                return -1;
            if (a > b)
                return 1;
            return 0;
        });
    }
        
    await this.writeUser(user);
    console.log(user.job);
    console.log(user.jobLevel);
    console.log(user.artsInventory);
}

usersPeripheral.getChangeableArtsByArtsInventory = function(user){
    let changeableArts = [];
    console.log(user);
    console.log(artsInformation.artsList);
    user.artsInventory.forEach(element => {
        changeableArts.push(artsInformation.artsList[element]);
    });
    console.log(changeableArts);
    return changeableArts;
}

usersPeripheral.getChangeableArts = function (user) {
    return this.getChangeableArtsByArtsInventory(user);
}

usersPeripheral.getArtsByIndex = function (index) {
    return artsInformation.artsList[index];
}

usersPeripheral.getArtsById = function (id) {
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

usersPeripheral.getArtsOfUser = function (user) {
    //return this.getArtsById(user.setArts);
    return this.getArtsByIndex(user.setArts);
}


usersPeripheral.getWeaponByIndex=function(index){
    return weaponInformation.weaponList[index];
}

usersPeripheral.getWeaponsOfUser=function(user){
    let weapons = [];
    user.equipmentInventory.weapons.forEach(element => {
        weapons.push(this.getWeaponByIndex(element));
    })
    return weapons;
}

usersPeripheral.getArmorByIndex=function(index){
    return armorInformation.armorList[index];
}

usersPeripheral.getArmorsOfUser=function(user){
    let armors = [];
    user.equipmentInventory.armors.forEach(element => {
        armors.push(this.getArmorByIndex(element));
    })
    return armors;
}

usersPeripheral.getAccessoryByIndex=function(index){
    return accessoryInformation.accessoryList[index];
}

usersPeripheral.getAccessoriesOfUser = function (user) {
    let accessories = [];
    user.equipmentInventory.accessories.forEach(element => {
        accessories.push(this.getAccessoryByIndex(element));
    })
    return accessories;
}

usersPeripheral.readChampion = async function () {
    let data = await fs.readFile('./database/championData/champion.json', "utf-8");
    return data;
};

module.exports = usersPeripheral;