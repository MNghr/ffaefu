let fs = require("fs");
module.exports = function (req, res, next) {
    let userId;
    if (req.session.user !== undefined)
        userId = req.session.user.userId;
    if (userId !== undefined) {
        fs.readFile('./database/userData' + userId + ".json", 'utf-8',function (err,data) {
            if (!err) {
                console.log(data);
                res.locals.user = JSON.parse(data);
                console.log(res.locals.user);
            }
        });
    }
    next();
};