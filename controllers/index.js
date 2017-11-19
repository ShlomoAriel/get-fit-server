var express = require('express')
  , router = express.Router()

router.use('/', require('./userController'))
router.use('/', require('./roleController'))
router.use('/', require('./exerciseController'))
router.use('/', require('./traineeController'))
router.use('/', require('./trainingPackageController'))
router.use('/', require('./traineeTrainingPackageController'))
router.use('/', require('./scheduledExerciseController'))
router.use('/', require('./goalController'))
router.use('/', require('./traineeStatusController'))
router.use('/', require('./paymentController'))
router.use('/', require('./locationController'))
router.use('/', require('./trainingSessionController'))
router.use('/', require('./dietController'))

module.exports = router