var express = require('express');
var router = express.Router();
var modele = require('../models/index');
const bcrypt = require('bcrypt-nodejs');
const userController = require('../controller/ClockController');


router.get('/:id_user', userController.getClockById);

router.post('/:id_user', userController.updateClockStatus);






module.exports = router;
