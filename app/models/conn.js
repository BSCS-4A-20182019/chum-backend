const mysql = require ('mysql');
require('dotenv').config();

const db = mysql.createConnection({
    host : process.env.host,
    user : process.env.user,
    password : process.env.password,
    database : process.env.dbase
});

db.connect((err) => {
    if(err){
        throw err;
    }
    else{
        console.log('MySql Connected');
    }
    
});

module.exports = db;