const express = require('express');
const app = express.Router();

app.use(authenticationMiddleware);

module.exports = app;
