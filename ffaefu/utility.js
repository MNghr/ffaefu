let fs = require("fs");
let utility = {};

utility.random = function (min, max) {
    if (min > max) {
        let tmp = min;
        min = max;
        max = tmp;
    }
    let ret = Math.ceil(Math.random() * (max - min + 1) + min - 1);
    return ret;
}

utility.deposit = function(user,amount) {
    if (user.money < amount)
        return;    
    user.money -= amount;
    user.bank += amount;
    this.writeUser(user);
}

utility.fullDeposit = function(user) {
    let amount = user.money;
    this.deposit(user, amount);    
}

utility.withdraw = function (user, amount) {
    console.log(amount);
    amount = Math.min(amount, user.bank);
    user.bank -= amount;
    user.money += amount;
    this.writeUser(user);
}

utility.fullWithdraw = function(user) {
    let amount = 0;
    amount = Math.min(user.bank, 1000000000000 - user.money);
    this.withdraw(user, amount);    
}

utility.writeUser = function(user) {
    fs.writeFileSync('./database/userData' + user.userId + ".json", JSON.stringify(user));
    console.log("ファイル書き込み完了！");
}

utility.calculateAttack = function (user) {
    //職業によって計算するところを今は力をそのまま返すことにする．
    return user.power;
}

utility.getDate = function () {
    let date = new Date();
    return date;
}

utility.getTime = function () {
    let date = new Date();
    return date.getTime();
}

utility.calculateStamina = function (lastBattleDate) {
    let now = new Date();
    return Math.min(600, Math.floor((now.getTime() - lastBattleDate)/1000));
}

module.exports = utility;