module.exports = (req, res, next) => {
    if (!req.session.logined || req.session.email === "") {
        res.redirect('/user/login');
    } else {
        next();
    }
}
