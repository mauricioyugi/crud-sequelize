const yup = require('yup');

const schema = yup.object().shape({
    email: yup.string()
        .required("Erro: Preencher o campo de email")
        .email("Erro: Formato de email invalido"),
    first_name: yup.string()
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
        .required("Erro: Campo nome obrigatório"),
    last_name: yup.string()
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
        .required("Erro: Campo sobrenome obrigatório"),
    age: yup.number()
        .typeError("Digite um numero natural inteiro")
        .min(18, "Voce deve ser maior de idade para preencher esse formulario")
        .required("Erro: Necessario preencher campo idade")  
        .integer("Erro: A idade deve ser um numero inteiro")
});

module.exports = schema;