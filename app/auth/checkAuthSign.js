const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        var token = jwt.sign({foo: 'bar'}, process.env.JWT_SECRET, {expiresIn: 5000});
        res.cookie('auth', token);
        console.log('Auth Signed');
        next();
        
    }catch(error){
        return res.status(400).json({
            message: "Auth Failed",
            token: req.cookies.auth
        });
    }
};