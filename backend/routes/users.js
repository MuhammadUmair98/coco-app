const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/login', userController.login);
router.post('/register', userController.register);

router.get ('/', userController.getAll);
router.get('/:id', userController.getUser);
router.delete('/:id', userController.deleteUser);
router.put('/:id', userController.editUser);
module.exports = router;
