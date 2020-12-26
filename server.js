const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

// Config doteenv
require('dotenv').config();
const PORT = process.env.PORT || 80;

// Log application
app.use(morgan('dev'));

// config body parser application
app.use(express.json());

// Cors
app.use(cors());

// Routes
require('./src/app/routes')(app);

// Port
app.listen(PORT, () => {
  console.log(`Running at port ${PORT}`);
});

module.exports = app;
