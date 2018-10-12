const db = require('../app/models/conn');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const expressValidator = require('express-validator');
const updateLevel = require('../app/models/levelupdate');
require('dotenv').config();


exports.handler_get= (req, res, next)=>{
    res.status(200).json({
        status : process.env.OK,
        message : 'This is the signup form'
    });
}

exports.post_account= (req, res, next)=>{
    req.checkBody('username', 'Username field cannot be emptied').notEmpty();
    req.checkBody('username', 'Username field must be between 5-20 characters long').len(5, 20);
    req.checkBody('username', 'Username and password must not be matched').not().equals(req.body.password);
    req.checkBody('password', 'Password cannot be emptied').notEmpty();
    req.checkBody('password', 'Password must be between 8-100 characters long').len(8, 100);
    req.checkBody('password', 'Password must be between 8-100 characters, at least one uppercase letter, one lowercase letter, one number and one special character').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, "i");
    req.checkBody('lastname', 'Lastname cannot be emptied').notEmpty();
    req.checkBody('lastname', 'Firstname cannot be emptied').notEmpty();
    req.checkBody('email', 'Email cannot be emptied').notEmpty();
    req.checkBody('email', 'Email is invalid').isEmail();
    req.checkBody('email', 'Email must be between 4-50 characters long').len(4, 50);

    var errorV = req.validationErrors();

    if(errorV){
        return res.status(401).json({
            error: errorV
        });
    }
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err){
            return res.status(500).json({
                error: err
            });
        }else{
            let post = {username: req.body.username,
                password: hash,
            };
            let post2 = {
                username:req.body.username,
                birthdate: req.body.birthdate,
                email: req.body.email,
                lastname:req.body.lastname,
                firstname:req.body.firstname,
                gender:req.body.gender,
                type: process.env.type1
            };
            let post3 = {
                username: req.body.username,
                rank_like:0,
                rank_share:0,
                rank_chum: 0,
                chum_level: 1,
                chum_levelname: process.env.levelname
            };
            let post4 = {
                username: req.body.username,
                chum_req_like: 3,
                chum_req_list: 3,
                chum_req_share: 1,
                chum_req_level: 5,
                chum_addreq_like: 3,
                chum_addreq_share: 1,
                chum_addreq_list: 3
            }
            var username = req.body.username;
            let search_sql = `SELECT username FROM chum_user where username =?`;
            db.query(search_sql, username, (err, rows, result)=>{
                console.log(username);
                console.log(result);
                if(err) throw err;
                if (rows.length===0){
                        console.log(rows.length);
                        let insert_sql = `INSERT INTO chum_user SET ?`;
                        let insert2_sql = `INSERT INTO chum_profile SET ?`;
                        let insert3_sql = `INSERT INTO chum_rank SET ?`;
                        let insert4_sql = `INSERT INTO chum_rank_requirements SET ?`;
                        db.query(insert_sql, post, (err, result)=> {
                            if (err) throw err;
                            console.log(result);
                            res.status(process.env.OK).json({
                                status : process.env.OK,
                                message : 'Account Created'});
                        });
                        db.query(insert2_sql, post2, (err, result)=> {
                            if (err) throw err;
                            console.log(result);
                        });
                        db.query(insert3_sql, post3, (err, result)=>{
                            if (err) throw err;
                            console.log(result);
                        });
                        db.query(insert4_sql, post4, (err, result)=>{
                            if (err) throw err;
                            console.log(result);
                    });
                }
                else{
                    res.status(400).json({
                        status : process.env.badreq,
                        message : 'Username already taken'
                    });
                }
            });
        }
    });
}

    exports.users_list=(req, res, next)=>{
        let search_sql = `SELECT username FROM chum_user `;
        db.query(search_sql, (err, rows, result)=>{
            if(err){
            res.status(500).json({
                    error: err
                });
            }
            else{
                res.status(200).send({
                    rows: rows
                });
            }

    });
}

exports.users_list=(req, res, next)=>{
    let search_sql = `SELECT * FROM chum_profile `;
    db.query(search_sql, (err, rows, result)=>{
        if(err){
        res.status(500).json({
                error: err
            });
        }
        else{
            res.status(200).send({
                rows: rows
            });
        }

});
}

exports.user_list=(req, res, next)=>{
    let search_sql = `SELECT chum_profile.username, chum_profile.lastname, chum_profile.firstname, chum_rank.chum_level, chum_rank.chum_levelname
    FROM chum_profile
    INNER JOIN chum_rank
    ON chum_profile.username = chum_rank.username
    WHERE chum_profile.username ='${req.params.username}' `;
    db.query(search_sql, (err, rows, result)=>{
        if(err){
        res.status(500).json({
                error: err
            });
        }
        else{
            res.status(200).send({
                rows: rows
            });
        }

});
}
