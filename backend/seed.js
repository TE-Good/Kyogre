const mongoose = require('mongoose')
const Quote = require('./model')
const { dbURI, localDbURI } = require('./enviro')
const quotes = require('./quotes')

// MAKE A LOCAL AND ATLAS VERSIONS? OR DO BOTH? USE INQUIRER

dbURI !== localDbURI ? console.log('Connecting to MongoDB Atlas...') : console.log('Connecting to local MongoDB.')
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, async (err, db) => {
  dbURI !== localDbURI ? console.log('Connected to MongoDB Atlas.') : console.log('Connected to local MongoDB.')
  if (err) return console.log('initial:', err)
  await db.dropDatabase()
  const dbPop = await Quote.create(quotes.quotes)
  console.log(`${dbPop.length} quotes seeded.`)
  mongoose.connection.close()
})