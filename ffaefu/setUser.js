let fs = require("fs").promises;
let utility = require("./utility.js");
module.exports = function (req, res, next) {
    (async () => {
        let userId;
        if (req.session.user !== undefined)
            userId = req.session.user.userId;
        if (userId !== undefined) {
            [res.locals.user,
             res.locals.equipInventory,
                res.locals.itemInventory,
             res.locals.artsInventory
            ] = await utility.readAllDataOfUser({ userId: userId });
            
            console.log(res.locals.user);
        }

        next();
    })().catch(next)
};