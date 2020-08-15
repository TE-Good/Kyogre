export const GET_QUOTE = 'ADD_QUOTE'

// export const getQuote = (quoteObj) => (dispatch) => {
//   const quote = { quote: 'Test Quote', author: 'Test Author' }
//   console.log('test')
//   return dispatch({ type: GET_QUOTE, payload: quote })
// }
export const getQuote = (quoteObj) => {
  console.log('test')
  return (dispatch) => {
    console.log('test1')
    return dispatch({ type: GET_QUOTE, payload: quote })
  }
}