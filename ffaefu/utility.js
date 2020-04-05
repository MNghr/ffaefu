//ユーザ，武器防具装飾品等の各種情報を全く必要としない関数を収録(一緒くたにすると循環参照みたいなことが起こるため)
let utility = {};
utility.getDate = function () {
    let date = new Date();
    return date;
}

utility.getTime = function () {
    let date = new Date();
    return date.getTime();
}

utility.random = function (min, max) {
    if (min > max) {
        let tmp = min;
        min = max;
        max = tmp;
    }
    let ret = Math.ceil(Math.random() * (max - min + 1) + min - 1);
    return ret;
}

module.exports = utility;