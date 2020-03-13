module.exports = function (req, res, next) {
    userId = req.session.user_id;
    if (userId) {
        //リソースファイルからユーザの情報を引っ張る
    }
    next();
};