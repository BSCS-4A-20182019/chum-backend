//server.js
const http = require('http');


//defining the port of the device
const port = process.env.PORT || 8000;
const app = require('./app');

const server = http.createServer(app);

server.listen(port, ()=>{
    console.log('Now listening to port ',port);
});