const mongoose = require('Mongoose')
const { quotesModel, dbURI } = require('./index')
const quotes = require('./quotes')

mongoose.connect(dbURI, { useNewUrlParser: true }, async (db, err) => {
  if (err) return console.log(err)
  try {
    await db.dropDatabase()
  
    const dbPop = await quotesModel.create(quotes.quotes)
  
    await console.log(`${dbPop.length} quotes seeded.`)
  } catch {
    console.log(err)
  }
  mongoose.connection.close()
})