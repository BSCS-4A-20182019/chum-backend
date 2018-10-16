const express = require('express');
const appMiddleware = express();
const bodyParser = require ('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const MySQLStore = require('express-mysql-session')(session);
const mysql = require ('mysql');
const fileUpload = require('express-fileupload');

const db = require('../app/models/conn');

appMiddleware.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
     "Origin, X-Requested-With, Content-Type, Accept, Authorization");
     if (req.methods === 'OPTIONS'){
         res.header('Access-Control-Allow-Methods', 
         'PUT, POST, GET, PATCH, DELETE');
         return res.status(200).json({});
     }
     next();

});

appMiddleware.use(bodyParser.urlencoded({extended:true}));
appMiddleware.use(bodyParser.json());
appMiddleware.use(fileUpload());

const createAccountRoutes = require('../routers/user_account_router');
const chumRequestRoutes = require('../routers/chum_req_router');
const headerRoutes = require('../routers/header_router');
const settingRoutes = require('../routers/settings_router');
const newsfeed = require('../routers/newsfeed_router');
const chumlist = require('../routers/chum_list_router');
const share = require('../routers/chum_share_router');
// const counter = require('../routers/chum_counter_router');
const ranking = require('../routers/chum_ranking_router');
const chumLoginLogout = require('../routers/chum_loginlogout_router');
const timeline = require('../routers/chum_timeline_router');

//EXPRESS-VALIDATOR
appMiddleware.use(expressValidator());
appMiddleware.use(cookieParser());

// FOR RESTRICTING SESSION
const options = {
    host : process.env.host,
    user : process.env.user,
    password : process.env.password,
    database : process.env.dbase
};
// FOR RESTRICTING SESSION
var sessionStore = new MySQLStore(options);

//FOR SESSION
appMiddleware.use(session({
    secret:'chumchumchumchumchumchumchumchumchumchum', 
    resave: false,
    store: sessionStore,
    saveUninitialized: false,
    cookie: true
}));

//FOR PASSPORT
appMiddleware.use(passport.initialize());
appMiddleware.use(passport.session());

appMiddleware.use('api/signup', createAccountRoutes);
appMiddleware.use('api/profile', chumRequestRoutes);
appMiddleware.use('api/chum', headerRoutes);
appMiddleware.use('api/settings', settingRoutes);
appMiddleware.use('api/chum/newsfeed', newsfeed);
appMiddleware.use('api/profile', chumlist);
appMiddleware.use('api/chum/newsfeed', share);
// appMiddleware.use('/chum/counter', counter);
// appMiddleware.use('/api', createAccountRoutes);
appMiddleware.use('api/chum/ranking', ranking);
appMiddleware.use('api/official/chum', chumLoginLogout);
appMiddleware.use('api/chum/timeline', timeline);
appMiddleware.use('api/chum/ranking', ranking);
appMiddleware.use('api/official/chum', chumLoginLogout);
appMiddleware.use('api/chum/timeline', timeline);

module.exports = appMiddleware;