const UserAuthentication = require('../controllers/userAuthentication');

function authentication(req, res, next) {
    const token = req.headers['x-auth'];
    if (token) {
        const tokenChecked = UserAuthentication.checkTokenExpiration(token);
        if (tokenChecked instanceof Error) {
            if (tokenChecked.message == 'TokenExpiredError: jwt expired') {
                return res.status(401).json({ status: 401, message: "O token informado está expirado!" });
            } else if (tokenChecked.message == 'JsonWebTokenError: invalid signature') {
                return res.status(401).json({ status: 401, message: "O token informado não é válido!" });
            } else {
                return res.status(401).json({ status: 401, message: "Autenticação falhou!" });
            }
        }
        console.log("id do user:", tokenChecked.id);
    } else {
        return res.status(401).json({ status: 401, message: "O token não foi informado" });
    }
    next();
}

module.exports = { authentication };