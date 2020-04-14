import React from 'react'
import ReactDOM from 'react-dom'

import Pin from './components/Pin'

import './styles.css'

function App() {
  return (
    <Pin />
  )
}

ReactDOM.render(<App />, document.getElementById('container'))
