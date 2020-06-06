const mongoose = require('mongoose')
const Quote = require('./model')
const dbURI = require('./enviro')
const quotes = require('./quotes')

process.env.MONGODB_ATLAS_HEROKU_URI ? console.log('Connecting to MongoDB Atlas...') : console.log('Connect to local MongoDB.')
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, async (err, db) => {
  process.env.MONGODB_ATLAS_HEROKU_URI ? console.log('Connected to MongoDB Atlas.') : console.log('Connect to local MongoDB.')
  if (err) return console.log('initial:', err)
  await db.dropDatabase()
  const dbPop = await Quote.create(quotes.quotes)
  console.log(`${dbPop.length} quotes seeded.`)
  mongoose.connection.close()
})