let weaponEffect = require("../effects/weaponEffect.js");
let weaponInformation = {};
weaponInformation.weaponList = [
    { id: 0, attack: 0, name: "徒手空拳", value: 0, effect: weaponEffect.none },

    { id: 1, attack: 50, name: "棒切れ", value: 10000, effect: weaponEffect.none },
    { id: 2, attack: 100, name: "銅の剣", value: 100000, effect: weaponEffect.none },
    { id: 3, attack: 3500, name: "ローグソード", value: 8800000, effect: weaponEffect.none },
    { id: 4, attack: 8800, name: "バスタードソード", value: 1000002000, effect: weaponEffect.none },

    { id: 5, attack: 450, name: "木の杖", value: 10000, effect: weaponEffect.none },
    { id: 6, attack: 1000, name: "応力の杖", value: 100000, effect: weaponEffect.none },
    { id: 7, attack: 1, name: "毒針", value: 13000000000, effect: weaponEffect.none },
    { id: 8, attack: 7600, name: "アイアンロッド", value: 104000000, effect: weaponEffect.none },

    { id: 9, attack: 20, name: "くたびれた本", value: 10, effect: weaponEffect.none },
    { id: 10, attack: 2500, name: "釘バット", value: 1800000, effect: weaponEffect.none },
    { id: 11, attack: 5000, name: "メイス", value: 46700000, effect: weaponEffect.none },
    { id: 12, attack: 7200, name: "ゾンビキラー", value: 98000000, effect: weaponEffect.none },

    { id: 13, attack: 20, name: "錆びたナイフ", value: 10, effect: weaponEffect.none },
    { id: 14, attack: 500, name: "ブロンズナイフ", value: 2300000, effect: weaponEffect.none },
    { id: 15, attack: 4800, name: "シミター", value: 47000000, effect: weaponEffect.none },
    { id: 16, attack: 7100, name: "グラディウス", value: 96000000, effect: weaponEffect.none },

    { id: 17, attack: 100, name: "マッドロッド", value: 10000, effect: weaponEffect.none },
    { id: 18, attack: 780, name: "ソイルロッド", value: 1300000, effect: weaponEffect.none },
    { id: 19, attack: 6200, name: "クエイクロッド", value: 46000000, effect: weaponEffect.none },
    { id: 20, attack: 9100, name: "ディザスターロッド", value: 330000000, effect: weaponEffect.none },

    { id: 21, attack: 70, name: "そよかぜの弓", value: 30000, effect: weaponEffect.none },
    { id: 22, attack: 500, name: "竜巻の弓", value: 300000, effect: weaponEffect.none },
    { id: 23, attack: 6400, name: "ディザスターボウ", value: 47000000, effect: weaponEffect.none },
    { id: 24, attack: 9600, name: "春一番", value: 390000000, effect: weaponEffect.none },

    { id: 25, attack: 100, name: "防犯ブザー", value: 31584, effect: weaponEffect.none },
    { id: 26, attack: 700, name: "銀の竪琴", value: 210000, effect: weaponEffect.none },
    { id: 27, attack: 5500, name: "ダイヤモンドパグパイプ", value: 47000000, effect: weaponEffect.none },
    { id: 28, attack: 9900, name: "宙のオカリナ", value: 430000000, effect: weaponEffect.none },

    { id: 29, attack: 19190, name: "パーティグッズ", value: 40000000000, effect: weaponEffect.none },

    { id: 30, attack: 1000, name: "白い魔法陣", value: 1000000, effect: weaponEffect.none },
    { id: 31, attack: 2100, name: "黒い魔法陣", value: 6000000, effect: weaponEffect.none },
    { id: 32, attack: 5500, name: "緑の魔法陣", value: 47000000, effect: weaponEffect.none },
    { id: 33, attack: 11000, name: "ムラサキの魔法陣", value: 990000000, effect: weaponEffect.none },

    { id: 34, attack: 931, name: "くそのやり", value: 931931, effect: weaponEffect.none },
    { id: 35, attack: 4000, name: "ドラグーンランス", value:  30000000, effect: weaponEffect.none },
    { id: 36, attack: 8000, name: "ビーストランス", value: 300000000, effect: weaponEffect.none },
    { id: 37, attack: 14000, name: "ブリューナク", value: 1400000000, effect: weaponEffect.none },

    { id: 38, attack: 100, name: "水晶杖", value: 10000, effect: weaponEffect.none },
    { id: 39, attack: 2400, name: "ミスリルの杖", value: 600000, effect: weaponEffect.none },
    { id: 40, attack: 5000, name: "アダマンタイトの杖", value: 20000000, effect: weaponEffect.none },
    { id: 41, attack: 15000, name: "裁きの錫杖", value: 6000000000, effect: weaponEffect.none },

    { id: 42, attack: 3000, name: "ブロンズランス", value: 10000, effect: weaponEffect.none },
    { id: 43, attack: 5000, name: "アイアンランス", value: 1000000, effect: weaponEffect.none },
    { id: 44, attack: 13000, name: "シルバーランス", value: 4000000000, effect: weaponEffect.none },
    { id: 45, attack: 17000, name: "ミスリルランス", value: 7000000000, effect: weaponEffect.none },

    { id: 46, attack: 9000, name: "ムラサメ", value: 670000000, effect: weaponEffect.none },
    { id: 47, attack: 14000, name: "ヤゲン=トーシロー", value: 10000000000, effect: weaponEffect.none },
    { id: 48, attack: 19999, name: "斬鉄剣", value: 19000000000, effect: weaponEffect.none },
    { id: 49, attack: 0, name: "ムラマサ", value: 999999999000, effect: weaponEffect.none },

    { id: 50, attack: 1000, name: "鉄の爪", value: 10000, effect: weaponEffect.none },
    { id: 51, attack: 1500, name: "氷の爪", value: 100000, effect: weaponEffect.none },
    { id: 52, attack: 1500, name: "炎の爪", value: 1400000, effect: weaponEffect.none },
    { id: 53, attack: 8000, name: "金剛の爪", value: 1000000000, effect: weaponEffect.none },

    { id: 54, attack: 4000, name: "エンゲツクナイ", value: 40000000, effect: weaponEffect.none },
    { id: 55, attack: 10000, name: "カネサダ", value: 2000000000, effect: weaponEffect.none },
    { id: 56, attack: 12000, name: "コテツ", value: 6000000000, effect: weaponEffect.none },
    { id: 57, attack: 18000, name: "風魔手裏剣", value: 15000000000, effect: weaponEffect.none },

    { id: 58, attack: 5000, name: "アンチライト", value: 10000000, effect: weaponEffect.none },
    { id: 59, attack: 7000, name: "デスソード", value: 400000000, effect: weaponEffect.none },
    { id: 60, attack: 14000, name: "暗黒剣", value: 8000000000, effect: weaponEffect.none },
    { id: 61, attack: 19999, name: "破戒の剣", value: 122500000000, effect: weaponEffect.none },
    { id: 62, attack: 22000, name: "ダークアームブレード", value: 25000000000, effect: weaponEffect.none },
    
    { id: 63, attack: 5000, name: "サイコバレット", value: 4000000, effect: weaponEffect.none },
    { id: 64, attack: 9800, name: "サイコソード", value: 700000000, effect: weaponEffect.none },
    { id: 65, attack: 17000, name: "纏魔剣", value: 7000000000, effect: weaponEffect.none },
    { id: 66, attack: 19000, name: "纏魔斧", value: 19500000000, effect: weaponEffect.none },
    { id: 67, attack: 25000, name: "フォースブレイド", value: 40000000000, effect: weaponEffect.none },

    { id: 68, attack: 9000, name: "AK47", value: 600000000, effect: weaponEffect.none },
    { id: 69, attack: 11000, name: "M70", value: 880000000, effect: weaponEffect.none },
    { id: 70, attack: 15000, name: "トカレフTT-33", value: 12400000000, effect: weaponEffect.none },
    { id: 71, attack: 18000, name: "M1911R1", value: 17000000000, effect: weaponEffect.none },
    { id: 72, attack: 23500, name: "サイコガン", value: 24000000000, effect: weaponEffect.none },

    { id: 73, attack: 12000, name: "虹の魔法陣", value: 4000000000, effect: weaponEffect.none },
    { id: 74, attack: 24000, name: "虹の召喚陣", value: 39000000000, effect: weaponEffect.none },

    { id: 75, attack: 12000, name: "皇帝の刀", value: 900000000, effect: weaponEffect.none },
    { id: 76, attack: 16000, name: "皇帝の槌", value: 1400000000, effect: weaponEffect.none },
    { id: 77, attack: 32767, name: "月刃ディアナ", value: 50000000000, effect: weaponEffect.none },
    { id: 78, attack: 32768, name: "新月刃ニクス", value: 50000000000, effect: weaponEffect.none },

    { id: 79, attack: 17000, name: "ナイトソード", value: 19000000000, effect: weaponEffect.none },
    { id: 80, attack: 19000, name: "ファイターソード", value: 23000000000, effect: weaponEffect.none },
    { id: 81, attack: 26000, name: "パラディンソード", value: 34000000000, effect: weaponEffect.none },
    { id: 82, attack: 33000, name: "ゲッテルデメルング", value: 70000000000, effect: weaponEffect.none },

    { id: 83, attack: 10000, name: "徳用タロットカードセット", value: 12000000000, effect: weaponEffect.none },
    { id: 84, attack: 14000, name: "月刊クリスタルと共に生きる", value: 17000000000, effect: weaponEffect.none },
    { id: 85, attack: 19000, name: "白い水晶玉", value: 19000000000, effect: weaponEffect.none },
    { id: 86, attack: 22000, name: "ムラサキの水晶", value: 24000000000, effect: weaponEffect.none },

    { id: 87, attack: 14000, name: "ビームソード", value: 90000000000, effect: weaponEffect.none },
    { id: 88, attack: 22000, name: "オメガブラスター", value: 13000000000, effect: weaponEffect.none },
    { id: 89, attack: 28000, name: "エレメントソード", value: 25000000000, effect: weaponEffect.none },
    { id: 90, attack: 32000, name: "シュベルトゲベール", value: 70000000000, effect: weaponEffect.none },

    { id: 91, attack: 72000, name: "マスタードソード", value: 99900000000, effect: weaponEffect.none },
    { id: 92, attack: 1, name: "エクスカリパー", value: 444000000000, effect: weaponEffect.none },
    { id: 93, attack: 106000, name: "トロのつるぎ", value: 106000000000, effect: weaponEffect.none },
    { id: 94, attack: 150000, name: "オニオンソード", value: 470000000000, effect: weaponEffect.none },

    { id: 95, attack: 120000, name: "スリケン", value: 440000000000, effect: weaponEffect.none },
    { id: 96, attack: 500000, name: "サナトスサイス", value: 50000000000, effect: weaponEffect.none },

    { id: 97, attack: 230000, name: "蒙昧の鞭", value: 556000000000, effect: weaponEffect.none },

    { id: 98, attack: 240000, name: "破壊の鉄球", value: 600000000000, effect: weaponEffect.none },

    { id: 99, attack: 240000, name: "メタルフィスト", value: 610000000000, effect: weaponEffect.none },

    { id: 100, attack: 300000, name: "大魔導士のロッド", value: 700000000000, effect: weaponEffect.none },

    { id: 101, attack: 400000, name: "EXカリバー", value: 740000000000, effect: weaponEffect.none },

    { id: 102, attack: 500000, name: "神剣グラヴィティ・レイプ", value: 999000000000, effect: weaponEffect.none }

];

module.exports = weaponInformation;