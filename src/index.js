const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

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