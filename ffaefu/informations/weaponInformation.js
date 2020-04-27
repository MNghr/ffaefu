let weaponEffect = require("../effects/weaponEffect.js");
let weaponInformation = {};
weaponInformation.weaponList = [
    { id: 0, attack: 0, name: "徒手空拳", value: 0, effect: weaponEffect.none },
    { id: 1, attack: 50, name: "棒切れ", value: 10000, effect: weaponEffect.none },
    { id: 2, attack: 100, name: "銅の剣", value: 100000, effect: weaponEffect.none },
    { id: 3, attack: 1000, name: "ローグソード", value: 1000000, effect: weaponEffect.none },
    { id: 4, attack: 9900, name: "バスタードソード", value: 10000000, effect: weaponEffect.none },

    { id: 5, attack: 50, name: "木の杖", value: 10000, effect: weaponEffect.none },
    { id: 6, attack: 1000, name: "応力の杖", value: 100000, effect: weaponEffect.none },
    { id: 7, attack: 5000, name: "毒針", value: 1000000, effect: weaponEffect.none },
    { id: 8, attack: 9600, name: "アイアンロッド", value: 10000000, effect: weaponEffect.none },

    { id: 9, attack: 20, name: "くたびれた本", value: 10000, effect: weaponEffect.none },
    { id: 10, attack: 2500, name: "釘バット", value: 100000, effect: weaponEffect.none },
    { id: 11, attack: 5000, name: "メイス", value: 1000000, effect: weaponEffect.none },
    { id: 12, attack: 7200, name: "ゾンビキラー", value: 10000000, effect: weaponEffect.none },

    { id: 13, attack: 20, name: "錆びたナイフ", value: 10000, effect: weaponEffect.none },
    { id: 14, attack: 500, name: "ブロンズナイフ", value: 100000, effect: weaponEffect.none },
    { id: 15, attack: 5000, name: "シミター", value: 1000000, effect: weaponEffect.none },
    { id: 16, attack: 9000, name: "グラディウス", value: 10000000, effect: weaponEffect.none },

    { id: 17, attack: 20, name: "マッドロッド", value: 10000, effect: weaponEffect.none },
    { id: 18, attack: 500, name: "ソイルロッド", value: 100000, effect: weaponEffect.none },
    { id: 19, attack: 5000, name: "クエイクロッド", value: 1000000, effect: weaponEffect.none },
    { id: 20, attack: 9000, name: "ディザスターロッド", value: 10000000, effect: weaponEffect.none },

    { id: 21, attack: 20, name: "そよかぜの弓", value: 10000, effect: weaponEffect.none },
    { id: 22, attack: 500, name: "竜巻の弓", value: 100000, effect: weaponEffect.none },
    { id: 23, attack: 5000, name: "ディザスターボウ", value: 1000000, effect: weaponEffect.none },
    { id: 24, attack: 9000, name: "春一番", value: 10000000, effect: weaponEffect.none },

    { id: 25, attack: 20, name: "防犯ブザー", value: 10000, effect: weaponEffect.none },
    { id: 26, attack: 500, name: "銀の竪琴", value: 100000, effect: weaponEffect.none },
    { id: 27, attack: 5000, name: "ダイヤモンドパグパイプ", value: 1000000, effect: weaponEffect.none },
    { id: 28, attack: 9000, name: "宙のオカリナ", value: 10000000, effect: weaponEffect.none },

    { id: 29, attack: 5000, name: "パーティグッズ", value: 1000000, effect: weaponEffect.none },

    { id: 30, attack: 9000, name: "白い魔法陣", value: 10000000, effect: weaponEffect.none },
    { id: 31, attack: 20, name: "黒い魔法陣", value: 10000, effect: weaponEffect.none },
    { id: 32, attack: 500, name: "緑の魔法陣", value: 100000, effect: weaponEffect.none },
    { id: 33, attack: 5000, name: "ムラサキの魔法陣", value: 1000000, effect: weaponEffect.none },

    { id: 34, attack: 9000, name: "くそのやり", value: 10000000, effect: weaponEffect.none },
    { id: 35, attack: 20, name: "ドラグーンランス", value: 10000, effect: weaponEffect.none },
    { id: 36, attack: 500, name: "ビーストランス", value: 100000, effect: weaponEffect.none },
    { id: 37, attack: 5000, name: "ブリューナク", value: 1000000, effect: weaponEffect.none },

    { id: 38, attack: 9000, name: "水晶杖", value: 10000000, effect: weaponEffect.none },
    { id: 39, attack: 5000, name: "ミスリルの杖", value: 1000000, effect: weaponEffect.none },
    { id: 40, attack: 5000, name: "アダマンタイトの杖", value: 1000000, effect: weaponEffect.none },
    { id: 41, attack: 5000, name: "裁きの錫杖", value: 1000000, effect: weaponEffect.none },

    { id: 42, attack: 9000, name: "ブロンズランス", value: 10000000, effect: weaponEffect.none },
    { id: 43, attack: 5000, name: "アイアンランス", value: 1000000, effect: weaponEffect.none },
    { id: 44, attack: 5000, name: "シルバーランス", value: 1000000, effect: weaponEffect.none },
    { id: 45, attack: 5000, name: "ミスリルランス", value: 1000000, effect: weaponEffect.none },

    { id: 46, attack: 9000, name: "ムラサメ", value: 10000000, effect: weaponEffect.none },
    { id: 47, attack: 5000, name: "へし切長谷部", value: 1000000, effect: weaponEffect.none },
    { id: 48, attack: 5000, name: "斬鉄剣", value: 1000000, effect: weaponEffect.none },
    { id: 49, attack: 0, name: "ムラマサ", value: 1000000, effect: weaponEffect.none },

    { id: 50, attack: 9000, name: "鉄の爪", value: 10000000, effect: weaponEffect.none },
    { id: 51, attack: 5000, name: "氷の爪", value: 1000000, effect: weaponEffect.none },
    { id: 52, attack: 5000, name: "炎の爪", value: 1000000, effect: weaponEffect.none },
    { id: 53, attack: 5000, name: "金剛の爪", value: 1000000, effect: weaponEffect.none },

    { id: 54, attack: 9000, name: "エンゲツクナイ", value: 10000000, effect: weaponEffect.none },
    { id: 55, attack: 5000, name: "カネサダ", value: 1000000, effect: weaponEffect.none },
    { id: 56, attack: 5000, name: "コテツ", value: 1000000, effect: weaponEffect.none },
    { id: 57, attack: 5000, name: "風魔手裏剣", value: 1000000, effect: weaponEffect.none },

    { id: 58, attack: 9000, name: "アンチライト", value: 10000000, effect: weaponEffect.none },
    { id: 59, attack: 5000, name: "デスソード", value: 1000000, effect: weaponEffect.none },
    { id: 60, attack: 5000, name: "暗黒剣", value: 1000000, effect: weaponEffect.none },
    { id: 61, attack: 5000, name: "破戒の剣", value: 1000000, effect: weaponEffect.none },
    { id: 62, attack: 9000, name: "ダークアームブレード", value: 10000000, effect: weaponEffect.none },
    
    { id: 63, attack: 5000, name: "サイコバレット", value: 1000000, effect: weaponEffect.none },
    { id: 64, attack: 5000, name: "サイコソード", value: 1000000, effect: weaponEffect.none },
    { id: 65, attack: 5000, name: "纏魔剣", value: 1000000, effect: weaponEffect.none },
    { id: 66, attack: 5000, name: "纏魔斧", value: 1000000, effect: weaponEffect.none },
    { id: 67, attack: 5000, name: "フォースブレイド", value: 1000000, effect: weaponEffect.none },

    { id: 68, attack: 5000, name: "AK47", value: 1000000, effect: weaponEffect.none },
    { id: 69, attack: 5000, name: "M70", value: 1000000, effect: weaponEffect.none },
    { id: 70, attack: 5000, name: "トカレフTT-33", value: 1000000, effect: weaponEffect.none },
    { id: 71, attack: 5000, name: "M1911R1", value: 1000000, effect: weaponEffect.none },
    { id: 72, attack: 5000, name: "サイコガン", value: 1000000, effect: weaponEffect.none },

    { id: 73, attack: 5000, name: "虹の魔法陣", value: 1000000, effect: weaponEffect.none },
    { id: 74, attack: 5000, name: "虹の召喚陣", value: 1000000, effect: weaponEffect.none },

    { id: 75, attack: 9000, name: "皇帝の刀", value: 10000000, effect: weaponEffect.none },
    { id: 76, attack: 5000, name: "皇帝の槌", value: 1000000, effect: weaponEffect.none },
    { id: 77, attack: 5000, name: "月刃ディアナ", value: 1000000, effect: weaponEffect.none },
    { id: 78, attack: 5000, name: "新月刃ニクス", value: 1000000, effect: weaponEffect.none },

    { id: 79, attack: 9000, name: "ナイトソード", value: 10000000, effect: weaponEffect.none },
    { id: 80, attack: 5000, name: "ファイターソード", value: 1000000, effect: weaponEffect.none },
    { id: 81, attack: 5000, name: "パラディンソード", value: 1000000, effect: weaponEffect.none },
    { id: 82, attack: 5000, name: "ゲッテルンデメルング", value: 1000000, effect: weaponEffect.none },

    { id: 83, attack: 9000, name: "徳用タロットカードセット", value: 10000000, effect: weaponEffect.none },
    { id: 84, attack: 5000, name: "月刊クリスタルと共に生きる", value: 1000000, effect: weaponEffect.none },
    { id: 85, attack: 5000, name: "白い水晶玉", value: 1000000, effect: weaponEffect.none },
    { id: 86, attack: 5000, name: "ムラサキの水晶", value: 1000000, effect: weaponEffect.none },

    { id: 87, attack: 9000, name: "ビームソード", value: 10000000, effect: weaponEffect.none },
    { id: 88, attack: 5000, name: "オメガブラスター", value: 1000000, effect: weaponEffect.none },
    { id: 89, attack: 5000, name: "エレメントソード", value: 1000000, effect: weaponEffect.none },
    { id: 90, attack: 5000, name: "シュベルトゲベール", value: 1000000, effect: weaponEffect.none },

    { id: 91, attack: 9000, name: "マスタードソード", value: 10000000, effect: weaponEffect.none },
    { id: 92, attack: 5000, name: "エクスカリパー", value: 1000000, effect: weaponEffect.none },
    { id: 93, attack: 5000, name: "トロのつるぎ", value: 1000000, effect: weaponEffect.none },
    { id: 94, attack: 5000, name: "オニオンソード", value: 1000000, effect: weaponEffect.none },

    { id: 95, attack: 5000, name: "スリケン", value: 1000000, effect: weaponEffect.none },
    { id: 96, attack: 5000, name: "サナトスサイス", value: 1000000, effect: weaponEffect.none },

    { id: 97, attack: 9000, name: "蒙昧の鞭", value: 10000000, effect: weaponEffect.none },

    { id: 98, attack: 5000, name: "破壊の鉄球", value: 1000000, effect: weaponEffect.none },

    { id: 99, attack: 5000, name: "メタルフィスト", value: 1000000, effect: weaponEffect.none },

    { id: 100, attack: 5000, name: "大魔導士のロッド", value: 1000000, effect: weaponEffect.none },

    { id: 101, attack: 5000, name: "マナの剣", value: 1000000, effect: weaponEffect.none },

    { id: 102, attack: 5000, name: "神剣グラヴィティ・レイプ", value: 1000000, effect: weaponEffect.none }

];

module.exports = weaponInformation;