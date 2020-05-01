let itemEffect = require("../effects/itemEffect.js");
let itemInformation = {};

//combat:敵の行動確定後，ダメージがHPに反映される前に発動．phaseZero:ダメージがHPに反映された後，即ちターンとターンの間に発動．immediate:購入直後に発動(所謂ドーピングアイテムが街頭)．afterCombat:戦闘終了時に発動．passive:自分から効果を発揮することはなく，技の効果中に作用したり消費されたりする．
itemInformation.itemList = [
    { id: 0,  name: "きよめの雫", value: 5000000, effect: itemEffect.resistFire ,statement:"敵から受ける炎属性ダメージを0にします．",kind:"combat"},
    { id: 1,  name: "避雷針", value: 5000000, effect: itemEffect.resistThunder ,statement:"敵から受ける雷属性ダメージを0にします．",kind:"combat"},
    { id: 2,  name: "炎蜥蜴の牙", value: 5000000, effect: itemEffect.resistIce ,statement:"敵から受ける氷属性ダメージを0にします．",kind:"combat"},
    { id: 3,  name: "水結晶", value: 5000000, effect: itemEffect.reflectFire ,statement:"敵から受ける炎属性ダメージを0にし，受けるはずだったダメージを敵に与えます．",kind:"combat"},
    { id: 4, name: "黒い石", value: 10000000, effect: itemEffect.reflectThunder, statement: "敵から受ける雷属性ダメージを0にし，受けるはずだったダメージを敵に与えます．" ,kind:"combat"},
    { id: 5, name: "レッドファング", value: 10000000, effect: itemEffect.reflectIce, statement: "敵から受ける氷属性ダメージを0にし，受けるはずだったダメージを敵に与えます．" ,kind:"combat"},
    { id: 6, name: "白い砂", value: 10000000, effect: itemEffect.none, statement: "敵のHPが回復した時に発動します．自身も同じ量だけ回復します．" ,kind:"combat"},
    { id: 7, name: "神秘のオーブ", value: 1000000000, effect: itemEffect.none, statement: "敵のHPが回復した時に発動します．自身のHPを大きく回復します．" ,kind:"combat"},
    { id: 8, name: "魔法のブーメラン", value: 1000000, effect: itemEffect.none, statement: "敵から受ける炎，雷，氷属性ダメージを0にし，受けるはずだったダメージを敵に与えます．" ,kind:"combat"},
    { id: 9, name: "戒めの粉", value: 7000000, effect: itemEffect.none, statement: "敵が禁断魔法を使用した際のみ発動します．そのダメージを敵に与えます．", kind:"combat"},
    { id: 10, name: "戒めのお守り", value: 3000000000, effect: itemEffect.none, statement: "敵が禁断魔法を使用した際のみ発動します．そのダメージを増幅し，敵に与えます．",kind:"combat" },
    { id: 11, name: "次元障壁", value: 50000000000, effect: itemEffect.none, statement: "敵が時空魔法を使用した際のみ発動します．そのダメージを0にします．", kind:"combat"},
    { id: 12, name: "ブライノイズ", value: 3000000000, effect: itemEffect.none, statement: "敵が時空魔法を使用した際のみ発動します．そのダメージを1/2にします．",kind:"combat" },
    { id: 13, name: "勇者の盾", value: 30000000000, effect: itemEffect.annulZantetsuken, statement: "敵が斬鉄剣を使用した際のみ発動します．そのダメージを0にします．" ,kind:"combat"},
    { id: 14, name: "騎士の盾", value: 4000000000, effect: itemEffect.resistZantetsuken, statement: "敵が斬鉄剣を使用した際のみ発動します．そのダメージを1/2にします．" ,kind:"combat"},
    { id: 15, name: "不死身の雫", value: 10000000000, effect: itemEffect.none, statement: "自分のHPが0になったターンの終了時，確定で発動します．HPを最大HPの1/200にします．" ,kind:"phaseZero"},
    { id: 16, name: "不死身の土塊", value: 50000000000, effect: itemEffect.none, statement: "自分のHPが0になったターンの終了時，確定で発動します．HPを最大HPの1/20にします．" ,kind:"phaseZero"},
    { id: 17, name: "不死身の果実", value: 100000000000, effect: itemEffect.none, statement: "自分のHPが0になったターンの終了時，確定で発動します．HPを最大HPの1/2にします．" ,kind:"phaseZero"},
    { id: 18, name: "学習装置", value: 150000000000, effect: itemEffect.none, statement: "持っているだけでモンスター戦後に得られる経験値が少し増えます．戦闘後一定確率で破損します．" ,kind:"afterCombat"},
    { id: 19, name: "しあわせタマゴ", value: 200000000000, effect: itemEffect.none, statement: "持っているだけでモンスター戦後に得られる経験値がそれなりに増えます．戦闘後一定確率で破損します．" ,kind:"afterCombat"},
    { id: 20, name: "AGEシステム", value: 300000000000, effect: itemEffect.none, statement: "持っているだけでモンスター戦後に得られる経験値がかなり増えます．戦闘後一定確率で破損します．" ,kind:"afterCombat"},
    { id: 21, name: "バグのかけら", value: 600000000, effect: itemEffect.none, statement: "無用の長物にも見える欠片．とある使い道があるらしい．．．？" ,kind:"passive"},
];

module.exports = itemInformation;