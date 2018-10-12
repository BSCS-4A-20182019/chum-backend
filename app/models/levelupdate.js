module.exports = (req, res, next) => {
    var uname = req.params.username;
    let select_like = `SELECT SUM(chum_like) as chumLike FROM chum_post where username='${uname}'`;
    let select_share = `SELECT count(share_uname) as countShare FROM chum_share where share_uname = '${uname}'`;
    let select_list = `SELECT count(chum_id) as countList FROM chum_list where username= '${uname}'`;
    let select_level = `SELECT chum_level as chumLevel FROM chum_rank where username = '${uname}'`;
    let update_rankUpdate = `UPDATE chum_rank SET ? WHERE username = '${uname}'`;
    
    db.query(select_level, (err, resultlevel)=>{
        var chumlevel = resultlevel[0].chumLevel;
    
        db.query(select_like, (err, resultlike)=>{
            var chumlike = resultlike[0].chumLike;
            
            db.query(select_share, (err, resultshare)=>{
                var chumshare = resultshare[0].countShare;

                db.query(select_list, (err, resultlist)=>{
                    var chumlist = resultlist[0].countList;

                    let upt1 = {
                        chum_level: chumlevel,
                        rank_like: chumlike,
                        rank_share: chumshare,
                        rank_chum: chumlist
                    };
                    // UPDATE THE CURRENT LIKE, SHARE, LIST AND LEVEL
                    db.query(update_rankUpdate, upt1, (err)=>{
                        if(err) throw err;
                        console.log('Level Updated');
                    });
                });
            });
        });
    });
    next();
}