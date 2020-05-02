import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

export default function Dash() {
  const history = useHistory()
  // const [tenet, setTenet] = useState([])
  const [quote, setQuote] = useState('')

  function handleClick() {
    getRandomQuote()
  }
  
  // async function getTenet() {
  //   const response = await fetch('/api/tenet')
  //   const data = await response.json()
  //   const formattedData = data.tenet.split('/ ')
  //   setTenet(formattedData)
  // }

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
    console.log(e.keyCode)
    // if (e.keyCode === 84) return console.log('PIN')
    return e.keyCode === 84 ? history.push('/tenet') : null
  }

  useEffect(() => {
    getQuoteOfTheDay()
    window.addEventListener('keyup', e => handleKeyUp(e))
    return () => {
      window.removeEventListener('keyup', e => handleKeyUp(e))
    }
  }, [])

  // Will need to call API to get info for this page.
  // IDEA: Have TENET move up and then the tenet appear underneath. Or have
  // it clickable to reveal?

  // MAP //
  // INTRO NAME & IMAGE
  // ADD ANIMATIONS TO QUOTES APPEARING AND GOING
  // ADD UNDERLINE TO QUOTE OF THE DAY OR RANDOM ICON DEPENDING ON WHATS SHOWN
  // ADD MY BUTTON TO NAV TO A NEW PAGE WITH PIN - WHICH HOLDS THE TENET
  
  // BUGS //
  // BUTTONS MOVE DOWN WHEN THERES TWO LINES TO THE QUOTES - FIX THE BUTTON LOCATION
  // - OR ~ INFRONT OF AUTHOR?
  return (
    <>
      {console.log(quote)}
      <div className="dash-container animated fadeIn">
        <div className="full-dash-wrapper">
          <div className="quote-text">{quote.quote}</div>
          <div className="quote-author">- {quote.author}</div>
          <div className="button-container">
            <h4 className="div-button" onClick={() => getQuoteOfTheDay()}>QUOTE OF THE DAY</h4>
            <h4 className="random-quote-icon" onClick={handleClick}><i className="fas fa-dice"></i></h4>
          </div>
        </div>
      </div>
    </>
  )
}