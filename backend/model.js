const mongoose = require('mongoose')

const quoteSchema = new mongoose.Schema({
  quote: { type: String, required: true },
  author: { type: String, required: true },
  count: { type: Number, required: true, default: 0 }
}, { timestamps: true })

const quoteOfTheDaySchema = new mongoose.Schema({
  quoteId: { type: String, required: true },
}, { timestamps: true })

// Building the quote model
const Quote = mongoose.model('Quote', quoteSchema)
const QuoteOfTheDay = mongoose.model('QuoteOfTheDay', quoteOfTheDaySchema)

module.exports = { Quote, QuoteOfTheDay }
