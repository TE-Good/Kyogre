// Seeding Module
const mongoose = require('mongoose')
const inquirer = require('inquirer')

const Quote = require('./model')
const { dbURI, localDbURI } = require('./enviro')
const quotesList = require('../../quotes/quotes.json')

const { quotes } = quotesList;

async function seedPrompt() {
  const seedInput = await inquirer.prompt({
    type: 'list',
    name: 'input',
    message: 'Select location to seed:',
    choices: ['Local MongoDB', 'Remote MongoDB Atlas']
  })

  if (seedInput.input === 'Local MongoDB') return seed(localDbURI, 'Local MongoDB')
  else return seed(dbURI, 'MongoDB Atlas')
}

function seed(dbURI, locationName) {
  console.log(`Connecting to ${locationName}...`)
  mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, async (err, db) => {
    console.log(`Connected to ${locationName}.`)

    if (err) return console.log('initial:', err)

    await db.dropDatabase()

    const formattedQuotes = addCountToQuotes(quotes)
    const dbPop = await Quote.create(formattedQuotes)
    console.log(`${dbPop.length} quotes seeded.`)

    mongoose.connection.close()
  })
}

const addCountToQuotes = (quotes) => quotes.map(quote => ({ ...quote, count: 0 }));

seedPrompt()
