require('dotenv').config()

// Enviroment settings
const localDbURI = 'mongodb://localhost/kyogre'
const dbURI = process.env.MONGODB_ATLAS_HEROKU_URI || process.env.MONGODB_ATLAS_URI || localDbURI

module.exports = { dbURI, localDbURI }