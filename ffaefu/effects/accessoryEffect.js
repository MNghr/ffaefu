let accessoryEffect = {};
let utility = require("../utility");

accessoryEffect.none = function (user,enemy) {
    let returnData = {};
    returnData.message = "";
    console.log(user);
    console.log(enemy);
    return returnData;
};
//バーサクリング
accessoryEffect.damageonePointFiveTime = function (user,enemy) {
    let returnData = {};
    enemy.receiveDamage *= 1.5;
    enemy.receiveDamage = Math.ceil(enemy.receiveDamage);
    Math.ceil(enemy.receiveDamage);
    returnData.message = "";
    return returnData;
};
//破壊神の指輪
accessoryEffect.damageDouble = function (user,enemy) {
    let returnData = {};
    enemy.receiveDamage *= 2;
    Math.ceil(enemy.receiveDamage);
    returnData.message = "";
    return returnData;
};
//鬼神の指輪
accessoryEffect.damageTriple = function (user,enemy) {
    let returnData = {};
    enemy.receiveDamage *= 3;
    Math.ceil(enemy.receiveDamage);
    returnData.message = "";
    return returnData;
};
//異次元の結晶
accessoryEffect.desion = function (user,enemy) {
    let returnData = {};
    
    Math.ceil(enemy.receiveDamage);
    returnData.message = shapeArtsName(user.accessory.name + "が光を放つ．．．時空魔法デジョン！！","yellow");
    if (utility.random(1, 3) !== 1) {
        returnData.message += "失敗！！"
    } else {
        enemy.receiveDamage = enemy.maxHP;
        enemy.evasiveness -= 999999999;
    }
    
    return returnData;
};
//ヒーリングソングのCD
accessoryEffect.healingSong = function (user,enemy) {
    let returnData = {};
    user.recoverHP += user.religion*utility.random(0,user.karma);
    Math.ceil(enemy.receiveDamage);
    returnData.message = shapeArtsName(user.accessory.name + "をラジカセにセットした...ヒーリングソング！","gray");
    
    return returnData;
};
//自動回復(小)
accessoryEffect.autoHealSmall = function (user,enemy) {
    let returnData = {};
    user.recoverHP += utility.random(1, user.religion);
    Math.ceil(enemy.receiveDamage);
    returnData.message = "";
    return returnData;
};
//自動回復(中)
accessoryEffect.autoHealMedium = function (user,enemy) {
    let returnData = {};
    user.recoverHP += utility.random(1, user.religion)*utility.random(1,100);
    Math.ceil(enemy.receiveDamage);
    returnData.message = "";
    return returnData;
};
//自動回復(大)
accessoryEffect.autoHealLarge = function (user,enemy) {
    let returnData = {};
    user.recoverHP += utility.random(1, user.religion)*utility.random(1,user.religion);
    Math.ceil(enemy.receiveDamage);
    returnData.message = "";
    return returnData;
};
//ダメージ軽減(小)
accessoryEffect.easeDamageSmall = function (user,enemy) {
    let returnData = {};
    user.receiveDamage -= Math.ceil(user.receiveDamage*utility.random(1,13)/100.0);
    Math.ceil(enemy.receiveDamage);
    returnData.message = "";
    return returnData;
};
//ダメージ軽減(中)
accessoryEffect.easeDamageMedium = function (user,enemy) {
    let returnData = {};
    user.receiveDamage -= Math.ceil(user.receiveDamage*utility.random(1,25)/100.0);
    Math.ceil(enemy.receiveDamage);
    returnData.message = "";
    return returnData;
};

//ダメージ軽減(大)
accessoryEffect.easeDamageLarge = function (user,enemy) {
    let returnData = {};
    user.receiveDamage -= Math.ceil(user.receiveDamage*utility.random(1,50)/100.0);
    Math.ceil(enemy.receiveDamage);
    returnData.message = "";
    return returnData;
};

//オニオンネックレス，オリハルコンメダル
accessoryEffect.damageTripleAndEaseDamageLarge = function (user, enemy) {
    let returnData = {};
    enemy.receiveDamage *= 3
    user.receiveDamage -= Math.ceil(user.receiveDamage*utility.random(1,50)/100.0);
    Math.ceil(enemy.receiveDamage);
    returnData.message = "";
    return returnData;
}

//オーラの結晶
accessoryEffect.aura = function (user, enemy) {
    let returnData = {};
    user.weaponRatio *= 2;
    returnData.message = shapeArtsName("オーラの結晶が光を放つ．．．武器の効果二倍！(効果継続・重複有効)","gray");
    return returnData;
}

//流星の欠片
accessoryEffect.meteor = function (user, enemy) {
    let returnData = {};
    returnData.message = shapeArtsName(user.accessory.name + "が光を放つ．．．古代魔法メテオ発動！！","gray");
    let hitAmount = utility.random(1,16)
    enemy.receiveDamage += user.mana * hitAmount * utility.random(1, 50);
    return returnData;
}

//オメガ・ソウル
accessoryEffect.damageQuadrapleAtRandom = function (user,enemy) {
    let returnData = {};
    enemy.receiveDamage += utility.random(1,enemy.receiveDamage * 3);
    Math.ceil(enemy.receiveDamage);
    returnData.message = "";
    return returnData;
};

//反魂香，クレアバイブル
accessoryEffect.resurrection = function (user, enemy) {
    let returnData = {};
    if (user.receiveDamage >= user.currentHP && utility.random(1,2) === 1) {
        user.recoverHP += user.maxHP
    }
    returnData.message = shapeArtsName(user.accessory.name + "が光を放つ．．．"+user.name+"の傷が完全に癒えた！！","gray");
    return returnData;
}
//浄化の結晶
accessoryEffect.cleansing = function (user, enemy) {
    let returnData = {};
    returnData.message = shapeArtsName(user.accessory.name + "が光を放つ．．．神聖魔法・浄化！！","yellow");

    enemy.receiveDamage += user.religion *  utility.random(1, 80);
    return returnData;
}

//波動の結晶
accessoryEffect.greatWave = function (user, enemy) {
    let returnData = {};
    returnData.message = shapeArtsName(user.accessory.name + "が光を放つ．．．グレートウェーブ！！","gray");

    enemy.receiveDamage += (user.mana+user.charm+user.karma) *  utility.random(1,400);
    return returnData;
}

//古代の水鏡
accessoryEffect.reflection = function (user, enemy) {
    let returnData = {};
    returnData.message = shapeArtsName(user.accessory.name + "が光を放つ．．．敵の攻撃を反射した！！","gray");

    enemy.receiveDamage += user.receiveDamage;
    user.receiveDamage = 0;

    return returnData;
}

//ガイアフォースの結晶
accessoryEffect.gaiaForce = function (user, enemy) {
    let returnData = {};
    returnData.message = "";
    if (user.sealArts === true) {
        enemy.receiveDamage *= 10;
        user.receiveDamage /= 2;
        user.receiveDamage = Math.ceil(user.receiveDamage);
        returnData.message = shaprArtsName(user.accessory.name + "が光を放つ．．．秘められた力を解放！！！" + user.name + "にスバラシイ力が備わった！！！", "gray");
    }    

    return returnData;
}

//封印球 敵の戦術を封印
accessoryEffect.sealArts = function (user, enemy) {
    let returnData = {};
    returnData.message = "";
    
    returnData.message = shaprArtsName(user.accessory.name + "が光を放つ．．．"+enemy.name+"の戦術を封じた！！", "gray");
    enemy.sealArts = true;

    return returnData;
}

//銀河の翡翠その他  戦術封印を無効化
accessoryEffect.liberateArts = function (user, enemy) {
    let returnData = {};
    returnData.message = "";
    if (user.sealArts === true) {
        user.sealArts = false;
        returnData.message = shaprArtsName(user.accessory.name + "が光を放つ．．．" + user.name + "にかかっている戒めを解いた！！", "gray");
    }

    return returnData;
}

//バグデスサンダー
accessoryEffect.bugDeathThunder  = function (user, enemy) {
    let returnData = {};
    returnData.message = "";
    if (enemy.element !== "monster") {
        returnData.message += user.accessory.name+"が光を放つ．．．サンダー！(ここでは真の力を発揮できないようだ．．．)";
        enemy.receiveDamage += user.attack * utility.random(1, 5);
    } else {
        if (user.itemInventory[21] > 0) {
            returnData.message += user.accessory.name + "が光を放つ．．．バグデスサンダー！！！！(バグのかけらを1つ消費した)";
            enemy.receiveDamage += user.attack * utility.random(1, 648);
            user.itemInventory[21]--;
            if (utility.random(1, 10) <= 3) {
                returnData.message += enemy.name+"の動きを鈍らせた！！！";
                user.receiveDamage = 0;
            }
        } else {
            returnData.message += user.accessory.name+"が光を放つ．．．サンダー！！(何かが不足しているようだ．．．)";
            enemy.receiveDamage += user.attack * utility.random(1, 10);
        }
    }
    returnData.message = shapeArtsName(returnData, "gray");
    enemy.evasiveness -= 999999;
    return returnData;
}

//必殺技の表示形成
let shapeArtsName = function(artsName, color){  
    return '<span class="arts'+color+'">'+artsName+"</span>";
}

//ヒット回数の表示形成
let shapeHitAmount = function (hitAmount, color) {
    return '<span class="hitAmount'+color+'">'+hitAmount+"</span>";
}

module.exports = accessoryEffect;