const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const crypto = require('crypto');
const validateLogin = require('./middlewares');

let token;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log(`Online na porta ${PORT}`);
});

// Caso haja pessoas cadastradas

app.get('/talker', (_req, res) => {
  const result = JSON.parse(fs.readFileSync('src/talker.json', 'utf-8'));
  res.status(200).json(result);
});

// Caso nao haja pessoas cadastradas

app.get('/talker', (_req, res) => {
  const result = JSON.parse(fs.readFileSync('src/talker.json', 'utf-8'));
  res.status(200).json(result);
});

app.get('/talker/:id', (req, res) => {
  const id = Number(req.params.id);
  const data = JSON.parse(fs.readFileSync('src/talker.json', 'utf-8'));
  const filteredTalker = data.find((t) => t.id === id);
  if (filteredTalker) {
    res.status(200).json(filteredTalker);
  } else {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
});

const returnEmail = (res, erro) => {
  if (erro === '"email" must be a valid email') {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  } 
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
};

const returnPassword = (res, erro) => {
  console.log(erro);
  if (erro === '"password" length must be at least 6 characters long') {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  } if (erro === '"password" is required') {
  return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
};

app.post('/login', (req, res) => {
  const { error } = validateLogin(req.body);
  if (error && error.details[0].message.includes('email')) {
    returnEmail(res, error.details[0].message);
  } else if (error && error.details[0].message.includes('password')) {
    returnPassword(res, error.details[0].message);
  } else {
    token = crypto.randomBytes(8).toString('hex');
    res.status(200).json({ token });
  }
});