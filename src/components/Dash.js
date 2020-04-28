import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

export default function Dash() {
  const history = useHistory()
  const [tenet, setTenet] = useState([])
  const [quote, setQuote] = useState('')
  const [secret, setSecret] = useState(false)

  function handleClick() {
    getRandomQuote()
  }
  
  async function getTenet() {
    const response = await fetch('/api/tenet')
    const data = await response.json()
    const formattedData = data.tenet.split('/ ')
    setTenet(formattedData)
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

  useEffect(() => {
    getTenet()
    getQuoteOfTheDay()
  }, [])

  // Will need to call API to get info for this page.
  // IDEA: Have TENET move up and then the tenet appear underneath. Or have
  // it clickable to reveal?
  return (
    <>
      {console.log(tenet, quote)}
      <div className="dash-container animated fadeIn">
        <div className="full-dash-wrapper">
          {/* <h5 className="back-button div-button" onClick={() => history.push('/')}>BACK</h5> */}
          {/* <h1>QUOTE</h1> */}
          <p className="quote-text">{quote.quote}.</p>
          <p className="quote-author">- {quote.author}</p>
          {/* <h4 className="contextual-button div-button" onClick={handleClick}>RANDOM</h4> */}
          <h4 className="contextual-button random-quote-icon" onClick={handleClick}><i className="fas fa-dice"></i></h4>
        </div>
      </div>
    </>
  )
}


// {console.log(tenet, quote)}
// <div className="dash-container animated fadeIn">
//   <div className="half-dash-wrapper">
//     <h1>TENET</h1> 
//     {tenet.map((line, i) => <p key={i}>{line}</p>)} 
//   </div>
//   <div className="half-dash-wrapper">
//     <h5 className="back-button div-button" onClick={() => history.push('/')}>BACK</h5>
//     {/* <h1>QUOTE</h1> */}
//     <p>{quote.quote}.</p>
//     <p>- {quote.author}</p>
//     {/* <h4 className="contextual-button div-button" onClick={handleClick}>RANDOM</h4> */}
//     <h4 className="contextual-button random-icon" onClick={handleClick}><i className="fas fa-dice"></i></h4>
//   </div>
// </div>