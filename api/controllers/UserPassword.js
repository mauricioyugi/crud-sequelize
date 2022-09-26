const database = require('../models');
const schema = require('./passwordValidation');
const bcrypt = require('bcrypt');

class UserPassword {
    static async createPassword(req, res) {
        try {
            await schema.validate(req.body);
            const newPassword = req.body;
            const { id } = req.params;
            const previousPassword = await database.users.findAll({ where: { id: Number(id) } });
            const salt = 10;
            const encryptedPassword = await bcrypt.hash(newPassword.password, salt);
            if (previousPassword[0].dataValues.password !== null) {
                return res.status(400).json({message: "This user already have a password"});
            } else {
                await database.users.update({ password: encryptedPassword }, { where: { id: Number(id) }});
                console.log(encryptedPassword);
                return res.status(200).json({message: "Password created successfully"});
            }
        } catch (error) {
            return res.status(400).json(error.message);
        }
    }
}
module.exports = UserPassword;