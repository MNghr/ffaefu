let fs = require("fs");
module.exports = function (req, res, next) {
    let userId;
    if (req.session.user !== undefined)
        userId = req.session.user.userId;
    if (userId !== undefined) {
        res.locals.user = JSON.parse(fs.readFileSync('./database/userData' + userId + ".json", 'utf-8'));
        
        console.log(res.locals.user);
    }

    next();
};