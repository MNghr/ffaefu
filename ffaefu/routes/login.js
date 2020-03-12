let express = require('express');
let router = express.Router();
let fs = require('fs');

router.get('/', function (req, res, next) {
    res.redirect('/status');
});

module.exports = router;
