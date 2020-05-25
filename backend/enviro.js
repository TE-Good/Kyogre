require('dotenv').config()

// Enviroment settings
const localDbURI = 'mongodb://localhost/kyogre'
const dbURI = process.env.MONGODBURI || localDbURI

module.exports = dbURI