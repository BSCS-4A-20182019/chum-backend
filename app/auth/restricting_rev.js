module.exports = function authenticationMiddleware () {
    return (req, res, next) => {
        // console.log(
        //     `req.session.passport.user: ${JSON.stringify(req.session.passport)}`
        // );
        
        console.log(req.user);
        console.log(req.isAuthenticated());
<<<<<<< HEAD
        if (req.isAuthenticated()) return res.redirect('/api/official/chum/login');
        
        next();
=======
        if (req.isAuthenticated()) {
            res.redirect('api/official/chum/restricted');
        }else{
            next();
        }
>>>>>>> togle
    }
}