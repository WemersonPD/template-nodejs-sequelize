const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

require('dotenv').config();

// Log application
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(bodyParser.json({ limit: '100mb' }));

// Cors
app.use(cors());

// require('./src/app/routes')(app)

const PORT = process.env.PORT || 80;

app.get('/', (req, resp) => {
	resp.send(`App is running at port ${PORT}`);
});

app.listen(PORT, () => {
	console.log(`Running at port ${PORT}`);
});

module.exports = app;
