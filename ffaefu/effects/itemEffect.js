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
        returnData.message = shapeItemMessage(user.name + "は水結晶を掲げた！火属性ダメージ反射！！", "royalblue");
        enemy.receiveAdditionalDamage += user.receiveDamage; 
        returnData.message += enemy.name + "に追加で" + enemy.receiveAdditionalDamage + "ダメージ！！";
        returnData.spentAmount = 1;
        user.receiveDamage = 0;

    }
    
    return returnData;
};

itemEffect.reflectThunder = function (user, enemy) {
    let returnData = {};
    returnData.message = "";
    returnData.spentAmount = 0;
    if (user.receiveDamage > 0 && user.receiveElement === "thunder" && utility.random(0,1) === 0) {
        returnData.message = shapeItemMessage(user.name + "は黒い石を振りかざした！雷属性ダメージ反射！！", "black");
        enemy.receiveAdditionalDamage += user.receiveDamage; 
        returnData.message += enemy.name + "に追加で" + enemy.receiveAdditionalDamage + "ダメージ！！";
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
        enemy.receiveAdditionalDamage += user.receiveDamage; 
        returnData.message += enemy.name + "に追加で" + enemy.receiveAdditionalDamage + "ダメージ！！";
        returnData.spentAmount = 1;
        user.receiveDamage = 0;
    }
    
    return returnData;
};

itemEffect.reflectBlackMagics = function (user, enemy) {
    let returnData = {};
    returnData.message = "";
    returnData.spentAmount = 0;
    if (user.receiveDamage > 0 && (user.receiveElement === "Ice" || user.receiveElement === "fire" || user.receiveElement === "thunder") && utility.random(0,1) === 0) {
        returnData.message = shapeItemMessage(user.name + "は魔法のブーメランを高く掲げた．．．魔法のダメージを反射した！！！","red");
        enemy.receiveAdditionalDamage += user.receiveDamage; 
        returnData.message += enemy.name + "に追加で" + enemy.receiveAdditionalDamage + "ダメージ！！";
        returnData.spentAmount = 1;
        user.receiveDamage = 0;
    }
    
    return returnData;
};

itemEffect.resistZantetsuken = function (user, enemy) {
    let returnData = {};
    returnData.message = "";
    returnData.spentAmount = 0;
    if (user.receiveElement === "zantetsuken" && utility.random(0,1) === 0 && user.receiveDamage > 0) {
        returnData.message = shapeItemMessage(user.name + "は騎士の盾で身構えた！斬鉄剣のダメージ半減！！","brown");
        returnData.spentAmount = 1;
        user.receiveDamage = Math.ceil(user.receiveDamage/2.0);
    }
    return returnData;
};

itemEffect.annulZantetsuken = function (user, enemy) {
    let returnData = {};
    returnData.message = "";
    returnData.spentAmount = 0;
    if (user.receiveElement === "zantetsuken" && utility.random(0,1) === 0) {
        returnData.message = shapeItemMessage(user.name + "は勇者の盾で身構えた！斬鉄剣のダメージ無効！","brown");
        returnData.spentAmount = 1;
        user.receiveDamage = 0;
    }
    return returnData;
};

itemEffect.resistDesion = function (user, enemy) {
    let returnData = {};
    returnData.message = "";
    returnData.spentAmount = 0;
    if (user.receiveElement === "zantetsuken" && utility.random(0,1) === 0 && user.receiveDamage > 0) {
        returnData.message = shapeItemMessage(user.name + "はブライノイズを展開した！デジョンのダメージ半減！！","brown");
        returnData.spentAmount = 1;
        user.receiveDamage = Math.ceil(user.receiveDamage/2.0);
    }
    return returnData;
};

itemEffect.annulZantetsuken = function (user, enemy) {
    let returnData = {};
    returnData.message = "";
    returnData.spentAmount = 0;
    if (user.receiveElement === "zantetsuken" && utility.random(0,1) === 0) {
        returnData.message = shapeItemMessage(user.name + "は勇者の盾で身構えた！斬鉄剣のダメージ無効！","brown");
        returnData.spentAmount = 1;
        user.receiveDamage = 0;
    }
    return returnData;
};

itemEffect.ressurrectionSmall = function (user, enemy) {
    let returnData = {message:"",spentAmount:0};

    if (user.currentHP <= 0) {
        returnData.message = shapeItemMessage("不死身の雫が" + user.name + "に降り注いだ．．．" + user.name + "のHPが1/20回復した！", "green");
        user.currentHP = Math.ceil(user.maxHP / 200);
        returnData.spentAmount = 1;
    }
    return returnData;
}

itemEffect.ressurrectionMedium = function (user, enemy) {
    let returnData = { message: "" ,spentAmount:0};
    if (user.currentHP <= 0) {
        returnData.message = shapeItemMessage("不死身の土塊が" + user.name + "に降り注いだ．．．" + user.name + "のHPが1/5回復した！", "green");
        user.currentHP = Math.ceil(user.maxHP / 20);
        returnData.spentAmount = 1;
    }
    return returnData;
}

itemEffect.ressurrectionLarge = function (user, enemy) {
    let returnData = { message: "" ,spentAmount:0};
    if (user.currentHP <= 0) {
        returnData.message = shapeItemMessage("不死身の果実が" + user.name + "に力を与えた．．．" + user.name + "のHPが1/2回復した！", "green");
        user.currentHP = Math.ceil(user.maxHP / 2);
        returnData.spentAmount = 1;
    }

    return returnData;
}



let shapeItemMessage = function(message, color){  
    return '<span class="arts'+color+'">'+message+"</span>";
}

//ヒット回数の表示形成
let shapeHitAmount = function (hitAmount, color) {
    return '<span class="hitAmount' + color + '">' + hitAmount + "</span>";
}

module.exports = itemEffect;
