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
let sql = `SELECT username, timeDate, post_word, chum_like, chum_share, chum_comment FROM chum_post WHERE username IN (SELECT chum_id FROM chum_list WHERE username = '${req.params.username}')`;
let sqlshare = `SELECT share_uname, share_word, share_caption, dateTime, share_pic, share_like FROM chum_share WHERE username IN (SELECT share_uname FROM chum_share WHERE username = '${req.params.username}')`;
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

exports.handler_sharePost= (req, res, next)=>{
    let sql = `SELECT username, post_word, post_pic FROM chum_post WHERE post_id='${req.params.postid}'`;
    db.query(sql,(err, rows, fields)=>{
       if (err){
        throw err;
       }
       if (rows.length===0){
        res.status(404).json({message: 'Post not found'});
       }
       else{
           var word = rows[0].post_word;
           var user = rows[0].username;
           var pic = rows[0].post_pic;
           let post = {share_caption: req.body.message,
            share_pic: pic,
            share_word: word,
            share_uname: user,
            share_like: 0,
            post_id: req.params.postid,
            username: req.params.username,
            share_comment: 0

    };
    let sql =  `INSERT into chum_share SET ?`;
    let sql_select = `SELECT chum_share FROM chum_post WHERE post_id = '${req.params.postid}'`;
    let sqlcounter = `UPDATE chum_post SET ? WHERE post_id = '${req.params.postid}'`;
    
    db.query(sql, post, (err, result)=>{
    if(err){
        throw err;
    }
    else{
        db.query(sql_select, (err, result)=>{
            if(err) throw err;
            var getShare = result[0].chum_share;
            getShare = getShare+1;
            let share = {
                chum_share: getShare
            };
            db.query(sqlcounter, share, (err, result)=>{
                if (err) throw err;
            });
        });
        var message = req.params.username + " has shared your post.";
        var notif = {notif:message, username: user };
        let notif_sql = `INSERT INTO chum_notification SET ?`;
        db.query(notif_sql, notif,(err, result)=>{
                if (err){
                    throw err;
                }
                else{
                    console.log(result);
                    res.status(200).json( {message: 'Shared!'});
                }
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
                    });
                });

                var user = result[0].username;
                var message = req.params.username + " has commented on your post.";
                var notif = {notif:message, username: user };
                let notif_sql = `INSERT INTO chum_notification SET ?`;
                db.query(notif_sql, notif,(err, result)=>{
                        if (err){
                            throw err;
                        }
                        else{
                            console.log(result);
                            res.status(200).json( {message: 'Commented!'});
                        }
                });
            }
        
    });
    }
    });
}
exports.handler_likes= (req, res, next)=>{
   
    let sql = `SELECT username, chum_like FROM chum_post WHERE post_id='${req.params.postid}'`;
    
    db.query(sql, (err, rows)=>{
        if (err){
            throw err;
        }
        if (rows.length===0){
            res.status(404).json({message: 'Post not found'});
        }
        else{
           var like = rows[0].chum_like;
           var uname = rows[0].username;
           like = like+1;
           let update_sql = `UPDATE chum_post SET chum_like = '${like}' WHERE post_id = '${req.params.postid}'`;
           db.query(update_sql, (err, result)=>{
                var message = req.params.username + " has liked your post.";
                var notif = {notif:message, username: uname };
                let notif_sql = `INSERT INTO chum_notification SET ?`;
                db.query(notif_sql, notif,(err, result)=>{
                        if (err){
                            throw err;
                        }
                        else{
                            res.status(200).json( {message: 'Liked!'});
                        }
                });
                
           });
        }
    });
}

exports.handler_unlikes= (req, res, next)=>{
   
    let sql = `SELECT chum_like FROM chum_post WHERE post_id='${req.params.postid}'`;
    
    db.query(sql, (err, fields)=>{
        if (err){
            throw err;
        }
        if (fields.length===0){
            res.status(404).json({message: 'Post not found'});
        }
        else{
           var like =fields[0].chum_like;
           like = like-1;
           let update_sql = `UPDATE chum_post SET chum_like = '${like}' WHERE post_id = '${req.params.postid}'`;
           db.query(update_sql, (err, result)=>{
            res.status(200).json( {message: 'Unliked!'});
           });
        }
    });
}
