const mongoose = require('mongoose')
const Quote = require('./model')
const dbURI = require('./enviro')
const quotes = require('./quotes')

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, async (err, db) => {
  process.env.MONGODBATLASURI ? console.log('Connected to MongoDB Atlas.') : console.log('Connect to local MongoDB.')
  if (err) return console.log('initial:', err)
  await db.dropDatabase()
  const dbPop = await Quote.create(quotes.quotes)
  console.log(`${dbPop.length} quotes seeded.`)
  mongoose.connection.close()
})