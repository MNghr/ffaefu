//ユーザ情報，または職業武器防具装飾品等の各種情報を引数に取ったり返したりする関数を収録
let fs = require("fs").promises;
let usersPeripheral= {};
let weaponInformation = require("./informations/weaponInformation.js");
let armorInformation = require("./informations/armorInformation.js");
let accessoryInformation = require("./informations/accessoryInformation.js");
let artsInformation = require("./informations/artsInformation.js");
let jobInformation = require("./informations/jobInformation.js");
let itemInformation = require("./informations/itemInformation.js")
let configuration = require("./configuration.js")
let utility = require("./utility.js");
const cron = require('node-cron');

usersPeripheral = {
    deposit : async function (user, amount) {
        if (user.money < amount)
            return;
        user.money -= amount;
        user.bank += amount;
        await this.writeUser(user);
    },

    fullDeposit : async function (user) {
        let amount = user.money;
        await this.deposit(user, amount);
    },

    withdraw : async function (user, amount) {
        console.log(amount);
        amount = Math.min(amount, user.bank);
        user.bank -= amount;
        user.money += amount;
        await this.writeUser(user);
    },

    fullWithdraw : async function (user) {
        let amount = 0;
        amount = Math.min(user.bank, 1000000000000 - user.money);
        await this.withdraw(user, amount);
    },

    addMoney : function (user, amount) {
        user.money += amount;
        user.money = Math.min(user.money, configuration.maxMoney);
    },

    readUser : async function (user) {
        let data = await fs.readFile('./database/userData/' + user.userId + "/" + user.userId + ".json", "utf-8");
        user = { ...JSON.parse(data) };
        return user;
    },

    readAllDataOfUser : async function (user) {
        let kernelData = this.readUser(user);

        let userData = await Promise.all([kernelData])//, equipInventory, itemInventory, artsInventory,career]);

        return userData;
    },

//ユーザ登録処理
    registerUser : async function (user) {
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
        usersPeripheral.addWorldMessage(user.name + "さんが新しくキャラ作成されました！皆さんよろしく！！");

        await Promise.all([
            this.writeUser(user)
            //this.writeEquipInventory(user, []),
            //this.writeItemInventory(user, user.itemInventory),
            //this.writeArtsInventory(user, [0].concat(this.getBasicArtsNumbersByUser(user))),
            //this.writeCareer(user, career)
        ]);
    },

    writeUser : async function (user) {
        await fs.writeFile('./database/userData/' + user.userId + "/" + user.userId + ".json", JSON.stringify(user));
        console.log("ユーザファイル書き込み完了！");
    },

    writeEquipInventory : async function (user, equipInventory) {
        await fs.writeFile('./database/userData/' + user.userId + "/equipmentInventory.json", JSON.stringify(equipInventory));
        console.log("ユーザの装備品情報書き込み完了");
    },

    writeItemInventory : async function (user, itemInventory) {
        await fs.writeFile('./database/userData/' + user.userId + "/itemInventory.json", JSON.stringify(itemInventory));
        console.log("ユーザの道具情報書き込み完了");
    },

    writeArtsInventory : async function (user, artsInventory) {
        await fs.writeFile('./database/userData/' + user.userId + "/artsInventory.json", JSON.stringify(artsInventory));
        console.log("ユーザの戦術情報書き込み完了");
    },

    writeCareer : async function (user, career) {
        await fs.writeFile('./database/userData/' + user.userId + "/career.json", JSON.stringify(career));
        console.log("ユーザの戦術情報書き込み完了");
    },

    writeAllDataOfUser : async function (user, equipmentInventory, itemInventory, artsInventory, career) {
        await Promise.all([
            this.writeUser(user),
            //this.writeEquipInventory(user, equipmentInventory),
            //this.writeItemInventory(user, itemInventory),
            //this.writeArtsInventory(user, artsInventory),
            //this.writeCareer(user, career)
        ]);
    },

    calculateStamina : function (lastBattleDate) {
        let now = new Date();
        return Math.min(configuration.maxStamina, Math.floor((now.getTime() - lastBattleDate) / 1000));
    },

    buyWeapon : function (user, targetWeapon) {
        user.equipmentInventory.weapons.push(targetWeapon.id);
        user.money -= targetWeapon.value;
        this.writeUser(user);
    },

    buyArmor : function (user, targetArmor) {
        user.equipmentInventory.armors.push(targetArmor.id);
        user.money -= targetArmor.value;
        this.writeUser(user);
    },

    buyAccessory : function (user, targetAccessory) {
        user.equipmentInventory.accessories.push(targetAccessory.id);
        user.money -= targetAccessory.value;
        this.writeUser(user);
    },
    
    getJobElementOfUser : function (user) {
        return jobInformation.jobList[user.job];
    },

    getBasicArtsNumbers : function (job) {//対象の職業の基本技を得る
        let basicArts = [];
        job.basicArts.forEach(element => basicArts.push(element));
        return basicArts;
    },

    getBasicArtsNumbersByUser : function (user) {//ユーザの職業の基本技の番号を得る
        return this.getBasicArtsNumbers(this.getJobElementOfUser(user));
    },

    isChangeable : function (user, job) {
        let isChangeable = false;
        if (user.job != job.id
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
    },

    getChangeableJobs : function (user) {
        let changeableJobs = [];
        console.log(jobInformation.jobList);
        jobInformation.jobList.forEach(element => {
            if (this.isChangeable(user, element)) {
                changeableJobs.push(element);
            }
        });
        return changeableJobs;
    },

    getChangeableAndNotYetMasterJobs : function (user) {//未マスターかつ転職可能な職業を取得
        return this.getChangeableJobs(user).filter((element) => user.career[element.id] < configuration.jobMasterLevel);
    },

    changeJob : async function (user, targetJobId) {
        user.career[user.job] = user.jobLevel;
        if (user.jobLevel < 60) {//ジョブをマスターしてなければその職業の技を削除
            let removeArts = this.getBasicArtsNumbersByUser(user);
            console.log(removeArts);
            user.artsInventory = user.artsInventory.filter(function (element) {
                for (let i = 0; i < removeArts.length; ++i) {
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
    },

    getChangeableArtsByArtsInventory : function (user) {
        let changeableArts = [];
        console.log(user);
        console.log(artsInformation.artsList);
        user.artsInventory.forEach(element => {
            changeableArts.push(artsInformation.artsList[element]);
        });
        console.log(changeableArts);
        return changeableArts;
    },

    getChangeableArts : function (user) {
        return this.getChangeableArtsByArtsInventory(user);
    },

    getArtsByIndex : function (index) {
        return artsInformation.artsList[index];
    },

    getArtsById : function (id) {
        console.log(artsInformation.artsList[id]);
        console.log("requestedid:" + id);
        console.log("artsInformation.artsList[id].id:" + artsInformation.artsList[id].id)
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
    },

    getArtsOfUser : function (user) {
        //return this.getArtsById(user.setArts);
        return this.getArtsByIndex(user.setArts);
    },


    getWeaponByIndex : function (index) {
        return weaponInformation.weaponList[index];
    },

    getWeaponsOfUser : function (user) {
        let weapons = [];
        user.equipmentInventory.weapons.forEach(element => {
            weapons.push(this.getWeaponByIndex(element));
        })
        return weapons;
    },

    getArmorByIndex : function (index) {
        return armorInformation.armorList[index];
    },

    getArmorsOfUser : function (user) {
        let armors = [];
        user.equipmentInventory.armors.forEach(element => {
            armors.push(this.getArmorByIndex(element));
        });
        return armors;
    },

    getAccessoryByIndex : function (index) {
        return accessoryInformation.accessoryList[index];
    },

    getAccessoriesOfUser : function (user) {
        let accessories = [];
        user.equipmentInventory.accessories.forEach(element => {
            accessories.push(this.getAccessoryByIndex(element));
        })
        return accessories;
    },

    //チャンピオン書き込み関数 
    writeChampion : async  (user)  => {
        this.currentChampion = JSON.parse(JSON.stringify(user));
        await fs.writeFile('./database/ChampionData/champion.json', JSON.stringify(user));
    },

    //チャンピオン読み込み関数
    readChampion : async  () => {
        let data = await fs.readFile('./database/championData/champion.json', "utf-8");
    
        return data;
    },

    //現在のチャンピオン ページリロードの度にわざわざ読み直すとか地獄もいいとこなので，メンテ等サーバを止める必要が出たときの為に一応外部ファイルに書き出してはいるけどメモリにも置いておく．チャンピオンの参照をするときはこれを参照してね
    currentChampion : {},

    //チャンピオンデータを読み込んでメモリのチャンピオンデータを更新する関数 起動時以外出番ないはず
    setChampion : async () => {
        usersPeripheral.currentChampion = JSON.parse(await usersPeripheral.readChampion());
        console.log(usersPeripheral.currentChampion);
    },

    //所持アイテムリスト作成処理
    makeUserItemList : (user) => {
        userItemList = JSON.parse(JSON.stringify(itemInformation.itemList));
        userItemList.forEach((element, index) => {
            element.amount = user.itemInventory[index];
        });

        return userItemList;
    },
    //アイテム購入処理
    buyItem : async (user, targetItemId, amount) => {
        let buySuceed = user.money >= amount * itemInformation.itemList[targetItemId].value;
        if (buySuceed) {
            user.itemInventory[targetItemId] += amount;
            user.money -= amount * itemInformation.itemList[targetItemId].value;
            await usersPeripheral.writeUser(user);
        }

        return buySuceed;
    },

//アイテム売却処理
    sellItem : async (user, targetItemId, amount) => {
        let sellSuceed = amount <= user.itemInventory[targetItemId];
        let sum = 0;
        if (sellSuceed) {
            user.itemInventory[targetItemId] -= amount;
            sum = amount * Math.ceil(itemInformation.itemList[targetItemId].value / 2)
            usersPeripheral.addMoney(user, sum);
    
            await usersPeripheral.writeUser(user);
        }

        return sum;
    },


    //「このへんのプレイヤー」
    playingPlayers : [],

    //全体向けメッセージ
    worldMessage : [],
    
    //ログイン中のプレイヤー名追加処理 重複を防ぐために名前の他にIdを，ログイン中のプレイヤー名削除処理を正常に行うために最終入力時刻を持つ．
    addPlayingPlayer : (user) => {
        usersPeripheral.playingPlayers = usersPeripheral.playingPlayers.filter(element => element.userId != user.userId);
        usersPeripheral.playingPlayers.push({ userId: user.userId, name: user.name, lastInputTime: user.lastInputTime });
        //console.log(usersPeripheral.playingPlayers);
    },

    //全体的メッセージを外部ファイルに書き込み
    writeWorldMessage: async () => {
        await fs.writeFile("./database/worldMessage.JSON", JSON.stringify(usersPeripheral.worldMessage))
    },

    //全体向けメッセージをメモリ内に読み込む ※起動時以外出番無いはず
    setWorldMessage: async () => {
        usersPeripheral.worldMessage = JSON.parse(await usersPeripheral.readWorldMessage());
    },

    //全体向けメッセージに新たな要素を追加  全体向けメッセージはFILO(用はスタックで先入れ後だし)なので，追加したいメッセージは先頭に追加される．
    addWorldMessage: async (message) => {
        this.worldMessage.unshift(message);
        console.log(usersPeripheral.worldMessage);
        if (usersPeripheral.worldMessage)
            await this.writeWorldMessage();
    },

    readWorldMessage: async () => {
        return await fs.readFile("./database/worldMessage.json", "utf-8");
    }
};


//ログイン中のプレイヤー名削除処理(最後に操作した時刻から設定されたプレイヤー表示時間をオーバーすると「この辺のプレイヤー」リストから削除される) 1分ごとに走る
cron.schedule('* * * * *', () => {
    usersPeripheral.playingPlayers = usersPeripheral.playingPlayers.filter((element) => {
        console.log((element.lastInputTime + configuration.showPlayingPlayerTime * 1000) + "," + utility.getTime());
        return element.lastInputTime + configuration.showPlayingPlayerTime * 1000 >= utility.getTime();
    });
    console.log(usersPeripheral.playingPlayers);
});

//サーバ起動時，チャンピオン情報を読み込む処理
usersPeripheral.setChampion();

//サーバ起動時，全体向けメッセージを読み込む処理
usersPeripheral.worldMessage=usersPeripheral.setWorldMessage();



module.exports = usersPeripheral;