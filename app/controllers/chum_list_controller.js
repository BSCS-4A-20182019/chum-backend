const db = require('../models/conn');
require('dotenv').config();

exports.handler_getChumList= (req, res, next)=>{
    let search_sql = `SELECT count(username) as count FROM chum_user where username = '${req.params.username}'`;
    db.query(search_sql, (err, result)=>{
        var usersRows = JSON.parse(JSON.stringify(result));
        console.log(usersRows);
        if (usersRows[0].count===0){
            res.status(404).json({
                status : process.env.notfnd,
                message : 'User Not found'
            });
        }
        else{
        
            let search_sql = `SELECT chum_id FROM chum_list where username = '${req.params.username}' `;
            db.query(search_sql, (err, rows, result)=>{
                if (err) throw err;
                if (rows.length===0){
                    res.status(404).json({message: 'You have no chums'});
                }
                else{
                    res.status(200).send({chumlist: rows});
                }
            });
        }
    });
}

exports.handler_getChumListNumber= (req, res, next)=>{
    let search_sql = `SELECT count(username) as count FROM chum_user where username = '${req.params.username}'`;
    db.query(search_sql, (err, result)=>{
        var usersRows = JSON.parse(JSON.stringify(result));
        console.log(usersRows);
        if (usersRows[0].count===0){
            res.status(404).json({
                message : 'User Not found'
            });
        }
        else{
            let search_sql = `SELECT chum_id FROM chum_list where username = '${req.params.username}' `;
            db.query(search_sql, (err, rows, result)=>{
                if (err) throw err;
                if (rows.length===0){
                    res.status(404).json({status : process.env.notfnd,
                                        message: 'You have no chums'});
                }
                else{
                    
                    res.status(200).json({message: rows.length});
                }
            });
        }
    });
}
