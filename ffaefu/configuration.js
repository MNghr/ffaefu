//各種設定
let configuration = {};

configuration.vsMonsterStamina = 0; //モンスターと戦う時の消費スタミナ

configuration.vsChampionStamina = 0; //チャンピオンと闘う際の消費スタミナ

configuration.vsLegendPlaceStamina = 240;//勝ち抜きボスバトルに挑む時の消費スタミナ

configuration.gameTitle = "FFA えふ改 ver1.0"; //サイト名

configuration.jobMasterLevel = 60;//ジョブマスターに必要なジョブレベル．デフォルトでは60でマスター

configuration.maxStamina = 600; //スタミナの上限値

configuration.maxWorldMessage = 1000; //全プレイヤー向けメッセージの最大要素数  ユーザ向けに表示する数では無いので，サーバのスペックと相談して決めてね

configuration.basicShowWorldMessageLines = 10; //全プレイヤー向けメッセージの基本的な表示行数 これは画面デザインと相談して決めてね  

configuration.turnLimit = 150;//戦闘時の制限ターン デフォルトなら150ターンをこえると逃げる(モンスター戦)か引き分け(チャンプ戦)になる．

configuration.degree = ["駆け出し", "冒険者", "熟練者", "勇者", "蓋世の英雄"]; //各レジェンドプレイス初攻略時に変化する称号．

configuration.maxItem = 99;//アイテムの所持数上限

 //プレイヤー回避率の計算式 ※装備による補正はふくめ ないよ！
configuration.calculateNaturalEvasive = (user) => {
    return Math.min(50, Math.ceil(user.agility / 20.0));
};

//プレイヤー命中率の計算式 ※同上
configuration.calculateNaturalAccuracy = (user) => { 
    return Math.min(150, Math.ceil(user.dexterity / 10.0) + 51);
};

 //プレイヤー必殺率の計算式 ※同上
configuration.calculateNaturalArtsActivation = (user) => {
    return Math.min(75,Math.ceil(user.karma / 15.0) + 10 + user.jobLevel);
};

configuration.maxMoney = 1000000000000; //所持金の上限額

configuration.maxBank = 10000000000000; //預金の上限額

//1LvUpに要求される経験値
configuration.requiredExperience = (user) => {
    return user.level * 300;
};

//ゲリラダンジョンの敵レベル設定，デフォなら~99の時最弱，100~500の時中くらい，500~999の時かなり，それ以上の時とても強い敵が出てくるように設定
configuration.guerrillaDangeonEnemyLevel = (user) => {
    if (user.level < 100)
        return 0;
    else if (user.level < 500)
        return 1;
    else if (user.level < 1000)
        return 2;
    else
        return 3;
}

configuration.isDebugMode = true; //デバッグモード．trueにしておくと技という技が常時発動するようになるので，デバッグしたいときにどうぞ．

configuration.itemDropRate = 0.10;//基本的なアイテムドロップ率

//「モンスターと戦う」で拾えるアイテムのテーブル．上から順に でそれぞれ拾えるアイテムのリスト
configuration.vsMonsterDropItem = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
];

//ゲリラダンジョンで拾えるアイテムのリスト．同じ要素を増やせば拾得確率も調節可能
configuration.guerrillaDangeonDropItem = [
    [13, 14, 15, 16, 17, 18]
]
//レジェンドプレイスで拾えるアイテムのリスト．といってもデフォでは拾わないように設定．
configuration.legendPlaceDropItem = [
    [],
    [],
    [],
    []
];

configuration.isGuerrillaAppeared = function (user) {
    return user.level % 3 === 0
}

configuration.vsMonsterName = [
    "その辺の原っぱ(弱い敵が出現)",
    "近くの洞窟(ちょっと強い敵が出現)",
    "ミンティアの塔(そこそこ強い敵が出現)",
    "上の世界(とても強い敵が出現)"
]

configuration.legendPlaceName = [
    "試しのほこら",
    "ガイアフォース",
    "戒めの洞窟",
    "グレイヴヤード"
];

configuration.showPlayingPlayerTime = 600; //ログイン中のプレイヤー表示時間(秒) 削除処理の実行は分単位なので最大59秒ずれるけど気にしなくていいでしょ別に

module.exports = configuration;