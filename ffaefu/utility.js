let fs = require("fs");
let utility = {};

utility.getExp = function(user, amount){
    user.exp += amount;
    this.levelup(user);
}

utility.levelup =  function(user) {
    levelDifference = 0;
    while (user.level * 300 < user.exp) {
        user.exp -= (user.level)*300
        ++user.level;
        ++levelDifference;
    }
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
    console.log(this.deposit);
    console.log(this);
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

module.exports = utility;