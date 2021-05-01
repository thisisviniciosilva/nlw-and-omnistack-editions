const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const routes = require('./routes');
const { setup } = require('./websocket');

const config = require('../config');

const app = express();
const server = http.Server(app);

setup(server);

mongoose
  .connect(config.connection, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.emit('connected_db'))
  .catch(e => console.error('ERROR CONNECTING TO DATABASE.'));

app.use(cors());
app.use(express.json());
app.use(routes);

app.on('connected_db', () => server.listen(config.port));
