let fs = require("fs").promises;
let usersPeripheral = require("./usersPeripheral.js");
module.exports = function (req, res, next) {
    (async () => {
        let userId;
        if (req.session.user !== undefined)
            userId = req.session.user.userId;
        if (userId !== undefined) {
            res.locals.user = await usersPeripheral.readUser({ userId: userId });
            res.locals.user.legendPlaceProgress = 0;
            console.log(res.locals.user);
        }

        next();
    })().catch(next)
};