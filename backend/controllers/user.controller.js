
const userService = require('../services/user.services');

async function login(req, res, next) {
    const { email, password } = req.body;
    try {
        const user = await userService.findUser({ email });
        if (!user) {
            throw new Error('User not found');
        }
        const checkPassword = await userService.decryptPassword(password, user.password);
        if (!checkPassword) {
            throw new Error('password is wrong');
        }
        const payload = { id: user.id, email: user.email, roleId: user.roleId };
        const userToken = userService.authenticateUser(payload);
        res.status(200).json({
            message: 'success',
            data: {
                token: userToken,
                ...payload
            }
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
            error: error
        });
    }
}

async function register(req, res, nex) {
    try {
        const { email, password, roleId } = req.body;
        const user = await userService.findUser({ email });
        if (user) {
            throw new Error('User already exist');
        }
        const encryptPassword = await userService.encryptPassword(password);
        const createdUser = await userService.createUser({ email, password: encryptPassword, roleId: roleId ?? 1 });
        res.status(200).json({
            message: 'success',
            data: createdUser
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
            error: error
        });
    }
}

module.exports = {
    login,
    register
}; 