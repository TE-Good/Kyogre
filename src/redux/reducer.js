import { GET_QUOTE } from './actions'

const intialState = {
  quote: '',
  author: ''
}

const rootReducer = (state = intialState, action) => {
  if (action.type === GET_QUOTE) {
    return {
      quote: action.payload.quote,
      author: action.payload.author
    }
  }
  return state
}

export default rootReducer