//アイテムの効果を処理するルーチンをここに記述
let utility = require("../utility.js");
let itemEffect = {};
itemEffect.none = function (user,enemy) {
    let returnData = {};
    returnData.message = "";
    returnData.spentAmount = 0;
    return returnData;
};

itemEffect.resistFire = function (user, enemy) {
    let returnData = {};
    returnData.message = "";
    returnData.spentAmount = 0;
    if (user.receiveElement === "fire" && utility.random(0,1) === 0) {
        returnData.message = shapeItemMessage(user.name + "はきよめの雫を飲み込んだ！火属性ダメージ無効！","skyblue");
        returnData.spentAmount = 1;
        user.receiveDamage = 0;
    }
    return returnData;
};


itemEffect.resistThunder = function (user, enemy) {
    let returnData = {};
    returnData.message = "";
    returnData.spentAmount = 0;
    if (user.receiveElement === "thunder" && utility.random(0,1) === 0) {
        returnData.message = shapeItemMessage(user.name + "は避雷針を振りかざした！雷属性ダメージ無効！","black");
        returnData.spentAmount = 1;
        user.receiveDamage = 0;
    }
    return returnData;
};

itemEffect.resistIce = function (user, enemy) {
    let returnData = {};
    returnData.message = "";
    returnData.spentAmount = 0;
    if (user.receiveElement === "ice" && utility.random(0,1) === 0) {
        returnData.message = shapeItemMessage(user.name + "は炎蜥蜴の牙を掲げた・・・氷属性ダメージ無効！","red");
        returnData.spentAmount = 1;
        user.receiveDamage = 0;
    }
    return returnData;
};

itemEffect.reflectFire = function (user, enemy) {
    let returnData = {};
    returnData.message = "";
    returnData.spentAmount = 0;
    if (user.receiveDamage > 0 && user.receiveElement === "fire" && utility.random(0,1) === 0) {
        returnData.message = shapeItemMessage(user.name + "は水結晶を掲げた！火属性ダメージ反射！！","royalblue");
        returnData.spentAmount = 1;
        enemy.receiveDamage += user.receiveDamage; 
        user.receiveDamage = 0;

    }
    
    return returnData;
};

itemEffect.reflectThunder = function (user, enemy) {
    let returnData = {};
    returnData.message = "";
    returnData.spentAmount = 0;
    if (user.receiveDamage > 0 && user.receiveElement === "thunder" && utility.random(0,1) === 0) {
        returnData.message = shapeItemMessage(user.name + "は黒い石を振りかざした！雷属性ダメージ反射！！","black");
        enemy.receiveDamage += user.receiveDamage;
        returnData.spentAmount = 1;
        user.receiveDamage = 0;
    }
    return returnData;
};

itemEffect.reflectIce = function (user, enemy) {
    let returnData = {};
    returnData.message = "";
    returnData.spentAmount = 0;
    if (user.receiveDamage > 0 && user.receiveElement === "Ice" && utility.random(0,1) === 0) {
        returnData.message = shapeItemMessage(user.name + "はレッドファングを掲げた！氷属性ダメージ反射！！","red");
        returnData.spentAmount = 1;
        enemy.receiveDamage += user.receiveDamage; 
        user.receiveDamage = 0;
    }
    
    return returnData;
};

let shapeItemMessage = function(message, color){  
    return '<span class="arts'+color+'">'+message+"</span>";
}

//ヒット回数の表示形成
let shapeHitAmount = function (hitAmount, color) {
    return '<span class="hitAmount' + color + '">' + hitAmount + "</span>";
}

module.exports = itemEffect;
