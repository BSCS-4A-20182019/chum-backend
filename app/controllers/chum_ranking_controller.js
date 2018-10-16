const db = require('../models/conn');
require('dotenv').config();


exports.rank_global_get= (req, res, next)=>{
    let globalSql= `SELECT username FROM chum_rank where chumLevel >=5 ORDER BY chumLevel DESC LIMIT 2`;
    db.query(globalSql, (err, rows, result)=>{
        var row = rows.length;
        
        if(err) throw err;

        if(row === 0){
            res.status(process.env.notfnd).json({
                status: process.env.notfnd,
                message: 'not found'
            });
        }
        else{
                for (var i=0; i <row ; i++){
                    var rankNo = i+1;
                    var rank = rankNo+". "+rows[i].username;
                
                    res.write(JSON.stringify({ranks: rank}));
                    res.write("\n");
                    
                }
                res.end();
                
        }

    });

    
}

exports.rank_chum_get= (req, res, next)=>{
    let chumSql= `SELECT username FROM chum_rank where username IN (SELECT chum_id FROM chum_list where username='${req.params.username}') OR username='${req.params.username}' AND chumLevel>=5 ORDER BY chumLevel DESC LIMIT 10`;
    db.query(chumSql, (err, rows, result)=>{
        var row = rows.length;
        
        if(err) throw err;

        if(row === 0){
            res.status(process.env.notfnd).json({
                status: process.env.notfnd,
                message: 'Username not found'
            });
        }
        else{
                for (var i=0; i <row ; i++){
                    var rankNo = i+1;
                    var rank = rankNo+". "+rows[i].username;
                
                    res.write(JSON.stringify({ranks: rank}));
                    res.write("\n");
                    
                }
                res.end();
                
        }

    });

    
}

exports.rank_level_get= (req, res, next)=>{
    let select_like = `SELECT SUM(chum_like) as chumLike FROM chum_post where username='${req.params.username}'`;
    let select_share = `SELECT count(share_uname) as countShare FROM chum_share where share_uname = '${req.params.username}'`;
    let select_list = `SELECT count(chum_id) as countList FROM chum_list where username= '${req.params.username}'`;
    let select_level = `SELECT chum_level as chumLevel FROM chum_rank where username = '${req.params.username}'`;
	let select_req_sql = `SELECT * FROM chum_rank_requirements WHERE username = '${req.params.username}'`;
	let select_reqlvl_sql = `SELECT * FROM chum_rankname`;
	let select_rank_sql = `SELECT chum_levelname FROM chum_rank WHERE username = '${req.params.username}'`;
	let update_rankUpdate = `UPDATE chum_rank SET ? WHERE username = '${req.params.username}'`;
	let update_reqUpdate = `UPDATE chum_rank_requirements SET ? WHERE username = '${req.params.username}'`;

	db.query(select_level, (err, resultlevel)=>{
		var chumlevel = resultlevel[0].chumLevel;
	
		db.query(select_like, (err, resultlike)=>{
			var chumlike = resultlike[0].chumLike;
			
			db.query(select_share, (err, resultshare)=>{
				var chumshare = resultshare[0].countShare;

				db.query(select_list, (err, resultlist)=>{
					var chumlist = resultlist[0].countList;

					// UPDATE THE REQUIREMENTS LEVEL
					db.query(select_req_sql, (err, result)=>{
						var req_like = result[0].chum_req_like; // 3
						var req_share = result[0].chum_req_share; // 1
						var req_list = result[0].chum_req_list; // 3
						var req_lvl = result[0].chum_req_level; // 5
						var addreq_like = result[0].chum_addreq_like;
						var addreq_share = result[0].chum_addreq_share;
						var addreq_list = result[0].chum_addreq_list;
						
						if(chumlevel <= 100){
							if (req_like>=chumlike && req_list>=chumlist && req_share>=chumshare){
								db.query(select_reqlvl_sql, (err, resLvlName)=>{
									var lvlName = null;
									if (chumlevel===req_lvl){
										switch(req_lvl){
											case 5:
												addreq_like=4;
												addreq_share=2;
												addreq_list=4;
												req_lvl=10;
												lvlName = resLvlName[1].chum_levelname;
												break;
								
											case 10:
												addreq_like=5;
												addreq_share=3;
												addreq_list=5;
												req_lvl=15;
												lvlName = resLvlName[2].chum_levelname;
												break;
								
											case 15:
												addreq_like=6;
												addreq_share=4;
												addreq_list=6;
												req_lvl=25;
												lvlName = resLvlName[3].chum_levelname;
												break;
								
											case 25:
												addreq_like=7;
												addreq_share=5;
												addreq_list=7;
												req_lvl=45;
												lvlName = resLvlName[4].chum_levelname;
												break;
								
											case 45:
												addreq_like=8;
												addreq_share=6;
												addreq_list=8;
												req_lvl=65;
												lvlName = resLvlName[5].chum_levelname;
												break;
								
											case 65:
												addreq_like=9;
												addreq_share=6;
												addreq_list=9;
												req_lvl=80;
												lvlName = resLvlName[6].chum_levelname;
												break;
								
											case 80:
												addreq_like=10;
												addreq_share=7;
												addreq_list=10;
												req_lvl=90;
												lvlName = resLvlName[7].chum_levelname;
												break;
								
											case 90:
												addreq_like=11;
												addreq_share=8;
												addreq_list=11;
												req_lvl=5;
												lvlName = resLvlName[8].chum_levelname;
												break;
								
											case 100:
												addreq_like=12;
												addreq_share=9;
												addreq_list=12;
												req_lvl=5;
												lvlName = resLvlName[9].chum_levelname;
												break;
										}

									}
									req_like+=addreq_like;
									req_share+=addreq_share;
									req_list+=addreq_list;

									let upt2 = {
										chum_req_level: req_lvl,
										chum_req_like: req_like,
										chum_req_share: req_share,
										chum_req_list: req_list,
										chum_addreq_like: addreq_like,
										chum_addreq_share: addreq_share,
										chum_addreq_list: addreq_list
									};

									db.query(update_reqUpdate, upt2, (err)=>{
										if(err) throw err;
										res.status(200).json({
											message: "LEVEL UP"
										});
									});
								});
								chumlevel = chumlevel+1;
								let upt1 = {
									chum_level: chumlevel,
									rank_like: chumlike,
									rank_share: chumshare,
									rank_chum: chumlist,
									chum_levelname: lvlName
								};
								// UPDATE THE CURRENT LIKE, SHARE, LIST AND LEVEL
								db.query(update_rankUpdate, upt1, (err)=>{
									if(err) throw err;
								});
							}
						}
					});
				});
			});
		});
	});
}

exports.rank_update_put = (req, res, next) => {
	let select_like = `SELECT SUM(chum_like) as chumLike FROM chum_post where username='${req.params.username}'`;
	let select_share = `SELECT count(share_uname) as countShare FROM chum_share where share_uname = '${req.params.username}'`;
	let select_list = `SELECT count(chum_id) as countList FROM chum_list where username= '${req.params.username}'`;
	let select_level = `SELECT chum_level as chumLevel FROM chum_rank where username = '${req.params.username}'`;
	let update_rankUpdate = `UPDATE chum_rank SET ? WHERE username = '${req.params.username}'`;
	
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
}
