const express = require('express')
const router = require('express').Router()
const moment = require('moment')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const dbURI = require('./enviro')
const Quote = require('./model')
const PORT = process.env.PORT || 8000

// Mongo connection and db connection log
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('Mongo connected.'))

// JSON parser middleware (only needed for passing HTTP request body)
// app.use(express.json())

// Used process.cwd() instead of __dirname. 
// Because the former gives the root directory of where the node script was run, where the later gives you the local of the file where its run.
app.use(express.static(`${process.cwd()}/dist`))

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

// WHAT DOES sendFile DO?
app.use('/*', (req, res) => res.sendFile(`${process.cwd()}/index.html`))

// Routes & Controllers
// app.get('/api/quote', (req, res) => res.send(quotes.quotes[moment().format('DDD') % quotes.quotes.length]))
// app.get('/api/random_quote', (req, res) => res.send(quotes.quotes[Math.floor(Math.random() * quotes.quotes.length)]))

// Express connection log
app.listen(PORT, () => console.log(`Receiving on port ${PORT}`))
