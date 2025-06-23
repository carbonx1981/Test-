const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'static')));

const logFile = '/tmp/location-log.txt';

app.post('/owntracks/:user/:device', (req, res) => {
  const entry = {
    timestamp: new Date().toISOString(),
    user: req.params.user,
    device: req.params.device,
    data: req.body
  };
  const logLine = JSON.stringify(entry) + '\n';
  fs.appendFileSync(logFile, logLine);
  console.log('Logged location:', entry);
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

app.get('/map', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'map.html'));
});

app.get('/mapdata', (req, res) => {
  if (!fs.existsSync(logFile)) return res.json([]);
  const lines = fs.readFileSync(logFile, 'utf8').trim().split('\n');
  const data = lines.map(line => {
    try {
      const parsed = JSON.parse(line);
      const { lat, lon } = parsed.data;
      return { lat, lon, user: parsed.user, time: parsed.timestamp };
    } catch (e) {
      return null;
    }
  }).filter(Boolean);
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});