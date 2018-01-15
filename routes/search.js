const express = require('express');
const router = express.Router();
const Search = require('../controllers/search')

router.get('/', Search.get)

module.exports = router