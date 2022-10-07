const Joi = require('joi');

const joiValidate = (type, params) => {
    const schema = Joi.object(params);
    return schema.validate(type, {
        allowUnknown: true,
    });
};


module.exports = {
    joiValidate,
};