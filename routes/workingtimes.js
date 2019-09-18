var express = require('express');
var router = express.Router();
var modele = require('../models/index');
const bcrypt = require('bcrypt-nodejs');
const Sequelize = require('sequelize');
const controllerWT = require('../controller/WorkingTimeController');


router.get('/:id', controllerWT.getWorkingTimeByIdBetween);

router.get('/:id_user/:id_workingtime', controllerWT.getWorkingTimeByIdUserId);

router.post('/:id_user', controllerWT.addWorkingTime);

router.put("/:id", controllerWT.updateWorkingTime);

router.delete('/:id', controllerWT.deleteWorkingTime );

router.put('/:id/time', controllerWT.getWorkingTimeOfTeam);

module.exports = router;

