'use strict';

var express = require('express');
var controller = require('./wikimedia.controller');

var router = express.Router();
router.get('/:slug', controller.show);
module.exports = router;
