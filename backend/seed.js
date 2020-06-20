const mongoose = require('mongoose')
const inquirer = require('inquirer')

const Quote = require('./model')
const { dbURI, localDbURI } = require('./enviro')
const quotes = require('./quotes')

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
    const dbPop = await Quote.create(quotes.quotes)
    console.log(`${dbPop.length} quotes seeded.`)
    mongoose.connection.close()
  })
}

seedPrompt()
