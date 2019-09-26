const express = require('express');
const router = express.Router();
const modele = require('../models/index');
const bcrypt = require('bcrypt-nodejs');
const teamController = require('../controller/TeamController');
const authorization = require('../utils/AuthorizationUtils');



router.get('/', authorization.ManagerRight ,teamController.getAllTeam);

router.get('/:id',authorization.ManagerRight ,teamController.getTeamById);

router.get('/manager/:id_manager',authorization.ManagerRight ,teamController.getTeamOfManager);

router.get('/:id/users' , authorization.EmployeeRight ,teamController.getMemberOfTeam);

router.get('/:id/users/NotIn', authorization.EmployeeRight , teamController.getNonMemberOfTeam);

router.get('/user/:id_user',authorization.EmployeeRight ,teamController.getUserTeams);

router.post('/',authorization.ManagerRight ,teamController.insertTeam);

router.put('/:id',authorization.ManagerRight,teamController.updateTeamById);

router.delete('/:id', authorization.ManagerRight,teamController.deleteTeamById);

router.post('/:id/add/:id_user',authorization.ManagerRight, teamController.addUserToTeam);

router.delete('/:id/remove/:id_user',authorization.ManagerRight,teamController.removeUserFromTeam);


module.exports = router;
