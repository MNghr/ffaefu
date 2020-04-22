//各種設定
let configuration = {};

configuration.vsMonsterStamina = 0; //モンスターと戦う時の消費スタミナ

configuration.vsChampionStamina = 0; //チャンピオンと闘う際の消費スタミナ

configuration.vsLegendPlaceStamina = 240;//勝ち抜きボスバトルに挑む時の消費スタミナ

configuration.gameTitle = "FFA えふ改 ver1.0"; //サイト名

configuration.jobMasterLevel = 60;//ジョブマスターに必要なジョブレベル．デフォルトでは60でマスター

configuration.maxStamina = 600; //スタミナの上限値

configuration.turnLimit = 150;

configuration.degree = ["駆け出し", "冒険者", "熟練者", "勇者", "蓋世の英雄"]; //各レジェンドプレイス初攻略時に変化する称号．

configuration.maxMoney = 1000000000000;

configuration.isDebugMode = true; //デバッグモード．trueにしておくと技という技が常時発動するようになるので，デバッグしたいときにどうぞ．

configuration.vsMonsterDropItem = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
];

configuration.guerrillaDangeonDropItem = [
    [13, 14, 15, 16, 17, 18]
]

configuration.legendPlaceDropItem = [
    [],
    [],
    [],
    []
];

module.exports = configuration;