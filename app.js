const express = require('express');
const log = require('fancy-log');

const port = 8000;
const app = express();

app.use(express.static('dist'));

app.listen(port, () => log(`Server running at ${port}`));
