const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

const logFile = 'location-log.txt';

app.post('/owntracks/:user/:device', (req, res) => {
  const entry = {
    timestamp: new Date().toISOString(),
    user: req.params.user,
    device: req.params.device,
    data: req.body
  };

  const logLine = JSON.stringify(entry) + '\n';
  fs.appendFileSync(logFile, logLine);

  console.log('Location received and logged:', entry);
  res.status(200).send('OK');
});

app.get('/', (req, res) => {
  res.send('OwnTracks server is running.');
});

app.get('/log', (req, res) => {
  if (fs.existsSync(logFile)) {
    const content = fs.readFileSync(logFile, 'utf8');
    res.type('text').send(content);
  } else {
    res.status(404).send('No log file found.');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});