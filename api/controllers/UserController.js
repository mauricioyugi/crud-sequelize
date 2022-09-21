const database = require('../models');
const schema = require('./usersValidation')

class UserController {
    static async getUsers(req, res) {
        try {
            const allUsers = await database.users.findAll({
                attributes: { exclude: ['password'] }
            });
            return res.status(200).json(allUsers);
        } catch (error) {
            return res.status(400).json(error.message);
        }
    }
    static async getUserById(req, res) {
        const { id } = req.params
        try {
            const user = await database.users.findOne({ 
                attributes: { exclude: ['password'] },
                where: { 
                    id: Number(id) 
                }
             });
             return res.status(200).json(user);
        } catch (error) {
            return res.status(400).json(error.message);
        }
    }
    static async createUser(req, res) {
        const newUser = req.body;
        delete newUser.password;
        delete newUser.id;
        try {
            await schema.validate(req.body);
            const usersExists = await database.users.findAll({ attributes: { exclude: [ 'password' ] }, where: { email: newUser.email } });
            if (usersExists.length == 1) {
                return res.status(400).json('O email já existe');
            } else if (usersExists.length > 1) {
                return res.status(400).json('O email já existe, por favor contactar o suporte urgente');
            } else {
                const newUserCreated = await database.users.create(newUser);
                return res.status(200).json(newUserCreated);
            }
        } catch (error) {
            return res.status(400).json(error.message);
        }
    }
    static async updateUser(req, res) {
        const newUserInfo = req.body;
        const { id } = req.params;
        delete newUserInfo.password;
        delete newUserInfo.id;
        try {
            await schema.validate(req.body);
            const usersExists = await database.users.findAll({ attributes: { exclude: [ 'password' ] }, where: { email: newUserInfo.email } });
            if (usersExists.length == 1) {
                if ( usersExists[0].dataValues.id != id ) {
                    return res.status(400).json('O email já existe');
                }
            } else if (usersExists.length > 1) {
                return res.status(400).json('O email já existe, por favor contactar o suporte urgente');
            }
            await database.users.update(newUserInfo, { where: { id: Number(id) } });
            const userUpdated = await database.users.findOne({ 
                where: { 
                    id: Number(id) 
                }
             });
            return res.status(200).json(userUpdated);
        } catch (error) {
            return res.status(400).json(error.message);
        }
    }
    static async deleteUser(req, res) {
        const { id } = req.params;
        try {
            await database.users.destroy({ 
                where: { 
                    id: Number(id) 
                }
             });
             return res.status(200).json({message: `Usuário com o id: ${id} deletado com sucesso`});
        } catch (error) {
            return res.status(400).json(error.message);
        }
    }
}
module.exports = UserController;