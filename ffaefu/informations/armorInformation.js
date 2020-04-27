let armorEffect = require("../effects/armorEffect.js");
let armorInformation = {};
armorInformation.armorList = [
    { id: 0, defence: 0, name: "インナー", value: 0, effect: armorEffect.none, powerBias:0,manaBias:0,},
    { id: 1, defence: 50, name: "革の鎧", value: 10000, effect: armorEffect.none },
    { id: 2, defence: 100, name: "チェーンメイル", value: 100000, effect: armorEffect.none },
    { id: 3, defence: 500, name: "バトルアーマー", value: 500000, effect: armorEffect.none },
    { id: 4, defence: 1000, name: "戦士の鎧", value: 1000000, effect: armorEffect.none },

    { id: 5, defence: 20, name: "旅人の服", value: 0, effect: armorEffect.none },
    { id: 6, defence: 50, name: "絹のローブ", value: 10000, effect: armorEffect.none },
    { id: 7, defence: 100, name: "麻のローブ", value: 100000, effect: armorEffect.none },
    { id: 8, defence: 500, name: "水のはごろも", value: 500000, effect: armorEffect.none },
    { id: 9, defence: 1000, name: "黒いローブ", value: 1000000, effect: armorEffect.none },

    { id: 10, defence: 50, name: "信者の衣", value: 10000, effect: armorEffect.none },
    { id: 11, defence: 100, name: "修道者の衣", value: 100000, effect: armorEffect.none },
    { id: 12, defence: 500, name: "神官の衣", value: 500000, effect: armorEffect.none },
    { id: 13, defence: 1000, name: "白いローブ", value: 1000000, effect: armorEffect.none },

    { id: 14, defence: 0, name: "革の鎧", value: 0, effect: armorEffect.none, powerBias: 0, manaBias: 0, },
    { id: 15, defence: 50, name: "鱗の鎧", value: 10000, effect: armorEffect.none },
    { id: 16, defence: 100, name: "レザーメイル", value: 100000, effect: armorEffect.none },
    { id: 17, defence: 500, name: "リネンキュラッサ", value: 500000, effect: armorEffect.none },

    { id: 18, defence: 1000, name: "長靴", value: 1000000, effect: armorEffect.none },
    { id: 19, defence: 20, name: "土塊", value: 0, effect: armorEffect.none },
    { id: 20, defence: 50, name: "粘土の鎧", value: 10000, effect: armorEffect.none },
    { id: 21, defence: 100, name: "土の衣", value: 100000, effect: armorEffect.none },

    { id: 22, defence: 500, name: "革の服", value: 500000, effect: armorEffect.none },
    { id: 23, defence: 1000, name: "冒険者の服", value: 1000000, effect: armorEffect.none },
    { id: 24, defence: 50, name: "魔術師の服", value: 10000, effect: armorEffect.none },
    { id: 25, defence: 100, name: "嵐のヴェール", value: 100000, effect: armorEffect.none },

    { id: 26, defence: 500, name: "詩人の衣", value: 500000, effect: armorEffect.none },
    { id: 27, defence: 1000, name: "シルフの羽衣", value: 1000000, effect: armorEffect.none },
    { id: 28, defence: 50, name: "シルフの羽衣", value: 10000, effect: armorEffect.none },
    { id: 29, defence: 100, name: "レインボレロ", value: 100000, effect: armorEffect.none },

    { id: 30, defence: 500, name: "奴隷の服", value: 500000, effect: armorEffect.none },
    { id: 31, defence: 1000, name: "囚人服", value: 1000000, effect: armorEffect.none },
    { id: 32, defence: 500, name: "ボロ切れ", value: 500000, effect: armorEffect.none },
    { id: 33, defence: 1000, name: "発明家の服", value: 1000000, effect: armorEffect.none },
    { id: 34, defence: 1000, name: "リボン", value: 1000000, effect: armorEffect.none },

    { id: 35, defence: 50, name: "青銅の胸当て", value: 10000, effect: armorEffect.none },
    { id: 36, defence: 100, name: "金剛の胸当て", value: 100000, effect: armorEffect.none },
    { id: 37, defence: 500, name: "白銀の胸当て", value: 500000, effect: armorEffect.none },
    { id: 38, defence: 1000, name: "金剛の征衣", value: 1000000, effect: armorEffect.none },

    { id: 39, defence: 50, name: "サバイバルベスト", value: 10000, effect: armorEffect.none },
    { id: 40, defence: 100, name: "アダマンベスト", value: 100000, effect: armorEffect.none },
    { id: 41, defence: 500, name: "ワイバンベスト", value: 500000, effect: armorEffect.none },
    { id: 42, defence: 1000, name: "ブリガンダイン", value: 1000000, effect: armorEffect.none },

    { id: 43, defence: 500, name: "フルプレート", value: 500000, effect: armorEffect.none },
    { id: 44, defence: 1000, name: "アイスアーマ", value: 1000000, effect: armorEffect.none },
    { id: 45, defence: 500, name: "ランドアーマ", value: 500000, effect: armorEffect.none },
    { id: 46, defence: 1000, name: "プラチナプレート", value: 1000000, effect: armorEffect.none },

    { id: 47, defence: 500, name: "羽織", value: 500000, effect: armorEffect.none },
    { id: 48, defence: 1000, name: "浅葱色の羽織", value: 1000000, effect: armorEffect.none },
    { id: 49, defence: 500, name: "毘沙門天の鎧", value: 500000, effect: armorEffect.none },
    { id: 50, defence: 1000, name: "平家の鎧", value: 1000000, effect: armorEffect.none },

    { id: 51, defence: 500, name: "道着", value: 500000, effect: armorEffect.none },
    { id: 52, defence: 1000, name: "気合のタスキ", value: 1000000, effect: armorEffect.none },
    { id: 53, defence: 500, name: "ブレイブレジスト", value: 500000, effect: armorEffect.none },
    { id: 54, defence: 1000, name: "ブレイブメイル", value: 1000000, effect: armorEffect.none },

    { id: 55, defence: 500, name: "鎖帷子", value: 500000, effect: armorEffect.none },
    { id: 56, defence: 1000, name: "シノビ衣", value: 1000000, effect: armorEffect.none },
    { id: 57, defence: 500, name: "威牙の装束", value: 500000, effect: armorEffect.none },
    { id: 58, defence: 1000, name: "光牙の装束", value: 1000000, effect: armorEffect.none },

    { id: 59, defence: 500, name: "骨の鎧", value: 500000, effect: armorEffect.none },
    { id: 60, defence: 1000, name: "呪の兜", value: 1000000, effect: armorEffect.none },
    { id: 61, defence: 500, name: "ディアボロスメイル", value: 500000, effect: armorEffect.none },
    { id: 62, defence: 1000, name: "魔刃の鎧", value: 1000000, effect: armorEffect.none },

    { id: 63, defence: 500, name: "雷の鎧", value: 500000, effect: armorEffect.none },
    { id: 64, defence: 1000, name: "氷の鎧", value: 1000000, effect: armorEffect.none },
    { id: 65, defence: 500, name: "ファイアメイル", value: 500000, effect: armorEffect.none },
    { id: 66, defence: 1000, name: "マジックプルーフ", value: 1000000, effect: armorEffect.none },

    { id: 67, defence: 500, name: "肩パッド", value: 500000, effect: armorEffect.none },
    { id: 68, defence: 1000, name: "チェインプレイト", value: 1000000, effect: armorEffect.none },
    { id: 69, defence: 500, name: "オーラアーマー", value: 500000, effect: armorEffect.none },
    { id: 70, defence: 1000, name: "フィフスアーマー", value: 1000000, effect: armorEffect.none },

    { id: 71, defence: 500, name: "マジックシールド", value: 500000, effect: armorEffect.none },
    { id: 72, defence: 1000, name: "シルバープレート", value: 1000000, effect: armorEffect.none },
    { id: 73, defence: 500, name: "ブループレート", value: 500000, effect: armorEffect.none },
    { id: 74, defence: 1000, name: "召喚士の装束", value: 1000000, effect: armorEffect.none },

    { id: 75, defence: 500, name: "皇帝の服", value: 500000, effect: armorEffect.none },
    { id: 76, defence: 1000, name: "大将の鎧", value: 1000000, effect: armorEffect.none },
    { id: 77, defence: 500, name: "皇帝の鎧", value: 500000, effect: armorEffect.none },
    { id: 78, defence: 1000, name: "第一帝国の護り", value: 1000000, effect: armorEffect.none },

    { id: 79, defence: 500, name: "オリハルコンの鎧", value: 500000, effect: armorEffect.none },
    { id: 80, defence: 1000, name: "アダマンメイル", value: 1000000, effect: armorEffect.none },
    { id: 81, defence: 500, name: "リジェネアーマー", value: 500000, effect: armorEffect.none },
    { id: 82, defence: 1000, name: "ホーリーシールド", value: 1000000, effect: armorEffect.none },

    { id: 83, defence: 500, name: "謎のローブ", value: 500000, effect: armorEffect.none },
    { id: 84, defence: 1000, name: "ストレンジローブ", value: 1000000, effect: armorEffect.none },
    { id: 85, defence: 500, name: "イデアルローブ", value: 500000, effect: armorEffect.none },
    { id: 86, defence: 1000, name: "天上の衣", value: 1000000, effect: armorEffect.none },

    { id: 87, defence: 500, name: "リフレクター", value: 500000, effect: armorEffect.none },
    { id: 88, defence: 1000, name: "バグメイル", value: 1000000, effect: armorEffect.none },
    { id: 89, defence: 500, name: "バグシールド", value: 500000, effect: armorEffect.none },
    { id: 90, defence: 1000, name: "バグフィールド", value: 1000000, effect: armorEffect.none },

    { id: 91, defence: 500, name: "トロの兜", value: 500000, effect: armorEffect.none },
    { id: 92, defence: 1000, name: "てんぷらの盾", value: 1000000, effect: armorEffect.none },
    { id: 93, defence: 500, name: "オリゴー糖の鎧", value: 500000, effect: armorEffect.none },
    { id: 94, defence: 1000, name: "オニオンアーマー", value: 1000000, effect: armorEffect.none },

    { id: 95, defence: 500, name: "黒装束", value: 500000, effect: armorEffect.none },

    { id: 96, defence: 500, name: "インカの衣", value: 500000, effect: armorEffect.none },

    { id: 97, defence: 500, name: "聖なるトーガ", value: 500000, effect: armorEffect.none },

    { id: 98, defence: 500, name: "常勝の鎧", value: 500000, effect: armorEffect.none },

    { id: 99, defence: 500, name: "ホーリーメイル", value: 500000, effect: armorEffect.none },

    { id: 100, defence: 500, name: "光の鎧", value: 500000, effect: armorEffect.none },
    { id: 101, defence: 1, name: "発破の葉っぱ", value: 500000, effect: armorEffect.none },

    { id: 102, defence: 500, name: "フォースフィールド", value: 500000, effect: armorEffect.none },

];

module.exports = armorInformation;