const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()

require('dotenv').config();

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }))
app.use(bodyParser.json({ limit: '100mb' }))

// Cors
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, OPTIONS, DELETE")
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  next()
})

// require('./src/app/routes')(app)

let port = process.env.PORT || 80

app.get('/', (req, resp) => {
	resp.send(`App is running at port ${port}`)
})

app.listen(port, () => {
	console.log('Running at port:' + port)
})

module.exports = app
