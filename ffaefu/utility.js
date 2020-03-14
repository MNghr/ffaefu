let fs = require("fs");
let utility = {};

utility.levelup =  function(user) {
    levelDifference = 0;
    while (user.level * 300 < user.exp) {
        ++user.level;
        user.exp -= (user.level)*300
        ++levelDifference;
    }
}

utility.deposit = function(user,amount) {
    if (user.money < amount)
        return;    
    user.money -= amount;
    user.bank += amount;
    this.writeUser(user, function () { });
}

utility.fullDeposit = function(user) {
    let amount = user.money;
    console.log(this.deposit);
    console.log(this);
    this.deposit(user, amount);    
}

utility.withdraw = function (user, amount) {
    console.log(amount);
    amount = Math.min(amount, user.bank);
    user.bank -= amount;
    user.money += amount;
    this.writeUser(user, function () { });
}

utility.fullWithdraw = function(user) {
    let amount = 0;
    amount = Math.min(user.bank, 1000000000000 - user.money);
    this.withdraw(user, amount);    
}

utility.writeUser = function(user,callback) {
    fs.writeFile('./database/userData' + user.userId + ".json", JSON.stringify(user), function (err) {
        if (err) {
            console.log(err);
            console.log("ファイル書き込みエラー");
        }
        callback();
    });
}

module.exports = utility;