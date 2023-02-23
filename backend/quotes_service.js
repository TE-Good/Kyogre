const moment = require('moment')

const { Quote, QuoteOfTheDay } = require('./model')


const _getCurrentQuoteOfTheDay = async () => {
  const afterRawDate = new Date()
  const isAfterDate = moment(afterRawDate).format('YYYY-MM-DD')

  const beforeRawDate = new Date()
  const isBeforeDate = moment(beforeRawDate.setDate(beforeRawDate.getDate() + 1)).format('YYYY-MM-DD')

  return QuoteOfTheDay.findOne({ createdAt: { $gte: isAfterDate, $lt: isBeforeDate } })
}

const _createNewQuoteOfTheDay = async () => {
  const allQuotes = await Quote.find()
  const allQOTD = await QuoteOfTheDay.find()

  const quoteWithOccurrences = allQuotes.map((quote) => {
    const occurrences = allQOTD.filter(qotd => String(quote._id) === qotd.quoteId).length
    return { ...quote._doc, occurrences }
  })


  const lowestQuoteOccurrenceValue = quoteWithOccurrences.sort((a, b) => a.occurrences > b.occurrences ? 1 : -1)[0].occurrences
  const leastUsedQuotes = quoteWithOccurrences.filter(quote => quote.occurrences === lowestQuoteOccurrenceValue)
  
  const newQuoteOfTheDay = leastUsedQuotes[Math.floor(Math.random() * leastUsedQuotes.length)]
  delete newQuoteOfTheDay.occurrences

  await QuoteOfTheDay.create({ quoteId: newQuoteOfTheDay._id })

  return newQuoteOfTheDay
}

// Controller
const QuotesService = {
  getNEWQuoteOfTheDay: async () => {
    const theQuoteOfTheCurrentDay = await _getCurrentQuoteOfTheDay()
    if (theQuoteOfTheCurrentDay) return await Quote.findOne({ _id: theQuoteOfTheCurrentDay.quoteId })

    const newQuoteOfTheDay = _createNewQuoteOfTheDay()
    return newQuoteOfTheDay
   
  },
  getQuoteOfTheDay: async () => {
    const quotes = await Quote.find()
    const now = moment().format('DDD')

    return quotes[now % quotes.length]
  },
  getRandomQuote: async () => {
    const quotes = await Quote.find()
    const randomIndex = Math.floor(Math.random() * quotes.length)
    return quotes[randomIndex]
  }
}

module.exports = { QuotesService }