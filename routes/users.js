const express = require('express');
const router = express.Router();
let userController = require('../controller/UserController');
const authorization = require('../utils/AuthorizationUtils');

//var csurf = require('csurf');
//var csrfProtection = csurf({ cookie: true, httpOnly : true, key : 'X-CSRF-TOKEN' });


router.post('/sign_in' , userController.connectUser);

router.get('/', authorization.EmployeeRight,userController.getUsers);

router.get('/me/profile', authorization.EmployeeRight, userController.getProfile);

router.get('/:id', authorization.ManagerRight, userController.getUserById);

router.put('/:id',authorization.ManagerRight, userController.updateUser);

router.post('/sign_up', userController.createUser);

router.delete('/:id', authorization.ManagerRight ,  userController.deleteUser);



module.exports = router;
