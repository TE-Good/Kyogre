// Models Module
const mongoose = require('mongoose')

// Defining schema
const quoteSchema = new mongoose.Schema({
  quote: String,
  author: String,
  count: Number
})

// Building the quote model
const Quote = mongoose.model('Quote', quoteSchema)

module.exports = Quote
