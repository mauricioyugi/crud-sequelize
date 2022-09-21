const database = require('../models');
const schema = require('./passwordValidation');

class UserPassword {
    static async createPassword(req, res) {
        try {
            //await schema.validate(req.body);
            const newPassword = req.body;
            const { id } = req.params;
            await database.users.update(newPassword, { where: { id: Number(id) }});
            return res.status(200).json({message: `Password created successfully for the user's id: ${id}`});
        } catch (error) {
            return res.status(400).json(error.message);
        }
    }
}
module.exports = UserPassword;