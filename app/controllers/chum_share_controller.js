const db = require('../models/conn');

exports.handler_sharelikes= (req, res, next)=>{
    let sql = `SELECT share_uname, share_like FROM chum_share WHERE share_id='${req.params.postid}'`;
    
    db.query(sql, (err, rows, fields)=>{
        if (err){
            throw err;
        }
        if (rows.length===0){
            res.status(404).json({message: 'Post not found'});
        }
        else{
           var like = rows[0].share_like;
           var uname = rows[0].share_uname;
           like = like+1;
           let update_sql = `UPDATE chum_share SET share_like = '${like}' WHERE share_id = '${req.params.postid}'`;
           db.query(update_sql, (err, result)=>{
                var message = req.params.username + " has liked your shared post.";
                var notif = {notif:message, username: uname };
                let notif_sql = `INSERT INTO chum_notification SET ?`;
                db.query(notif_sql, notif,(err, result)=>{
                        if (err){
                            throw err;
                        }
                        else{
                            res.status(200).json({message: 'Shared post liked'});
                        }
                });
                
           });
        }
    });
}

exports.handler_shareunlikes= (req, res, next)=>{
    let sql = `SELECT share_uname, share_like FROM chum_share WHERE share_id='${req.params.postid}'`;
    
    db.query(sql, (err, rows, fields)=>{
        if (err){
            throw err;
        }
        if (rows.length===0){
            res.status(404).json({message: 'Post not found'});
        }
        else{
           var like = rows[0].share_like;
           like = like-1;
           let update_sql = `UPDATE chum_share SET share_like = '${like}' WHERE share_id = '${req.params.postid}'`;
           db.query(update_sql, (err, result)=>{
                        if (err){
                            throw err;
                        }
                        else{
                            res.status(200).json({message: 'Shared post unliked'});
                        }
           });
        }
    });
}

exports.handler_share_commentPost= (req, res, next)=>{
    let search_user = `SELECT username FROM chum_share where share_id ='${req.params.postid}'`;
    let post = {comment: req.body.message,
        post_id: req.params.postid,
        username: req.params.username,
        type: 'shared'
    };
    let sql =  `INSERT into chum_comment SET ?`;
    let sql_select = `SELECT share_comment FROM chum_share WHERE share_id = '${req.params.postid}'`;
    let sqlcounter = `UPDATE chum_share SET ? WHERE share_id = '${req.params.postid}'`;
    db.query(sql, post, (err, result)=>{
    if(err){
        throw err;
    }
    else{
        db.query(search_user, (err, rows, result)=>{
            if(err){
                throw err;
            }
            if(rows.length===0){
                res.status(404).json({message: 'Post not found'});
            }
            else{

                db.query(sql_select, (err, result)=>{
                    if(err) throw err;
                    var getScomment = result[0].share_comment;
                    getScomment = getScomment+1;
                    let Scomment = {
                        share_comment: getScomment
                    };
                    db.query(sqlcounter, Scomment, (err, result)=>{
                        if (err) throw err;
                    });
                });

                var user = rows[0].username;
                var message = req.params.username + " has commented on your shared post.";
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