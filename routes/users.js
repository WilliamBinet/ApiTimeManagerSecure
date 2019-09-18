var express = require('express');
var router = express.Router();
let userController = require('../controller/UserController');


//var csurf = require('csurf');
//var csrfProtection = csurf({ cookie: true, httpOnly : true, key : 'X-CSRF-TOKEN' });



router.get('/', userController.getUsers);

router.get('/me/profile',  userController.getProfile);

router.get('/sign_in', userController.connectUser);

router.get('/:id', userController.getUserById);

router.put('/:id', userController.updateUser);

router.post('/sign_up', userController.createUser);


router.delete('/:id', userController.deleteUser);



module.exports = router;
