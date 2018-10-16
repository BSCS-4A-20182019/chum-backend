module.exports = function authenticationMiddleware () {
    return (req, res, next) => {
        // console.log(
        //     `req.session.passport.user: ${JSON.stringify(req.session.passport)}`
        // );
        
        console.log(req.user);
        console.log(req.isAuthenticated());
        if (req.isAuthenticated()) return res.redirect('/api/official/chum/login');
        
        next();

    }
}