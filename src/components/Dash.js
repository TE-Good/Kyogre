import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

export default function Dash() {
  const history = useHistory()
  const [quote, setQuote] = useState('')
  const [tenetButtonShow, setTenetButtonShow] = useState(false)

  function handleClick() {
    getRandomQuote()
  }

  async function getQuoteOfTheDay() {
    const response = await fetch('/api/quote')
    const data = await response.json()
    setQuote(data)
  }

  async function getRandomQuote() {
    const response = await fetch('/api/random_quote')
    const data = await response.json()
    setQuote(data)
  }

  function handleKeyUp(e) {
    return e.keyCode === 84 ? history.push('/tenet') : null
  }

  useEffect(() => {
    getQuoteOfTheDay()
    window.addEventListener('keyup', e => handleKeyUp(e))
    return () => {
      window.removeEventListener('keyup', e => handleKeyUp(e))
    }
  }, [])

  function handleTenetButton(e) {
    if (e.target.classList.contains('black-text')) return history.push('/tenet')
    if (!tenetButtonShow) return e.target.classList.add('black-text', 'fadeIn')
    setTenetButtonShow(true)
  }


  return (
    <>
      <i className="tenet-button fab fa-superpowers animated" onClick={e => handleTenetButton(e)}></i>
      <div className="dash-container animated fadeIn">
        <div className="quote-text">{quote.quote}</div>
        <div className="quote-author">- {quote.author}</div>
        <div className="button-container">
          <h4 className="qotd-button" onClick={() => getQuoteOfTheDay()}>QUOTE OF THE DAY</h4>
          <h4 className="random-quote-icon" onClick={handleClick}><i className="fas fa-dice"></i></h4>
        </div>
      </div>
    </>
  )
}