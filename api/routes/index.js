const bodyParser = require('body-parser');
const users = require('./usersRoute');

module.exports = app => {
    app.use(bodyParser.json())
    app.use(users)
};