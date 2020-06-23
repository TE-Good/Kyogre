// Enviroment Settings Module
require('dotenv').config()

const localDbURI = 'mongodb://localhost/kyogre'
const dbURI = process.env.MONGODB_ATLAS_HEROKU_URI || process.env.MONGODB_ATLAS_URI || localDbURI

// Use --local to use a local version of the database
function flagCheckLocal() {
  const localFlag = process.env.npm_config_argv.includes('--local')
  const currentDbURI = !localFlag ? dbURI : localDbURI

  return { currentDbURI, name: !localFlag ? 'MongoDB Atlas' : 'Local MongoDB' }
}

module.exports = { dbURI, localDbURI, flagCheckLocal }
