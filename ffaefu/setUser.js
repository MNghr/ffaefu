let fs = require("fs").promises;
let utility = require("./utility.js");
module.exports = function (req, res, next) {
    (async () => {
        let userId;
        if (req.session.user !== undefined)
            userId = req.session.user.userId;
        if (userId !== undefined) {
            res.locals.user = JSON.parse(await fs.readFile('./database/userData/' + userId + "/"+userId+".json", 'utf-8'));
        
            console.log(res.locals.user);
        }

        next();
    })().catch(next)
};