import express from 'express';
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const loginRoute = require('./../routes/router');

app.use('/', loginRoute);

module.exports = app;