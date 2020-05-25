require('dotenv').config()

// Enviroment settings
const localDbURI = 'mongodb://localhost/kyogre'
const dbURI = process.env.MONGODBATLASURI || localDbURI

module.exports = dbURI