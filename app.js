const express = require('express');
const path = require('path');
const debug = require('debug');
const { config } = require('dotenv');

config();

const app = express();
const { PORT, NODE_ENV } = process.env;
const log = debug(NODE_ENV);

app.use('/', express.static(path.join(__dirname, '/dist')));

app.listen(PORT, () => log(`Server Started at ${PORT}`));
