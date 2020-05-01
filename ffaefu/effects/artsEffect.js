//戦術を処理するルーチンをここに記述
let utility = require("../utility.js");
let artsEffect = {};

artsEffect.none = {};

//技の効果はすぐに発動する効果と，敵の攻撃をひとしきり受けた後に発動する効果に分けられております．大抵の戦術は前者のみを持ちます．敵の技を無効化，軽減する効果をもった技が後者を持ちます．

artsEffect.none = {
    //immediateEffect:真っ先に発動する効果
    immediateEffect: function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        enemy.receiveDamage = user.attack;
        return returnData;
    },
    //delayedEffect:敵の攻撃が済んだ後，装備品の効果の直前に発動する効果．例えば，相手の防御魔法効果をすり抜ける，あるいは敵のダメージを無効化する時に使う．
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}


//カットワンウェイ
artsEffect.cutOneWay = {
    immediateEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = shapeArtsName("カットワンウェイ！", "blue");
        enemy.receiveDamage = user.attack * utility.random(1, 50);
        enemy.evasiveness -= 9;
        return returnData;
    },

    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}



artsEffect.furyCutter = {
    //連続斬り
    immediateEffect : function (user, enemy) {
        let returnData = {};
        let hitAmount = utility.random(1, 8);
        returnData.message = shapeArtsName("連続斬り！", "gray") + shapeHitAmount(hitAmount + "回 あたった！", "blue");
        enemy.receiveDamage = hitAmount * user.attack * utility.random(1, 35);
        enemy.evasiveness -= 999999;
        return returnData;
    },

    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//ファイアブラスト
artsEffect.fireBlast = {
    immediateEffect : function(user, enemy) {
        let returnData = {};
        returnData.message = shapeArtsName("炎熱魔法・ファイアブラスト！", "red");
        enemy.receiveDamage = (user.mana + user.jobLevel) * utility.random(1, 50);
        enemy.evasiveness = -999999;
        return returnData;
    },

    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//リュウセイグン
artsEffect.meteor = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        let hitAmount = utility.random(1, 16);
        returnData.message = shapeArtsName(user.name + "は流星群を呼んだ！", "yellow") + shapeHitAmount(hitAmount + "回 あたった！", "blue");
        enemy.receiveDamage = hitAmount * user.mana * utility.random(20, 35);
        enemy.evasiveness -= 9999999;
        return returnData;
    },

    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//リカバリー
artsEffect.recover = {
    immediateEffect: function (user, enemy) {
        let returnData = {};
        user.recoverHP = (user.mana + user.religion) * utility.random(50, 100);
        returnData.message = shapeArtsName("治癒術式リカバリー！", "yellow");
        enemy.receiveDamage = 0;
        return returnData;
    },

    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//防御円
artsEffect.circleOfProtection = {
    //一応ダメージ与えてることに注意
    immediateEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        enemy.receiveDamage = user.attack;
        return returnData;
    },
    
    delayedEffect : function(user, enemy) {
        let returnData = {};
        user.receiveDamage = Math.ceil(user.receiveDamage / 10.0);
        returnData.message = shapeArtsName("防御円！(" + user.name + "の受けるダメージを1/10に軽減！)", "yellow");
        return returnData;
    }
}

artsEffect.cleansing = {
    immediateEffect:function(user, enemy) {//浄化
        let returnData = {};
        returnData.message = shapeArtsName("浄化！", "gray");
        enemy.receiveDamage = user.mana * utility.random(75, 250);
        user.evasiveness -= 999999;

        return returnData;
    },

    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

artsEffect.stealMoney = {
    immediateEffect:function (user, enemy) {//お金を盗む
        let returnData = {};
        user.gainMoney = Math.ceil(enemy.dropMoney * utility.random(100, 500) / 100.0 * enemy.receiveDamage / enemy.maxHP);
        returnData.message = shapeHitAmount(enemy.name + "からお金を" + user.getMoney + "C盗んだ！");
        enemy.receiveDamage = user.attack;
    
        enemy.evasiveness -= 0;
    
        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
    
}

//だましうち
artsEffect.faintAttack = {
    immediateEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        enemy.receiveDamage = user.attack;
        return returnData;
    },
    delayedEffect : function(user, enemy) {
        let returnData = {};
        returnData.message = shapeArtsName(user.name + "が叫んだ！「あ！！！あれはなんだ？？？」", "black");
        user.receiveDamage = 0;
        enemy.evasiveness -= 999999;
    
        return returnData;
    }
}

//ソウルスティール
artsEffect.soulSteal = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = shapeArtsName("ソウルスティール", "purple");
        enemy.receiveDamage = user.mana * utility.random(40, 80);
        user.recoverHP += enemy.receiveDamage;
        enemy.evasiveness -= 999999;

        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//ワムプス
artsEffect.wamps = {
    immediateEffect : function(user, enemy) {
        let returnData = {};
        enemy.receiveDamage = user.attack;
        return returnData;
    },
    delayedEffect: function (user, enemy) {
        
        let returnData = {};
        returnData.message = shapeArtsName("泥炭魔法・ワムプス！", "brown");
        returnData.message = "";
        user.receiveDamage = 0;
        user.evasiveness += 0;
        return returnData;
    }
}

//台地錬成
artsEffect.upheaval = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = shapeArtsName("土魔法奥義・台地錬成！", "brown");
        enemy.receiveDamage = user.attack;
        user.evasiveness += 999999;

        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//トップウ
artsEffect.gust = {
    immediateEffect : function(user, enemy) {
        let returnData = {};
        let hitAmount = utility.random(4, 8);
        returnData.message = shapeArtsName(user.name + "は突風を起こした！", "blue") + shapeHitAmount(hitAmount + "回 あたった！", "blue");
        enemy.receiveDamage = hitAmount * user.mana * utility.random(10, 35);
        enemy.evasiveness -= 9999999;
        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//ゲイルホーン
artsEffect.galeHorn = {
    immediateEffect : function(user, enemy) {
        let returnData = {};
        let hitAmount = utility.random(1, 4);
        if (enemy.armor !== undefined) {
            enemy.armor.defence = 0;
        }
        returnData.message = shapeArtsName("ゲイルホーン！", "green") + shapeHitAmount(hitAmount + "回 あたった！", "blue");
        enemy.receiveDamage = hitAmount * user.mana * utility.random(5, 35);
        enemy.evasiveness -= 9999999;
        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//対抗突風
artsEffect.followingWind = {
    immediateEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        enemy.receiveDamage = user.attack;
        return returnData;
    },
    delayedEffect : function(user, enemy) {
        let returnData = {};
        returnData.message = shapeArtsName(user.name + "は強い追い風を起こした！", "blue");
        
        user.receiveDamage = 0;
        user.evasiveness += 0;

        return returnData;
    }
}

//ヒーリングソング
artsEffect.healingSong = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        user.recoverHP = (user.mana + user.religion + user.charm) * utility.random(100, 150);
        returnData.message = shapeArtsName("ヒーリングソング！", "yellow");
        enemy.receiveDamage = user.attack;
        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//ツヴァイト・オーラ
artsEffect.zweitAura = {
    immediateEffect : function(user, enemy) {
        let returnData = {};
        user.power *= 2;
        returnData.message = shapeArtsName("ツヴァイト・オーラ！(" + user.name + "の能力増強！)", "gray");
        enemy.receiveDamage = user.attack;
        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//けるる～しょうわ
artsEffect.chorus = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = shapeArtsName("けるるるるるるるるるるるるるるるるるるるるるるる～♪", "purple");
        enemy.receiveDamage = user.charm * utility.random(25, 55);
        enemy.evasiveness -= 999999;

        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        if (utility.random(1, 100) < 10) {
            returnData.message += enemy.name + "はずっこけた！！";
            user.receiveDamage = 0;
        }
        return returnData;
    }
}

//パクる
artsEffect.snatch = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = "";


        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = shapeArtsName(user.name+"は"+enemy.name+"の行動をパクった！！","blue");
        enemy.receiveDamage = user.receiveDamage;
        user.evasiveness = enemy.evasiveness;
        user.recoverHP = enemy.recoverHP;
        return returnData;
    }
}

//煉獄
artsEffect.purgatorium = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = shapeArtsName("煉獄！！", "darkred");
        enemy.receiveDamage = (user.mana + user.jobLevel + user.charm) * utility.random(40, 100);
        enemy.evasiveness = -999999;
        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//重力
artsEffect.gravity = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = shapeArtsName("重力！！", "black");
        enemy.receiveDamage = Math.floor(enemy.currentHP / 3);
        enemy.evasiveness = -999999;
        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//反射
artsEffect.reflection = {
    immediateEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    },
    delayedEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = shapeArtsName("反射！！", "yellow");
        enemy.receiveDamage = user.receiveDamage;
        user.receiveDamage = 0;
        enemy.evasiveness = -999999;
        return returnData;
    }
}

//ジャンプ
artsEffect.jump = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = shapeArtsName(user.name + "は空高く跳びあがった！", "skyblue");
        enemy.receiveDamage = user.attack * utility.random(1, 50);
        user.damageCutPercent = 0.0;
        user.evasiveness += 999;

        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//ドラゴンプレス
artsEffect.dragonPress = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = shapeArtsName(user.name + "は空高く飛び上がり，" + enemy.name + "に向かって突っ込んだ！", "skyblue");
        enemy.receiveDamage = Math.ceil(user.currentHP * utility.random(20, 80) / 100);
        user.evasiveness += 999;

        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//ドラゴンブレス
artsEffect.dragonBreath = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        let hitAmount = utility.random(4, 10);
        returnData.message = shapeArtsName(user.name + "は灼熱の炎を吐いた！", "darkred");
        enemy.receiveDamage = hitAmount * user.power * utility.random(20, 45);
        enemy.evasiveness -= 9999999;
        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//彗星
artsEffect.commet = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = shapeArtsName("聖魔法・彗星！", "yellow");
        enemy.receiveDamage = (user.mana + user.jobLevel * user.religion) * utility.random(20, 50);
        enemy.evasiveness = -999999;
        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//審判
artsEffect.judgement = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = shapeArtsName("聖魔法・審判！", "gray");
        enemy.receiveDamage = (user.mana + user.jobLevel * user.religion) * utility.random(70, 100);
        enemy.evasiveness = -999999;
        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//福音
artsEffect.evangel = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        user.recoverHP = user.maxHP - user.currentHP;
        returnData.message = shapeArtsName("聖癒魔法・福音", "yellow");
        enemy.receiveDamage = user.attack;
        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//守りながら戦う
artsEffect.hitAndGuard = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = user.name + "は身を守っている．．．";
        enemy.receiveDamage = user.attack;
        user.damageCutPercent = 50;
        user.evasiveness += 0;

        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//浄化斬
artsEffect.cleansingSlash = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = shapeArtsName("浄化斬！", "gray");
        enemy.receiveDamage = (user.power + user.religion) * utility.random(75, 165);
        user.evasiveness -= 999999;

        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//オーラ
artsEffect.aura = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        user.weaponRatio *= 2;
        returnData.message = shapeArtsName("オーラ！" + user.name + "の武器の攻撃力が2倍！(効果継続・重複有効)", "gray");
        enemy.receiveDamage = user.attack;
        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//シラハドリ
artsEffect.shirahadori = {
    immediateEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    },
    delayedEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = shapeArtsName("真剣・シラハドリ！", "gray");
        enemy.receiveDamage = user.attack;
        user.receiveDamage = 0;
        user.evasiveness += 0;

        return returnData;
    }
}

//燕返し
artsEffect.tsubamegaeshi = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = shapeArtsName("秘剣・燕返し！", "gray");
        enemy.receiveDamage = (user.power) * utility.random(75, 165);
        user.evasiveness -= 999999;

        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//斬鉄剣
artsEffect.zantetsuken = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = "斬"
        enemy.receiveDamage = enemy.attack;
        if (utility.random(1, 10) <= 8) {
            returnData.message += "　鉄";
            if (utility.random(1, 10) <= 7) {
                returnData.message += "　剣！！";
                enemy.receiveDamage = Math.ceil(enemy.currentHP * 1.1);
            } else {
                returnData.message += "．．．失敗！";
            }
        } else {
            returnData.message += "．．．失敗！";
        }
        returnData.message = shapeArtsName(returnData.message, "brown");
        enemy.evasiveness -= 999999;
        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//きあいだま
artsEffect.powerBall = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = shapeArtsName(user.name + "は気を固めて" + enemy.name + "に放った！", "gray");
        if (utility.random(1, 10) < 8) {
            enemy.receiveDamage = (user.power) * utility.random(75, 165);
        } else {
            returnData.message += "ミス！！";
            enemy.receiveDamage += 0;
        }

        user.evasiveness -= 999999;

        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//ばくれつけん
artsEffect.bulletPunches = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        let hitAmount = utility.random(1, 8);
        returnData.message = shapeArtsName(user.name + "は拳を雨霰のように放った！", "gray") + shapeHitAmount(hitAmount + "回 あたった！", "blue");
        enemy.receiveDamage += hitAmount * user.power * utility.random(10, 35);
        enemy.evasiveness -= 999999;
        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//破戒掌
artsEffect.violationalPalm = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = shapeArtsName("必殺・破戒掌", "gray");
        enemy.receiveDamage += (user.power + user.religion) * utility.random(105, 165);
        user.evasiveness -= 999999;

        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//シノビ斬り
artsEffect.shinobiSlash = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = shapeArtsName("シノビ斬り！", "purple");
        enemy.receiveDamage += (user.power + user.dexterity + user.agility) * utility.random(20, 50);
        user.evasiveness -= 999999;

        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//分身
artsEffect.doppelganger = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        let hitAmount = utility.random(1, 8);
        returnData.message = shapeArtsName(user.name + "は分身と共に攻撃を仕掛けた！", "yellow") + shapeHitAmount(hitAmount + "回 あたった！");
        enemy.receiveDamage += hitAmount * user.dexterity * utility.random(10, 35);
        enemy.evasiveness -= 999999;
        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//影一文字
artsEffect.shadowSlash = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = shapeArtsName(user.name + "は影より出でて一閃！", "purple");
        enemy.receiveDamage += (user.power + user.dexterity) * utility.random(100, 200);
        enemy.evasiveness -= 999999;
        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//あんこく
artsEffect.darkness = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        if (user.currentHP > user.maxHP / 8) {
            returnData.message = shapeArtsName("暗黒剣！(反動で自分にも" + Math.floor(user.maxHP / 8) + "ダメージ)", "purple");
            user.currentHP -= Math.floor(user.maxHP / 8);
            enemy.receiveDamage += (user.power + user.dexterity) * utility.random(100, 200);
            enemy.evasiveness -= 999999;
        
        } else {
            returnData.message = shapeArtsName("剣！", "black");
            enemy.receiveDamage += user.power * utility.random(1, 2);
        }
        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//ドレイン
artsEffect.drain = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = shapeArtsName("暗黒魔法ドレイン！", "purple");
        enemy.receiveDamage += (user.mana + user.power) * utility.random(20, 50);
        user.recoverHP = Math.ceil(enemy.receiveDamage / 2);
        user.evasiveness -= 999999;

        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//ライフエロージョン
artsEffect.lifeErosion = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = shapeArtsName("ライフエロージョン", "pink");
        enemy.receiveDamage += (user.mana + user.power) * utility.random(100, 150);
        user.recoverHP = Math.ceil(enemy.receiveDamage);
        user.evasiveness -= 999999;

        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}


artsEffect.deadlyMessage = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = "死のメッセージ！";
        enemy.receiveDamage = enemy.maxHP * 5;
        let lut = "DEATH";
        for (let i = 0; i < 5; ++i) {
            if (utility.random(1, 10) == 10) {
                returnData.message += "...失敗！";
                enemy.receiveDamage = calculateAttack(user);
                break;
            } else {
                returnData.message += lut[i];
            }
        }

        enemy.evasiveness -= 999999;
        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//繚炎斬
artsEffect.flameSlash = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = shapeArtsName("受けよ！繚炎斬！！", "darkred");
        enemy.receiveDamage += (user.power + user.mana) * utility.random(50, 100);
        enemy.evasiveness -= 999999;
        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//劫雷斬
artsEffect.thunderSlash = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = shapeArtsName("劫雷斬！！", "yellow");
        enemy.receiveDamage += (user.power + user.mana) * utility.random(100, 150);
        enemy.evasiveness -= 999999;
        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//オーラ斬り
artsEffect.auraSlash = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = shapeArtsName("オーラ斬り！！", "yellow");
        enemy.receiveDamage += (user.power + user.mana) * utility.random(0, 350);
        enemy.evasiveness -= 999999;
        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//芋虫スナイプ
artsEffect.snipe = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = shapeArtsName(user.name + "は隠れつつ狙いを定めた！", "green");
        enemy.receiveDamage += (user.power + user.dexterity) * utility.random(50, 80);
        enemy.evasiveness -= 999999;
        user.evasiveness += 100;
        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//乱れ撃ち
artsEffect.randomShot = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        let hitAmount = utility.random(1, 8);
        returnData.message = shapeArtsName("乱れ撃ち！", "green") + shapeHitAmount(hitAmount + "回 あたった！", "blue");
        enemy.receiveDamage += hitAmount * user.power * utility.random(10, 35);
        enemy.evasiveness -= 999999;
        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//急所を狙い撃つ
artsEffect.criticalShot = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
    
        if (utility.random(1, 4) === 1) {
            returnData.message = shapeArtsName("急所に狙いを定めた！", "blue");
            enemy.receiveDamage += enemy.currentHP;
            enemy.evasiveness -= 999999;
        } else {
            returnData = this.none(user, enemy);
        }
        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//メイルシュトローム
artsEffect.maelstrom = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = shapeArtsName("メイルシュトローム！！", "darkblue");
        enemy.receiveDamage += (user.power + user.mana + user.charm) * utility.random(0, 450);
        enemy.evasiveness -= 999999;
        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//オメガフレア
artsEffect.omegaFlare = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = shapeArtsName("オメガフレア！！", "darkred");
        enemy.receiveDamage += (user.power + user.mana + user.charm) * utility.random(150, 250);
        enemy.evasiveness -= 999999;
        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//円卓議決
artsEffect.roundDicision = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        let hitAmount = utility.random(1, 13);
        returnData.message = shapeArtsName(user.name + "は円卓の騎士を召喚した．．．", "royalblue") + shapeHitAmount(hitAmount + "人が協力した！！", "blue");
        enemy.receiveDamage += hitAmount * user.power * utility.random(100, 145);
        enemy.evasiveness -= 999999;
        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//アルテマ
artsEffect.ultima = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = shapeArtsName("禁断呪法アルテマ！！", "gray");
        enemy.receiveDamage += (user.power + user.mana + user.charm + user.karma) * utility.random(150, 450);
        enemy.evasiveness -= 999999;
        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//デジョン
artsEffect.desion = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = "時空魔法 デジョン！！";
        let color;
        if (utility.random(1, 3) === 1) {
            enemy.receiveDamage += enemy.currentHP;
            enemy.evasiveness -= 999999;
            color = "yellow";
        } else {
            enemy.receiveDamage += user.attack * utility.random(1, 4);
            returnData.message += "失敗した．．．";
            color = "blue";
        }
        returnData.message = shapeArtsName(returnData.message, color);
        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//グレートウェーブ
artsEffect.greatWave = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = shapeArtsName("グレートウェーブ！！", "royalblue");
        enemy.receiveDamage += (user.power + user.mana + user.charm + user.karma) * utility.random(250, 450);
        enemy.evasiveness -= 999999;
        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//クロスディバイド
artsEffect.crossDivide = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = shapeArtsName("クロスディバイド！！", "gray");
        enemy.receiveDamage += (user.power + user.religion + user.charm + user.karma) * utility.random(150, 450);
        enemy.evasiveness -= 999999;
        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}


//ホーリースラッシュ
artsEffect.holySlash = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = shapeArtsName("ホーリースラッシュ！！", "yellow");
        enemy.receiveDamage += (user.power + user.religion + user.charm + user.karma) * utility.random(1, 650);
        enemy.evasiveness -= 999999;
        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//悪裂斬
artsEffect.evilSlayer = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        let hitAmount = utility.random(1, 16);
        returnData.message = shapeArtsName("聖奥義・悪裂斬！", "gray") + shapeHitAmount(hitAmount + "回当たった！", "blue");
        enemy.receiveDamage += hitAmount * (user.power + user.religion + user.dexterity + user.karma + user.jobLevel) * utility.random(100, 155);
        enemy.evasiveness -= 999999;
        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//タロットカード
artsEffect.tarotCard = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = shapeArtsName(user.name + "はタロットカードを1枚表向きにした！", "yellow")
        switch (utility.random(0, 21)) {
            case 0:
                returnData.message += "THE MAGICIAN!!\n";
                enemy.receiveDamage += (user.mana + user.charm) * utility.random(1, 80);
                break;
            case 1:
                returnData.message += "THE CHALIOT!!\n";
                enemy.receiveDamage += (user.power + user.agility) * utility.random(1, 80);
                break;
            case 2:
                returnData.message += "STRENGTH!!\n";
                enemy.receiveDamage += (user.power + user.dexterity) * utility.random(1, 80);
                break;
            case 3:
                returnData.message += "THE HIGH PRIESTESS!!\n";
                user.recoverHP += (user.religion + user.mana) * utility.random(1, 90);
                break;
            case 4:
                returnData.message += "THE HIEROPHANT!!\n";
                enemy.receiveDamage += user.power + user.jobLevel * utility.random(1, 80);
                break;
            case 5:
                returnData.message += "THE EMPRESS!!\n";
                enemy.receiveDamage += user.power + user.jobLevel * utility.random(1, 120);
                break;
            case 6:
                returnData.message += "THE EMPEROR!!\n";
                enemy.receiveDamage += user.power + user.jobLevel * utility.random(1, 180);
                break;
            case 7:
                returnData.message += "THE LOVERS!!\n";
                user.recoverHP += user.power * user.jobLevel * utility.random(1, 180);
                break;
            case 8:
                returnData.message += "THE HERMIT!!\n";
                enemy.receiveDamage += user.agility + user.dexterity * utility.random(1, 180);
                break;
            case 9:
                returnData.message += "WHEEL of FORTUNE!!\n";
                enemy.receiveDamage += user.karma * user.karma * utility.random(1, 80);
                break;
            case 10:
                returnData.message += "JUSTICE!!\n";
                enemy.receiveDamage += Math.floor(enemy.currentHP / 4);
                break;
            case 11:
                returnData.message += "THE HANGEDMAN!!\n";
                break;
            case 12:
                returnData.message += "DEATH!!\n";
                enemy.receiveDamage += enemy.currentHP;
                break;
            case 13:
                returnData.message += "TEMPERANCE!!\n";
                enemy.receiveDamage += enemy.attack * utility.random(10, 90);
                break;
            case 14:
                returnData.message += "THE DEVIL!!\n";
                user.receiveDamage += user.maxHP;
                break;
            case 15:
                returnData.message += "THE TOWER!!\n";
                enemy.recoverHP += user.attack * utility.random(1, 90);
                break;
            case 16:
                returnData.message += "THE STAR!!\n";
                enemy.receiveDamage += user.karma * user.jobLevel * utility.random(1, 90);
                break;
            case 17:
                returnData.message += "THE MOON!!\n";
                user.recoverHP += enemy.attack * utility.random(10, 90);
                break;
            case 18:
                returnData.message += "THE SUN!!\n";
                enemy.receiveDamage += user.attack * utility.random(100, 900);
                break;
            case 19:
                returnData.message += "THE JUDGEMENT!\n";
                enemy.receiveDamage += enemy.attack * utility.random(100, 900);
                break;
            case 20:
                returnData.message += "THE WORLD!!\n";
                user.damageCutPercent = 100;
                enemy.receiveDamage += user.attack * utility.random(100, 900);
                break;
            default:
                returnData.message += "THE FOOL!!\n";
                enemy.receiveDamage += utility.random(0, 1);
                break;
        }

        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//タロットカード(倍)
artsEffect.tarotCardDouble = { 
    immediateEffect:(user, enemy) => {
        let returnData = artsEffect.tarotCard.immediateEffect(user, enemy);
        user.receiveDamage *= 2;
        user.recoverHP *= 2;
        enemy.receiveDamage *= 2;
        enemy.recoverHP *= 2;

        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//死の予言
artsEffect.deathForetold = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = user.name + "は死を予言した！！";
        if (utility.random(1, 2) === 1) {
            returnData.message += "「あんた死ぬわよ！！！」"
            enemy.receiveDamage += enemy.currentHP;
            enemy.evasiveness -= 999999;
        } else {
            if (utility.random(1, 10) !== 1) {
                enemy.receiveDamage += user.attack * utility.random(1, 3);
                returnData.message += "しかし，何も起こらなかった．．．";
            } else {
                returnData.message += "「あたし死ぬわよ」";
                user.recoverHP -= user.maxHP * 114;
                enemy.receiveDamage += user.attack * utility.random(1, 2);
            }
        }

        returnData.message = shapeArtsName(returnData.message, "purple");
        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//バグライズソード
artsEffect.buglizeSword = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = "";
        if (enemy.element !== "monster") {
            returnData.message += "ソード！！(ここでは力を発揮できないようだ．．．)";
            enemy.receiveDamage += user.attack * utility.random(1, 5);
        } else {
            if (user.itemInventory[21] > 0) {
                returnData.message += "バグライズソード！！！" + "(バグのかけらを1つ消費した)";
                enemy.receiveDamage += user.attack * utility.random(0, 1296);
                user.itemInventory[21] -= 1;
           
            } else {
                returnData.message += "ソード！！" + "(何かが不足しているようだ．．．)";
                enemy.receiveDamage += user.attack * utility.random(1, 10);
            }
        }

        returnData.message = shapeArtsName(returnData.message, "purple");
        enemy.evasiveness -= 999999;
        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//黒魔法
artsEffect.blackMagics = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = shapeArtsName("黒魔法", "black") + shapeArtsName("ファイア！", "red");
        enemy.receiveDamage += user.mana * utility.random(25, 100);
        if (utility.random(1, 100) < 90) {
            returnData.message += shapeArtsName("サンダー！", "yellow");
            enemy.receiveDamage += user.mana * utility.random(25, 120);
        }
        if (utility.random(1, 100) < 80) {
            returnData.message += shapeArtsName("アイスストーム！", "royalblue");
            enemy.receiveDamage += user.mana * utility.random(25, 150);
        }
        if (utility.random(1, 100) < 60) {
            returnData.message += shapeArtsName("アルテマ！", "gray");
            enemy.receiveDamage += user.mana * utility.random(25, 250);
        }
        enemy.receiveDamage += (user.power + user.religion + user.dexterity + user.karma + user.jobLevel) * utility.random(100, 155);
        enemy.evasiveness -= 999999;
        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//ダムネーション
artsEffect.damnation = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = shapeArtsName("滅べ！！", "gray");
        enemy.receiveDamage += (user.power + user.mana + user.religion + user.vitality + user.agility + user.dexterity + user.charm + user.karma) * utility.random(100, 800);
        enemy.evasiveness -= 999999;
        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//闇と同化
artsEffect.saturate = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = shapeArtsName(user.name + "は闇と同化して襲い掛かった．．．！", "gray");
        enemy.receiveDamage += (user.power + user.mana + user.religion + user.vitality + user.agility + user.dexterity + user.charm + user.karma) * utility.random(0, 900);
        enemy.evasiveness -= 999999;
        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//卍魔殿
artsEffect.pandemonium = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = shapeArtsName("卍魔殿！！", "purple");
        enemy.receiveDamage += (user.power + user.mana + user.religion + user.vitality + user.agility * 2 + user.dexterity + user.charm + user.karma) * utility.random(0, 1300);
        enemy.evasiveness -= 999999;
        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//ベホマ
artsEffect.behoma = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = shapeArtsName("ベホマ！！！", "gray");
        user.recoverHP += (user.power + user.mana + user.religion + user.vitality + user.agility + user.dexterity + user.charm + user.karma) * utility.random(0, 1300);
        enemy.evasiveness -= 999999;
        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//メドローア
artsEffect.medoroa = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = shapeArtsName("禁忌魔法・メドローア！！", "purple");
        enemy.receiveDamage += (user.power + user.mana * 2 + user.religion + user.vitality + user.agility + user.dexterity + user.charm + user.karma) * utility.random(0, 1300);
        enemy.evasiveness -= 999999;
        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//無限拳
artsEffect.infinitPunch = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = shapeArtsName("無限拳！！", "gray");
        enemy.receiveDamage += (user.power + user.mana + user.religion + user.vitality + user.agility + user.dexterity + user.charm + user.karma) * utility.random(0, 900);
        enemy.evasiveness -= 999999;
        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//ジャスティスワン
artsEffect.justiceOne = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = shapeArtsName("ジャスティスワン！！", "gray");
        enemy.receiveDamage += (user.power + user.mana + user.religion + user.vitality + user.agility + user.dexterity + user.charm + user.karma) * utility.random(0, 1300);
        enemy.evasiveness -= 999999;
        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//SIN-悪裂斬
artsEffect.SINevilSlayer = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = shapeArtsName("SIN-悪裂斬！！", "gray");
        enemy.receiveDamage += (user.power + user.mana + user.religion + user.vitality + user.agility + user.dexterity + user.charm + user.karma) * utility.random(0, 900);
        enemy.evasiveness -= 999999;
        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//矛槍三段
artsEffect.triAttack = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = shapeArtsName("矛槍三段！！", "gray");
        enemy.receiveDamage += (user.power + user.mana + user.religion + user.vitality + user.agility + user.dexterity + user.charm + user.karma) * utility.random(0, 1300);
        enemy.evasiveness -= 999999;
        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//ゼタスラッシュ
artsEffect.zetaSlash = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = shapeArtsName("必殺・ゼタスラッシュ！！", "blue");
        enemy.receiveDamage += (user.power + user.mana + user.religion + user.vitality + user.agility + user.dexterity + user.charm + user.karma) * utility.random(100, 900);
        enemy.evasiveness -= 999999;
        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//デストレイル
artsEffect.kingSlash = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = shapeArtsName("デストレイル！！", "purple");
        enemy.receiveDamage += (user.power + user.mana + user.religion + user.vitality + user.agility + user.dexterity + user.charm + user.karma) * utility.random(100, 1300);
        enemy.evasiveness -= 999999;
        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//グロリアス
artsEffect.glorious = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = shapeArtsName("グロリアス！！", "gray");
        enemy.receiveDamage += (user.power + user.mana + user.religion + user.vitality + user.agility + user.dexterity + user.charm + user.karma) * utility.random(100, 1460);
        enemy.evasiveness -= 999999;
        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//ファイナルブレイカー
artsEffect.finalBreaker = {
    immediateEffect:function(user, enemy) {
        let returnData = {};
        returnData.message = shapeArtsName("神魔法・ファイナルブレイカー！！！", "gray");
        console.log(enemy.receiveDamage);
        enemy.receiveDamage += (user.power + user.mana + user.religion + user.vitality + user.agility + user.dexterity + user.charm + user.karma) * utility.random(100, 2400);
        console.log(enemy.receiveDamage);
        enemy.evasiveness -= 999999;
        return returnData;
    },
    delayedEffect : function (user, enemy) {
        let returnData = {};
        returnData.message = "";
        return returnData;
    }
}

//必殺技の表示形成
let shapeArtsName = function(artsName, color){  
    return '<span class="arts'+color+'">'+artsName+"</span>";
}

//ヒット回数の表示形成
let shapeHitAmount = function (hitAmount, color) {
    return '<span class="hitAmount'+color+'">'+hitAmount+"</span>";
}


module.exports = artsEffect;
