const express = require('express');
const proxy = require('http-proxy-middleware');
require('dotenv').config();

const app = express();
app.use(express.static('client'));

port = process.env.port;

// Add middleware for http proxying 
const apiProxy = proxy('/api', { target: 'http://localhost:8000' });
app.use('/api', apiProxy);

app.listen(3000, () => {
  console.log('Listening on: '+ 3000);
});