const { Joi } = require('frisby');

const validateLogin = (user) => {
  const schema = {
    email: Joi.string().min(1).max(255).required()
      .email({ tlds: { allow: ['.com', '.net'] } }),
    password: Joi.string().min(6).max(255).required(),
  };

  return Joi.validate(user, schema);
};

const validateAuthorization = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization === undefined) {
    res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (name === undefined || name === '') {
    res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (age === undefined || age === '') {
    res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (Number(age) < 18) {
    res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const validateWatchedAt = (req, res, next) => {
  const { talk } = req.body;
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (talk.watchedAt === undefined) {
    res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (talk.watchedAt.match(regex) === null) {
    res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const validateRate = (req, res, next) => {
  const { talk } = req.body;
  if (talk.rate === undefined || talk.rate === '') {
    res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (talk.rate < 1 || talk.rate > 5) {
    res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  if (talk === undefined) {
    res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  validateWatchedAt(req, res, next);
  validateRate(req, res, next);
  next();
};

module.exports = { 
  validateLogin,
  validateAuthorization,
  validateName,
  validateAge,
  validateTalk,
  validateRate,
  validateWatchedAt,
};