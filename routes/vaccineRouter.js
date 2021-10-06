const express = require('express');
const vaccineController = require('../controllers/vaccineController');

const router = express.Router({ mergeParams: true });


router.post(
  '/createVacc',
  vaccineController.createVaccine
);
router.get('/', vaccineController.getAllVaccines);
router.get('/getOneVacc/:vaccineId', vaccineController.getOneVaccine);
router.get('/search', vaccineController.listSearch);
router.patch('/updateVacc/:vaccineId', vaccineController.updateVaccine);
router.delete('/deleteVacc/:vaccineId', vaccineController.deleteVaccine);

router.param('vaccineId', vaccineController.vaccineById);

module.exports = router;
