const mongoose = require('mongoose')

const quoteSchema = new mongoose.Schema({
  quote: { type: String, required: true },
  author: { type: String, required: true },
  count: { type: Number, required: true, default: 0 }
})

// Building the quote model
const Quote = mongoose.model('Quote', quoteSchema)

module.exports = Quote
