const mongoose = require('mongoose')
const Quote = require('./model')
const dbURI = require('./env')
const quotes = require('./quotes')

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, async (err, db) => {
  if (err) return console.log('initial:', err)
  try {
    await db.dropDatabase()
    const dbPop = await Quote.create(quotes.quotes)
    console.log(`${dbPop.length} quotes seeded.`)
    mongoose.connection.close() 
  } catch {
    console.log('catch:', err)
  }
})