let fs = require("fs").promises;
let usersPeripheral = require("./usersPeripheral.js");
let utility = require("./utility.js");
module.exports = function (req, res, next) {
    (async () => {
        if (req.session.user !== undefined) {
            req.session.user.lastInputTime = utility.getTime();
            usersPeripheral.addPlayingPlayer(req.session.user);
            console.log("プレイヤー最終入力時刻更新");
        }

        next();
    })().catch(next)
};