const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const token = req.cookies.auth;

        jwt.verify(token, process.env.JWT_KEY, (err, decoded)=>{
            console.log('Auth Verified'+" "+token);
            next();
        });

    }catch(error){
        return res.status(400).json({
            message: "Auth Failed",
            token: req.cookies.auth
        });
    }
};