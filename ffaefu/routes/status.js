var express = require('express');
var router = express.Router();
let session

/* GET users listing. */
router.get('/', function (req, res, next){
    if (req.session.user !== undefined) {
        res.render('status', {
            title: "FFA えふ改",
            subTitle: "ステータス画面",
            user: req.session.user
        });
    } else {
        res.redirect('/');
    }
});



module.exports = router;