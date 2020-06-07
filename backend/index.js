const express = require('express')
const router = require('express').Router()
const moment = require('moment')
const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config()

const app = express()
const dbURI = require('./enviro')
const Quote = require('./model')
const PORT = process.env.PORT
const HOST = "0.0.0.0"

// Mongo connection and db connection log
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('Mongo connected.'))


// Middleware
// JSON parser middleware (only needed for passing HTTP request body)
app.use(express.json())

// process.cwd() could be used instead of __dirname as it gives the root directory name. But hosting on heroku, this may not work.
// Because the former gives the root directory of where the node script was run, where the later gives you the local of the file where its run.
app.use(express.static(path.join(__dirname, '..', '/dist')))


// HTTP method & route call log
app.use((req, res, next) => {
  console.log(`${req.method} to ${req.url}`)
  return next()
})


// Controllers
async function quoteOfTheDay(req, res) {
  const quotes = await Quote.find()
  return res.send(quotes[moment().format('DDD') % quotes.length])
}

async function randomQuote(req, res) {
  const quotes = await Quote.find()
  return res.send(quotes[Math.floor(Math.random() * quotes.length)])
}

// Router/Routes 
router.route('/quote').get(quoteOfTheDay)
router.route('/random_quote').get(randomQuote)

app.use('/api', router)

// This gets any other urls and sends them to the dist index html page where it'll find the correct page
// The '..' appends to to the __dirname. So this brings it up a level then into the dist file
app.use('*', (req, res) => res.sendFile(path.join(__dirname, '..', '/dist/index.html')))
// app.use('/*', (req, res) => res.sendFile(`${process.cwd()}/index.html`))

// Routes & Controllers
// app.get('/api/quote', (req, res) => res.send(quotes.quotes[moment().format('DDD') % quotes.quotes.length]))
// app.get('/api/random_quote', (req, res) => res.send(quotes.quotes[Math.floor(Math.random() * quotes.quotes.length)]))

// Express connection log
app.listen(PORT, HOST, () => console.log(`Receiving on port ${PORT}`))
