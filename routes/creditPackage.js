const express = require('express')
const router = express.Router()

const creditPackageController = require('../controllers/creditPackageController')

const { dataSource } = require('../db/data-source')
const logger = require('../utils/logger')('CreditPackage')
const config = require('../config/index')

const isAuth = require('../middlewares/isAuth')({
  secret: config.get('secret').jwtSecret,
  userRepository: dataSource.getRepository('User'),
  logger
})

router.get('/', creditPackageController.getCreditPackage)
router.post('/', creditPackageController.createCreditPackage)
router.post('/:creditPackageId', isAuth, creditPackageController.purchaseCreditPackage)
router.delete('/:creditPackageId', creditPackageController.deleteCreditPackage)

module.exports = router