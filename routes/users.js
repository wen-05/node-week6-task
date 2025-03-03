const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')

const { dataSource } = require('../db/data-source')
const logger = require('../utils/logger')('User')
const config = require('../config/index')

const isAuth = require('../middlewares/isAuth')({
  secret: config.get('secret').jwtSecret,
  userRepository: dataSource.getRepository('User'),
  logger
})

router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.get('/profile', isAuth, userController.getProfile)
router.put('/profile', isAuth, userController.updateProfile)

module.exports = router