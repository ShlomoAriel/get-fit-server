var express = require('express')
  , router = express.Router()

router.use('/', require('./userController'))
router.use('/', require('./roleController'))
router.use('/', require('./exerciseController'))
router.use('/', require('./traineeController'))

module.exports = router