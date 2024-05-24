
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
                role: user.role,
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

async function getAll(req, res, nex) {
    try {
       const users = await userService.findAllUser({});
       res.status(200).json({
        message: 'success',
        data: users
    })
    } catch (error) {
        res.status(400).json({
            message: error.message,
            error: error
        });
    }
}

async function getUser(req,res,next){
    try {
        const { id } = req.params;
        const user = await userService.findUser({ id  });
        res.status(200).json({
         message: 'success',
         data: user
     })
     } catch (error) {
         res.status(400).json({
             message: error.message,
             error: error
         });
     }
}

async function deleteUser(req,res,next){
    try {
        const { id } = req.params;
        await userService.deleteUser(id);
        res.status(200).json({
            message: 'success',
            data: {}
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
            error: error
        });
    }
}

async function editUser(req,res,next){
    try {
        const { id } = req.params;
        const body = req.body;
        const user = await userService.findUser({ email : body.email });
        if (user) {
            throw new Error('User already exist');
        }
        await userService.editUser(id,body);
        res.status(200).json({
            message: 'success',
            data: {}
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
    register,
    getAll,
    deleteUser,
    getUser,
    editUser
}; 