// Core Module
const express = require('express')
const router = require('express').Router()
const moment = require('moment')
const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config()

const { getDatabaseInfo } = require('./enviro')
const { QuotesService } = require('./quotes_service')
const Quote = require('./model')

const app = express()
const URI = getDatabaseInfo()

// Mongo connection //
console.log(`Connecting to ${URI.name}...`)
mongoose.connect(URI.URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log(`Connected to ${URI.name}.`)
})

// Database connection log //
app.listen(process.env.PORT, () => console.log(`Receiving on port ${process.env.PORT}.`))

// Middleware //
// JSON parser middleware (only needed for passing HTTP request body)
app.use(express.json())

// process.cwd() could be used instead of __dirname as it gives the root directory name. But hosting on heroku, this may not work.
// Because the former gives the root directory of where the node script was run, where the later gives you the local of the file where its run.
// express.static: Exposes a directory or a file to a particular URL so it's contents can be publicly accessed.
app.use(express.static(path.join(__dirname, '..', '/dist')))


// HTTP method & route call log
app.use((req, res, next) => {
  console.log(`${req.method} to ${req.url}`)
  return next()
})

// Router/Routes //
router.route('/quote').get(async (req, res) => res.send(await QuotesService.getQuoteOfTheDay()))
router.route('/random_quote').get(async (req, res) => res.send(await QuotesService.getRandomQuote()))
router.route('/quote_of_the_day').get(async (req, res) => res.send(await QuotesService.getNEWQuoteOfTheDay()))

app.use('/api', router)

// This gets any other urls and sends them to the dist index html page where it'll find the correct page
// The '..' appends to to the __dirname. So this brings it up a level then into the dist file
// Sends all other GET requests to the frontend.
app.use('*', (req, res) => res.sendFile(path.join(__dirname, '..', '/dist/index.html')))
// app.use('/*', (req, res) => res.sendFile(`${process.cwd()}/index.html`))
