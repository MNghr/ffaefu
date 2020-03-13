let fs = require("fs");
module.exports = function (req, res, next) {
    let userId = req.session.user.userId;
    if (userId) {
        fs.readFile('./database/userData' + userId + ".json", 'utf-8',function (err,data) {
            if (!err) {
                res.locals.user = JSON.parse(data);
            }
        });
    }
    next();
};