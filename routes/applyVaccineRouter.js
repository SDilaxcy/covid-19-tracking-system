const express = require('express');

const applyvaccineController = require('../controllers/applyvaccineController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.post(
    '/createapplyVaccine',
    //authController.protect,
    // applyvaccineController.setVaccineUserId,
    applyvaccineController.createApplyVaccine
  );

router.get('/getOneApplyVaccine/:applyVaccineId', applyvaccineController.getapplyVaccine);
router.delete('/deleteApplyVaccine/:applyVaccineId', applyvaccineController.deleteApplyVaccine);
router.get('/', applyvaccineController.getAllApplyVaccine);

router.patch('/updateApplyVaciine/:applyVaccineId', applyvaccineController.updateApplyVaccine);

router.param('applyVaccineId',applyvaccineController.applyVaccineById);

module.exports = router;




