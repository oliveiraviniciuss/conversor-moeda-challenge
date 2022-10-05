const { joiValidate } = require('../helpers/commons');

const validate = (type, params) => (req, res, next) => {
  const { value, error } = joiValidate(req[type], params);
  req[type] = value;
  return error ? res.status(422).send({ error: error.details }) : next();
};

module.exports = {
  validate
};