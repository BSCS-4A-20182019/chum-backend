const db = require('../models/conn');


exports.chumreq_get= (req, res, next)=>{
    console.log(req.params.username);
    
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
                    let search1_sql = `SELECT chum_username FROM chum_request where username = '${req.params.username}' `;
                db.query(search1_sql, (err, rows, result)=>{
                if (err) throw err;
                else{
                    const rowChumReq =  rows.length;
                    console.log(rowChumReq);
                    if (rowChumReq===0){
                        res.status(200).send({messge: 'You have no chum requests'});
                    } 
                    else{
                        console.log(rows[0].chum_username);
        
                        res.status(200).send(rows[0].chum_username);
                    }
                    
                }
            }); 
                }
            });
              
}

exports.chumreqdelete_ignore= (req, res, next)=>{
    var chumId = req.params.chumId;
    var username = req.params.username;
    console.log(username);

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
                    let sql = `DELETE from chum_request WHERE username = '${username}' and chum_username = '${chumId}'`;
                    let query = db.query(sql, (err, result)=>{
                        console.log(result);
                        res.status(200).json( {message: 'Chum Request Ignore'});
                    });
                }
            });

    
}

exports.chumreqsend_request= (req, res, next)=>{
    var chumId = req.params.users;
    var username = req.params.username;
    console.log(username);
    console.log(chumId);

    let sendReq = `SELECT request_id FROM chum_request where username ='${chumId}' AND chum_username = '${username}'`;
    db.query(sendReq, (err, rows, result)=>{
        console.log(rows.length);
            if (rows.length>0){
                res.status(400).json({
                    message: 'You already sent a chum request'
                });
            }
            else{
                let search_sql = `SELECT list_id FROM chum_list where username = '${username}' AND chum_id = '${chumId}'`;
                db.query(search_sql, (err, rows, result)=>{
                    console.log(rows.length);
                    if (rows.length===1){
                        res.status(404).json({
                            message : 'Cannot send a request to your chum'
                        });
                    }
                    else{
                        let post = {username: chumId, chum_username: username};
                        var message = username + " has sent you a chum request";
                        let notif = {username: chumId, notif: message};
                                let sendSql = `INSERT INTO chum_request SET ?`;
                                db.query(sendSql, post, (err, result)=>{
                                    if (err){
                                        throw err;
                                    }
                                    else{
                                        let notifSql =   `INSERT INTO chum_notification SET ?`;
                                        db.query(notifSql, notif, (err, result)=>{
                                            if (err){
                                                throw err;
                                            }
                                            else{
                                                console.log(result);
                                                res.status(200).json({message: 'Chum Request Sent'});
                                            }
                                        });
                                        
                                    }
                                    
                                });
                    }
                });
            }
    });
    }

exports.chumreqdelete_accept= (req, res, next)=>{
    var chumId = req.params.chumId;
    var username = req.params.username;
    console.log(username);

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
                    let sql = `DELETE from chum_request WHERE username = '${username}' and chum_username = '${chumId}'`;
                    db.query(sql, (err, result)=>{
                        console.log(result);
                        if (err){
                            throw err;
                        }
                        else{
                            let post = {username: username, chum_id: chumId};
                            let post2 = {username: chumId, chum_id: username};
                            var message = "You and " + chumId + " are now chums";
                            var message2 = username + " accepted your request. You are now chums";


                            let sendSql = `INSERT INTO chum_list SET ?`;
                            let sendSql2 = `INSERT INTO chum_list SET ?`;
                            let notif = {username: username, notif: message};
                            let notif2 = {username: chumId, notif: message2};


                            db.query(sendSql, post, (err, result)=>{
                                if (err){
                                    throw err;
                                }
                                else{
                                    
                                    let notifSql =   `INSERT INTO chum_notification SET ?`;
                                    
                                    db.query(notifSql, notif, (err, result)=>{
                                        if (err){
                                            throw err;
                                        }
                                        else{
                                            console.log(result);
                                            res.status(200).json({message: 'Chum Request Accepted'});
                                        }
                                    });
                                }
                            });

                            db.query(sendSql2, post2, (err, result)=>{
                                if (err){
                                    throw err;
                                }
                                else{
                                    let notif2Sql = `INSERT INTO chum_notification SET ?`;

                                    db.query(notif2Sql, notif2, (err, result)=>{
                                        if (err){
                                            throw err;
                                        }
                                    });

                                }
                            });
                        }
                    });
                    
                }
            });

   
}