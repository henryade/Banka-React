const express = require('express');
const log = require('fancy-log');
const { config } = require('dotenv');

config();

const { PORT } = process.env;
const app = express();

app.use(express.static('dist'));

app.listen(PORT, () => log(`Server running at ${PORT}`));
