const express = require('express');
const app = express();
const bodyParser = require ('body-parser');
const mysql = require ('mysql');
const appMiddleware = require('./middlewares/app-middleware');

//body-parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(appMiddleware);


//Error handling when none of the routes are correct
app.use((req, res, err, next)=>{
    if (err) throw err;
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});
//Returns other errors not handled in the above error handling
app.use((error, req, res, next)=>{
    res.status(500);
    console.log(error);
    res.json({
        error: {
            message: error
        }
    });

});


//Exporting the app module
module.exports = app;