const express = require('express')
const router = express.Router()
const passport = require('passport')
const log4js = require('log4js')
const logger = log4js.getLogger()

//INDEX
router.get('/', (req, res, next) => {
    res.render('index')
})

module.exports = router