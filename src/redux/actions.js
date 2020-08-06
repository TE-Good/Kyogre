export const GET_QUOTE = 'ADD_QUOTE'

export const getQuote = quote => {

  const quote = {
    quote: 'Test Quote',
    author: 'Test Author'
  }
  
  return { type: GET_QUOTE, payload: quote }
}