//アイテムの効果を処理するルーチンをここに記述
let utility = require("../utility.js");
let itemEffect = {};
itemEffect.none = function (user,enemy) {
    let returnData = {};
    returnData.message = "";
    return returnData;
};

itemEffect.resistFire = function (user, enemy) {
    let returnData = {};
    returnData.messge = "";
    if (user.receiveElement === "fire" && utility.random(0,1) === 0) {
        returnData.messge = user.name + "はきよめの雫を飲み込んだ！火属性ダメージ無効！";
        user.receiveDamage = 0;
    }
    return returnData;
};


itemEffect.resistThunder = function (user, enemy) {
    let returnData = {};
    returnData.messge = "";
    if (user.receiveElement === "thunder" && utility.random(0,1) === 0) {
        returnData.messge = user.name + "は避雷針を振りかざした！雷属性ダメージ無効！";
        user.receiveDamage = 0;
    }
    return returnData;
};

itemEffect.resistIce = function (user, enemy) {
    let returnData = {};
    returnData.messge = "";
    if (user.receiveElement === "ice" && utility.random(0,1) === 0) {
        returnData.messge = user.name + "は炎蜥蜴の牙を掲げた・・・氷属性ダメージ無効！";
        user.receiveDamage = 0;
    }
    return returnData;
};

itemEffect.reflectFire = function (user, enemy) {
    let returnData = {};
    returnData.messge = "";
    if (user.receiveDamage > 0 && user.receiveElement === "fire" && utility.random(0,1) === 0) {
        returnData.messge = user.name + "は水結晶を掲げた！火属性ダメージ反射！！";
        enemy.receiveDamage += user.receiveDamage; 
        user.receiveDamage = 0;
    }
    
    return returnData;
};

itemEffect.reflectThunder = function (user, enemy) {
    let returnData = {};
    returnData.messge = "";
    if (user.receiveDamage > 0 && user.receiveElement === "thunder" && utility.random(0,1) === 0) {
        returnData.messge = user.name + "は黒い石を振りかざした！雷属性ダメージ反射！！";
        enemy.receiveDamage += user.receiveDamage;
        user.receiveDamage = 0;
    }
    return returnData;
};

itemEffect.reflectIce = function (user, enemy) {
    let returnData = {};
    returnData.messge = "";
    if (user.receiveDamage > 0 && user.receiveElement === "Ice" && utility.random(0,1) === 0) {
        returnData.messge = user.name + "はレッドファングを掲げた！氷属性ダメージ反射！！";
        enemy.receiveDamage += user.receiveDamage; 
        user.receiveDamage = 0;
    }
    
    return returnData;
};




module.exports = itemEffect;
