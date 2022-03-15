const express = require('express')
const router = express.Router()
const Logincontrolle = require('../controllers/login')

router.get('/login', Logincontrolle.entrar)


module.exports = router