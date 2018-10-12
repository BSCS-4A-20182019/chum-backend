const db = require('../models/conn');
require('dotenv').config();

exports.handler_writePost= (req, res, next)=>{
    let post = {post_word: req.body.message,
                post_pic: req.body.pic,
                chum_like: 0,
                chum_share: 0,
                chum_comment: 0,
                username: req.params.username    
    };
    let sql =  `INSERT into chum_post SET ?`;
    db.query(sql, post, (err, result)=>{
        if(err){
            throw err;
        }
        else{
            console.log(result);
            res.status(200).json( {message: 'Posted!'});
        }
    });
}

exports.handler_getPost= (req, res, next)=>{
let sql = `SELECT username, timeDate, post_word, chum_like, chum_share, chum_comment FROM chum_post WHERE username = '${req.params.username}'`;
let sqlshare = `SELECT share_uname, share_word, share_caption, dateTime, share_pic, share_like FROM chum_share WHERE username = '${req.params.username}'`;
db.query(sql, (err, result)=>{
    console.log(result.length);
    if (err){
        throw err;
    }
    if (result.length===0){
        db.query(sqlshare, (err, results)=>{
            console.log(results.length);
            if (err) throw err;
            if (results.length===0){
                res.status(200).json({
                    post: 'No post',
                    share: 'No share'
                });
            }
            else{
                res.status(200).json({
                    
                    post: 'No post',
                    share: results
                });
            }
        });
    }
    else{
        db.query(sqlshare, (err, results)=>{
            console.log(results.length);
            if (err) throw err;
            if (results.length===0){
                res.status(200).json({
                    post: result,
                    share: 'No share'
                });
            }
            else{
                res.status(200).json({
                    
                    post: result,
                    share: results
                });
            }
        });
    }
});
    
}


exports.handler_commentPost= (req, res, next)=>{
    let search_user = `SELECT username FROM chum_post where post_id ='${req.params.postid}'`;
    
    let post = {comment: req.body.message,
        post_id: req.params.postid,
        username: req.params.username,
        type: 'post'
    };
    let sql =  `INSERT into chum_comment SET ?`;
    let sql_select = `SELECT chum_comment FROM chum_post WHERE post_id = '${req.params.postid}'`;
    let sqlcounter = `UPDATE chum_post SET ? WHERE post_id = '${req.params.postid}'`;
    db.query(sql, post, (err, result)=>{
    if(err){
        throw err;
        
    }
    else{
        db.query(search_user, (err,result)=>{
            if(err){
                throw err;
                
            }
            if(result.length===0){
                res.status(404).json({message: 'Post not found'});
            }
            else{

                db.query(sql_select, (err, result)=>{
                    if(err) throw err;
                    var getComment = result[0].chum_comment;
                    getComment = getComment+1;
                    let comment = {
                        chum_comment: getComment
                    };
                    db.query(sqlcounter, comment, (err, result)=>{
                        if (err) throw err;
                        res.status(200).json( {message: 'Commented!'});
                    });
                });
            }
        
    });
    }
    });
}


