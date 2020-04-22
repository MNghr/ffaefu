let itemEffect = require("../effects/itemEffect.js");
let itemInformation = {};
itemInformation.itemList = [
    { id: 0,  name: "きよめの雫", value: 5000000, effect: itemEffect.resistFire ,statement:"敵から受ける炎属性ダメージを0にします．"},
    { id: 1,  name: "避雷針", value: 5000000, effect: itemEffect.resistThunder ,statement:"敵から受ける雷属性ダメージを0にします．"},
    { id: 2,  name: "炎蜥蜴の牙", value: 5000000, effect: itemEffect.resistIce ,statement:"敵から受ける氷属性ダメージを0にします．"},
    { id: 3,  name: "水結晶", value: 500000, effect: itemEffect.reflectFire ,statement:"敵から受ける炎属性ダメージを0にし，受けるはずだったダメージを敵に与えます．"},
    { id: 4, name: "黒い石", value: 1000000, effect: itemEffect.reflectThunder, statement: "敵から受ける雷属性ダメージを0にし，受けるはずだったダメージを敵に与えます．" },
    { id: 5, name: "レッドファング", value: 1000000, effect: itemEffect.reflectIce, statement: "敵から受ける氷属性ダメージを0にし，受けるはずだったダメージを敵に与えます．" },
    { id: 6, name: "白い砂", value: 1000000, effect: itemEffect.none, statement: "敵のHPが回復した時に発動します．自身も同じ量だけ回復します．" },
    { id: 7, name: "神秘のオーブ", value: 1000000, effect: itemEffect.none, statement: "敵のHPが回復した時に発動します．自身のHPを大きく回復します．" },
    { id: 8, name: "魔法のブーメラン", value: 1000000, effect: itemEffect.none, statement: "敵から受ける炎，雷，氷属性ダメージを0にし，受けるはずだったダメージを敵に与えます．" },
    { id: 9, name: "戒めの粉", value: 7000000, effect: itemEffect.none, statement: "敵が禁断魔法を使用した際のみ発動します．そのダメージを敵に与えます．" },
    { id: 10, name: "戒めのお守り", value: 600000000, effect: itemEffect.none, statement: "敵が禁断魔法を使用した際のみ発動します．そのダメージを増幅し，敵に与えます．" },
    { id: 11, name: "ブライノイズ", value: 7000000, effect: itemEffect.none, statement: "敵が時空魔法を使用した際のみ発動します．そのダメージを1/2にします．" },
    { id: 12, name: "次元障壁", value: 600000000, effect: itemEffect.none, statement: "敵が時空魔法を使用した際のみ発動します．そのダメージを0にします．" },
    { id: 13, name: "騎士の盾", value: 7000000, effect: itemEffect.none, statement: "敵が斬鉄剣を使用した際のみ発動します．そのダメージを1/2にします．" },
    { id: 14, name: "勇者の盾", value: 600000000, effect: itemEffect.none, statement: "敵が斬鉄剣を使用した際のみ発動します．そのダメージを0にします．" },
    { id: 15, name: "不死身の雫", value: 7000000, effect: itemEffect.none, statement: "自分のHPが0になったとき，確定で発動します．HPを最大HPの1/200にします．" },
    { id: 16, name: "不死身の土塊", value: 600000000, effect: itemEffect.none, statement: "自分のHPが0になったとき，確定で発動します．HPを最大HPの1/20にします．" },
    { id: 17, name: "不死身の果実", value: 600000000, effect: itemEffect.none, statement: "自分のHPが0になったとき，確定で発動します．HPを最大HPの1/2にします．" },
    { id: 18, name: "学習装置", value: 7000000, effect: itemEffect.none, statement: "持っているだけでモンスター戦後に得られる経験値が少し増えます．戦闘後一定確率で破損します．" },
    { id: 19, name: "しあわせタマゴ", value: 600000000, effect: itemEffect.none, statement: "持っているだけでモンスター戦後に得られる経験値がそれなりに増えます．戦闘後一定確率で破損します．" },
    { id: 20, name: "AGEシステム", value: 600000000, effect: itemEffect.none, statement: "持っているだけでモンスター戦後に得られる経験値がかなり増えます．戦闘後一定確率で破損します．" },
    { id: 21, name: "バグのかけら", value: 600000000, effect: itemEffect.none, statement: "無用の長物にも見える欠片．とある使い道があるらしい．．．？" },
];

module.exports = itemInformation;