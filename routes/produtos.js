const express = require('express')
const router = express.Router()
const Indexcontrolle = require('../controllers/produtos')

router.get('/produtos', Indexcontrolle.showcatalogo)


module.exports = router