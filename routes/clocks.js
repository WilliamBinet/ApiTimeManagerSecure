const express = require('express');
const router = express.Router();
const modele = require('../models/index');
const bcrypt = require('bcrypt-nodejs');
const clockController = require('../controller/ClockController');


router.get('/:id_user', clockController.getClockById);

router.post('/:id_user', clockController.updateClockStatus);
router.put('/:id_user', clockController.updateClock);






module.exports = router;
