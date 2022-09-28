const bcrypt = require('bcrypt');
const UserController = require('./UserController');

async function login(req, res) {
    try {
        const user = await UserController.getUserByEmail(req.body.email);
        if (!user){
            return res.status(401).json({status: 401, message: "Email or password is invalid#1"});
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(401).json({status: 401, message: "Email or password is invalid#2"});
        }
        const jwt_token = 'klgnlfdhsksmkdfdsflsfjvklnenvljslsihvhsvknslvs';
        const authResponse = { ...user, token: jwt_token };
        delete authResponse.password;
        delete authResponse.id;
        delete authResponse.createdAt;
        delete authResponse.updatedAt;
        return res.status(200).json(authResponse);
    } catch (error) {
        return res.status(401).json({status: 401, message: error.message});
    }
}

module.exports = { login };