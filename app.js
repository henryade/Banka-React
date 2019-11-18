const express = require('express');
const log = require('fancy-log');
const path = require('path');
const { config } = require('dotenv');

config();

const { PORT } = process.env;
const app = express();

app.use(express.static('dist'));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(PORT, () => log(`Server running at ${PORT}`));
