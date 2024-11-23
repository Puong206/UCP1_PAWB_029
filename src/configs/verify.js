module.exports = {
    isLogin(req, res, next) {
        if (req.session.user) {
            return next();
        }
        res.redirect("/login");
    },
    isLogout(req, res, next) {
        if(req.session.loggedin !== true) {
            next();
            return;
        }
        res.redirect('/');
    }
}