    const express = require('express');
    const router = express.Router();
    const rateLimit = require("express-rate-limit");

    const createAccountLimiter = rateLimit({
        windowMs: 60 * 60 * 1000, // 1 hour window
        max: 3, // start blocking after 3 requests
        message: "Please try again after 1 hour"
    });
    
    router.use(createAccountLimiter);

    module.exports = router;

// var redisClient = redis.createClient();

// var id = req.apiKey;

// // allow 100 request / 60s
// limiters[id] = new RateLimiter({
//   id: id,
//   limit: 100, // 100 tokens
//   duration: 60000 // 60s duration
// }, redisClient);

// limiters[id].get(function(err, limit, remaining, reset) {
//   if (err) {
//     return next(err);
//   }

//   res.setHeader('X-RateLimit-Limit', limit);
//   res.setHeader('X-RateLimit-Remaining', remaining);
//   res.setHeader('X-RateLimit-Reset', Math.floor(reset / 1000));
  
//   if (remaining >= 0) {
//     // allowed, call next middleware
//     next();
    
//   } else {
//     // limit exceeded
//     res.setHeader('Retry-After', Math.floor((reset - new Date()) / 1000));
//     res.statusCode = 429;
//     res.end('Rate limit exceeded.');
//   }
// });