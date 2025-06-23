const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.post('/owntracks/:user/:device', (req, res) => {
  console.log('Received OwnTracks location:');
  console.log(req.body);
  res.status(200).send('OK');
});

app.get('/', (req, res) => {
  res.send('OwnTracks server is running.');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});