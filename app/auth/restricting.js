module.exports = function authenticationMiddleware () {
    return (req, res, next) => {

        console.log(req.user);
        console.log(req.isAuthenticated());
        if (req.isAuthenticated()) return next();

        res.redirect('api/official/chum/restricted');

    }
}