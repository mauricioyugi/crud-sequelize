const bcrypt = require('bcrypt');
const UserController = require('./UserController');
const jwt = require('jsonwebtoken');

function createToken(user) {
    const payload = {
        id: user.id
    };
    const token = jwt.sign(payload, process.env.key_jwt);
    return token;     
}

async function login(req, res) {
    try {
        
        const user = await UserController.getUserByEmail(req.body.email);
        console.log(user);
        if (!user){
            return res.status(401).json({status: 401, message: "Email or password is invalid#1"});
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(401).json({status: 401, message: "Email or password is invalid#2"});
        }
        const jwt_token = createToken(user);
        //const jwt_token = 'klgnlfdhsksmkdfdsflsfjvklnenvljslsihvhsvknslvs';
        const authResponse = { ...user, token: jwt_token };
        delete authResponse.password;
        delete authResponse.id;
        delete authResponse.createdAt;
        delete authResponse.updatedAt;
        //res.set('Authorization', jwt_token);
        return res.status(200).json(authResponse);
    } catch (error) {
        return res.status(401).json({status: 401, message: error.message});
    }
}

module.exports = { login };