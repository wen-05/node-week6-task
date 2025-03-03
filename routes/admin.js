const express = require('express')
const router = express.Router()

const adminController = require('../controllers/adminController')

const { dataSource } = require('../db/data-source')
const logger = require('../utils/logger')('Admin')
const config = require('../config/index')

const isAuth = require('../middlewares/isAuth')({
  secret: config.get('secret').jwtSecret,
  userRepository: dataSource.getRepository('User'),
  logger
})
const isCoach = require('../middlewares/isCoach')

router.post('/courses', isAuth, isCoach, adminController.createCourse)
router.put('/courses/:courseId', isAuth, isCoach, adminController.editCourse)
router.post('/:userId', isAuth, adminController.changeRole)

module.exports = router