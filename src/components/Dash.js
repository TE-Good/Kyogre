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
    console.log('test', e.target.classList)
    if (e.target.classList.contains('black-text')) return history.push('/tenet')
    if (!tenetButtonShow) return e.target.classList.add('black-text', 'fadeIn')
    setTenetButtonShow(true)
  }

  // Will need to call API to get info for this page.
  // IDEA: Have TENET move up and then the tenet appear underneath. Or have
  // it clickable to reveal?

  // MAP //
  // INTRO NAME & IMAGE
  // ADD ANIMATIONS TO QUOTES APPEARING AND GOING
  // ADD UNDERLINE TO QUOTE OF THE DAY OR RANDOM ICON DEPENDING ON WHATS SHOWN
  // ADD MY BUTTON TO NAV TO A NEW PAGE WITH PIN - WHICH HOLDS THE TENET
  // ADD MONGODB AND STORE QUOTES
  
  // BUGS //
  // BUTTONS MOVE DOWN WHEN THERES TWO LINES TO THE QUOTES - FIX THE BUTTON LOCATION
  // - OR ~ INFRONT OF AUTHOR?
  // MAKE PINS RESPONSIVE - MAKE PIN 3x3 ?
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