const db = require('../models/conn');
const bcrypt = require('bcrypt');


exports.handler_editprofile= (req, res, next)=>{
    let uname_sql = `SELECT * FROM chum_profile WHERE username = ${req.params.username}`

    req.checkBody('lastname', 'Lastname cannot be emptied').notEmpty();
    req.checkBody('firstname', 'Firstname cannot be emptied').notEmpty();
    req.checkBody('password', 'Password cannot be emptied').notEmpty();
    req.checkBody('email', 'Email cannot be emptied').notEmpty();
    req.checkBody('email', 'Email is invalid').isEmail();
    req.checkBody('email', 'Email must be between 4-50 characters long').len(4, 50);
    
    var errorValid = req.validationErrors();

    if(errorValid) throw errorValid;

    db.query(uname_sql, (err, resultUser)=>{
        if(err) throw err;
        if(resultUser[0].length === 1){
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err){
                    return res.status(500).json({
                        error: err
                    });
                }else{
                    let update = {
                        lastname : req.body.lastname,
                        firstname : req.body.firstname,
                        email : req.body.email,
                        birthdate : req.body.birthdate,
                        bio : req.body.bio,
                        pic : req.body.pic,
                        gender: req.body.gender
                    }
                    let password = {password: hash};
                    let update_sql = `UPDATE chum_profile SET ? WHERE username = '${req.params.username}'`;
                    let update_sql2 = `UPDATE chum_user SET ? WHERE username = '${req.params.username}'`;
                    db.query(update_sql, update, (err, result) => {
                        if(err) throw err;
                        else{
                            db.query (update_sql2, password, (err, result)=>{
                                console.log(result);
                                res.status(200).json({
                                    message: 'UPDATED!!!'
                                });
                            });
                        }
                    });
                }
            });
        }else{
            res.status(400).json({
                message: 'Username not Found'
            });
        }
    });
}

exports.handler_accountsettings= (req, res, next)=>{
    let search_sql = `SELECT profile_id FROM chum_profile where username = '${req.params.username}'`;
            db.query(search_sql, (err, rows, result)=>{
                if (rows.length===0){
                    res.status(404).json({
                        message : 'User Not found'
                    });
                }
                else{
                    let search_sql = `SELECT type FROM chum_profile where username = '${req.params.username}' `;
                    db.query(search_sql, (err, result)=>{
                        if (err) throw err;
                        else{
                            res.status(200).send(result);
                        }
                    });
                }
            });
    
}

exports.handler_updateaccount= (req, res, next)=>{
    console.log(req.params.username);
    let search_sql = `SELECT username FROM chum_user where username = '${req.params.username}'`;
            db.query(search_sql, (err, rows, result)=>{
               if (err) throw err;
                if (rows.length===0){
                    res.status(404).json({
                        message : 'User Not found'
                    });
                }
                else{
                    let update_sql = `UPDATE chum_profile SET type = '${req.body.type}' WHERE username = '${req.params.username}'`;
                    db.query(update_sql, (err, result) => {
                        if(err) throw err;
                        console.log(result);
                        res.status(200).json({
                            message: "UPDATED!!!"
                        });
                    });
                }
            });
    
}

exports.handler_logout= (req, res, next)=>{
    req.logout();
    req.session.destroy();
    res.status(200).json({
        message: 'logged out'
    });

    console.log(req.user);
    console.log(req.isAuthenticated());
}




    
