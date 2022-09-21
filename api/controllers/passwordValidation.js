const yup = require('yup')
require('yup-password')(yup);

const schema = yup.object().shape({
    password: yup.string().password().required()
});

module.exports = schema;