'use strict';

var express = require('express');
var controller = require('./brooklynMuseum.controller');

var router = express.Router();
router.get('/:slug', controller.show);
module.exports = router;
