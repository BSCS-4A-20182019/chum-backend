const db = require('../models/conn');


exports.handler_newsfeed= (req, res, next)=>{
    res.status(200).json({
        message : 'This is the username form'
    });
}

exports.handler_username= (req, res, next)=>{
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
            let search_sql = `SELECT * FROM chum_profile where username = '${req.params.username}' `;
            db.query(search_sql, (err, result)=>{
                if (err) throw err;
                else{
                    res.status(200).send(result);
                }
            });
        }
    });

    
}

exports.handler_notifications= (req, res, next)=>{
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
            let search_sql = `SELECT notif FROM chum_notification where username = '${req.params.username}' `;
            db.query(search_sql, (err, rows, result)=>{
                if (err) throw err;
                if (rows.length===0){
                    res.status(200).json({message: 'You have no notification'});
                }
                else{
                    res.status(200).send({rows: rows});
                }
            });
        }
    });
}

exports.handler_savedposts= (req, res, next)=>{
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
            let search_sql = `SELECT link FROM saved_posts where username = '${req.params.username}' `;
            db.query(search_sql, (err, rows, result)=>{
                if (err) throw err;
                if (rows.length===0){
                    res.status(200).json({message: 'You have no saved posts.'});
                }
                else{
                    res.status(200).send(result);
                }
            });
        }
    });
}

exports.handler_search = (req, res, next)=>{
    let profile_sql = `SELECT * FROM chum_profile WHERE firstname LIKE '%${req.body.search}%' OR 
        lastname LIKE '%${req.body.search}%' OR username LIKE '%${req.body.search}%' OR email LIKE '%${req.body.search}%'`;
    let posts_sql = "SELECT post_word, chum_like, chum_share, chum_comment FROM chum_post WHERE username = ?";
    let share_sql = "SELECT share_word, share_caption, share_like, share_comment FROM chum_share WHERE username = ?";
    let rank_sql = "SELECT rank_like, rank_share, rank_chum, chum_level, chum_levelname FROM chum_rank WHERE username = ?";
    
    db.query(profile_sql, (err, resultprof)=>{
        if(err) throw err;
        if(resultprof.length >= 1){
            var profuser = resultprof[0].username;
            db.query(posts_sql, [profuser], (err, resultpost)=>{
                if(err) throw err;
                var res_post = resultpost;
                if(resultpost.length === 0){
                    res_post = "No Post";
                }
                db.query(share_sql, [profuser], (err, resultshar)=>{
                    if(err) throw err;
                    var res_shar = resultshar;
                    if(resultshar.length === 0){
                        res_shar = "No Shares";
                    }
                    db.query(rank_sql, [profuser], (err, resultrank)=>{
                        if(err) throw err;
                        var res_rank = resultrank;
                        if(resultrank.length === 0){
                            res_rank = "No Rank";
                        }
                        res.status(200).json({
                            result: {
                                profile: resultprof,
                                posts: res_post,
                                shares: res_shar,
                                rank: res_rank
                            }
                        });
                    });
                });
            });
        }else{
            res.status(200).json({
                profile: 'Profile not found'
            });
        }
    });
}

exports.handler_upload = (req, res, next)=>{
    var image = req.body.image;
    if(!req.files){
        res.status(400).json({
            message: 'No file uploaded'
        });
    }
    let imageFile = req.files.images;
    imageFile.mv('/chum-app/app/images/'+image, (err)=>{
        if(err) throw err;
        let img = {
            pic: image
        }
        let file_upload = `UPDATE chum_profile SET ? WHERE username = '${req.body.username}'`;
        db.query(file_upload, img, (err, result)=>{
            if(err) throw err;

            res.status(200).json({
                message: 'Uploaded'
            });
        });
    });
}
