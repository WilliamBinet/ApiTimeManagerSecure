const express = require('express');
const router = express.Router();
const modele = require('../models/index');
const bcrypt = require('bcrypt-nodejs');
const clockController = require('../controller/ClockController');
const authorization = require('../utils/AuthorizationUtils');


router.get('/:id_user',authorization.EmployeeRight ,clockController.getClockById);

router.post('/:id_user',authorization.EmployeeRight, clockController.updateClockStatus);
router.put('/:id_user', authorization.AdministratorRight,clockController.updateClock);






module.exports = router;
