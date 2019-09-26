const express = require('express');
const router = express.Router();
const controllerWT = require('../controller/WorkingTimeController');
const authorization = require('../utils/AuthorizationUtils');


router.get('/:id', controllerWT.getWorkingTimeById);

router.get('/users/:id_user',authorization.EmployeeRight ,controllerWT.getWorkingTimeByIdBetween);

router.get('/:id_user/:id_workingtime',authorization.ManagerRight ,controllerWT.getWorkingTimeByIdUserId);

router.post('/:id_user',authorization.EmployeeRight ,controllerWT.addWorkingTime);

router.put("/:id", authorization.EmployeeRight, controllerWT.updateWorkingTime);

router.delete('/:id',authorization.EmployeeRight, controllerWT.deleteWorkingTime );

router.put('/:id/time', authorization.ManagerRight, controllerWT.getWorkingTimeOfTeam);

module.exports = router;


