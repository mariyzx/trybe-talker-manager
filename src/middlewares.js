const { Joi } = require('frisby');

const validateLogin = (user) => {
  const schema = {
    email: Joi.string().min(1).max(255).required()
      .email({ tlds: { allow: ['.com', '.net'] } }),
    password: Joi.string().min(6).max(255).required(),
  };

  return Joi.validate(user, schema);
};

module.exports = validateLogin;