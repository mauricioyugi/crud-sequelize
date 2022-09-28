const { Router } = require('express');
const UserController = require('../controllers/UserController');
const UserPassword = require('../controllers/UserPassword');
const UserAuthentication = require('../controllers/userAuthentication');


const router = Router();

router.get('/users', UserController.getUsers);
router.get('/users/:id', UserController.getUserById);
router.post('/users', UserController.createUser);
router.post('/users/password/:id', UserPassword.createPassword);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);

router.post('/auth/login', UserAuthentication.login);

module.exports = router;