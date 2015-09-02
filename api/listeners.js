var express = require('express');
var router = express.Router();
var handlers = require('./handlers');

// api routes
router.post('/update', handlers.fetch);

module.exports = router;