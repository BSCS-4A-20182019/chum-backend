module.exports = function authenticationMiddleware () {
    return (req, res, next) => {

        console.log(req.user);
        console.log(req.isAuthenticated());
        if (req.isAuthenticated()) return next();

<<<<<<< HEAD
        res.redirect('/api/official/chum/restricted');
=======
        res.redirect('api/official/chum/restricted');
>>>>>>> togle

    }
}