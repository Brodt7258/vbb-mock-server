const express = require('express');
const cors = require('cors');
let data = require('./MOCK_DATA.json');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/mentees', (req, res) => {
  if (req.query.q) {
    const lq = req.query.q.toLowerCase();
    res
      .status(200)
      .send(data.filter((e) => {
        const f = e.first_name.toLowerCase();
        const l = e.last_name.toLowerCase();
        return f.includes(lq) || l.includes(lq);
      }));
  } else {
    res.status(200).send(data);
  }
});

app.get('/mentees/:id', (req, res) => {
  const id = Number(req.params.id);
  const mentee = data.find(e => e.id === id);
  if (mentee) {
    res.status(200).send(data.find(e => e.id === id));
  } else {
    res.status(404).send({ message: 'no such id' });
  }
});

app.post('/mentees', (req, res) => {
  const increment = data[data.length - 1].id + 1;
  data.push({ id: increment, ...req.body });
  res.status(201).send({ message: 'success', id: increment });
});

app.put('/mentees/:id', (req, res) => {
  const id = Number(req.params.id);
  const i = data.findIndex(e => e.id === id);
  if (i >= 0) {
    data[i] = { ...req.body, id };
    res.status(200).send({ message: 'success' });
  } else {
    res.status(404).send({ message: 'no such id' });
  }
});

app.delete('/mentees/:id', (req, res) => {
  const id = Number(req.params.id);
  const mentee = data.find(e => e.id === id);
  if (mentee) {
    data = data.filter(e => e.id !== id);
    res.status(200).send({ message: 'success' });
  } else {
    res.status(404).send({ message: 'no such id' });
  }
});

const port = process.argv[2] ? Number(process.argv[2]) : 8000;
app.listen(port, () => {
  console.log(`running on port ${port}`);
});
