const passport = require('passport');
const db = require('../models/conn');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.chum_login = (req, res, next)=>{
    var username = req.body.username;
    var password = req.body.password;
    var password_sql = `SELECT password FROM chum_user WHERE username='${username}'`;
    var username_sql = `SELECT username FROM chum_user WHERE username='${username}'`;
    // var token_sql = `SELECT token FROM chum_user WHERE username='${username}'`;

    // db.query(token_sql, username, (err, resultT)=>{
    //     if(err) throw err;
    //     var tokenRows = JSON.parse(JSON.stringify(resultT));
    db.query(username_sql, (err, resultU)=>{
        if(err) throw err;
        if(resultU.length === 1){
            db.query(password_sql, (err, resultP)=>{
                if (err) throw err;
                if(resultP){
                    var hash = resultP[0].password.toString();
                    bcrypt.compare(password, hash, (err, result)=>{
                        if (err) throw err;
                        if(result === true){
                            let var_id = 'SELECT LAST_INSERT_ID() as user_id';
                                db.query(var_id, function(err, results, fields){
                                    if(err) throw err;
        
                                    var user_id = results[0];

                                    console.log(user_id);
                                    req.login(user_id, function(err){
                                        res.json({
                                            message: 'Logged in'
                                        });
                                    });
                                });
                        } else{
                            res.status(404).json({
                                message: "Wrong password"
                            });
                        }
                    });
                }
            });
        }else{
            res.status(404).json({
                message: "Wrong Username"
            });
        }
    });
//  });
}

exports.chum_logout = (req, res, next)=>{
    req.logout();
    req.session.destroy();
    res.status(200).json({
        message: 'logged out'
    });

    console.log(req.user);
    console.log(req.isAuthenticated());
}

exports.chum_profile = (req, res, next)=>{
    res.status(200).json({
        message: 'logged in'
    });
    console.log(req.user);
    console.log(req.isAuthenticated());
}

exports.chum_restrict = (req, res, next)=>{
    res.status(200).json({
        message: 'Restricted'
    });
}

passport.serializeUser(function(user_id, done){
    done(null, user_id);
});

passport.deserializeUser(function(user_id, done){
    done(null, user_id);
});
