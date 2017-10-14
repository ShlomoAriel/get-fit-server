var express = require('express')
  , router = express.Router()

router.use('/', require('./userController'))
router.use('/', require('./roleController'))
router.use('/', require('./exerciseController'))
router.use('/', require('./traineeController'))
router.use('/', require('./trainingPackageController'))

module.exports = router