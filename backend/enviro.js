// Environment Settings Module
require('dotenv').config()

const localDbURI = 'mongodb://localhost/kyogre'
const dbURI = process.env.MONGODB_ATLAS_URI || localDbURI

function getDatabaseInfo() {
  // Checks for --local from command line
  const useLocalDatabase = process.env.npm_config_argv.includes('--local')

  const URI = useLocalDatabase ? localDbURI : dbURI

  return { URI, name: useLocalDatabase ? 'Local MongoDB' : 'MongoDB Atlas' }
}

module.exports = { dbURI, localDbURI, getDatabaseInfo }
