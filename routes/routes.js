var express = require('express');

var userController = require('../src/users/userController.js');
const router = express.Router();

router.route('/user').get(userController.getUsersControllerFn);
router.route('/user/login').post(userController.loginUserControllerFn);
router.route('/user/create').post(userController.createUserControllerFn);
router.delete('/delete/:userId', userController.deleteUserControllerFn);

 
module.exports = router;
