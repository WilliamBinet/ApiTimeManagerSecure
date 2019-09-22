var express = require('express');
var router = express.Router();
var modele = require('../models/index');
const bcrypt = require('bcrypt-nodejs');
const teamController = require('../controller/TeamController');



router.get('/',teamController.getAllTeam);

router.get('/:id',teamController.getTeamById);

router.get('/:id/users' , teamController.getMemberOfTeam);

router.get('/:id/users/NotIn' , teamController.getNonMemberOfTeam);


router.post('/',teamController.insertTeam);

router.put('/:id',teamController.updateTeamById);

router.delete('/:id',teamController.deleteTeamById);

router.post('/:id/add/:id_user', teamController.addUserToTeam);

router.delete('/:id/remove/:id_user', teamController.removeUserFromTeam);


module.exports = router;
