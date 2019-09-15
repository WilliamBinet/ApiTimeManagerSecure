var express = require('express');
var router = express.Router();
var modele = require('../models/index');
const bcrypt = require('bcrypt-nodejs');
let userUtil = require('../utils/usersUtils');
let jwtUtils = require('../utils/jwtUtils');
let userController = require('../controller/UserController');
//var csurf = require('csurf');
//var csrfProtection = csurf({ cookie: true, httpOnly : true, key : 'X-CSRF-TOKEN' });



router.get('/', userController.getUsers);

router.get('/me/profile',  userController.getProfile);

router.get('/:id', userController.getUserById);

router.put('/:id', userController.updateUser);

router.post('/sign_up', userController.createUser);

router.post('/sign_in', userController.connectUser);

router.delete('/:id', userController.deleteUser);



module.exports = router;
