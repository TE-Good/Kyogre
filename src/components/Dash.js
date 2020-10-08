import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

export default function Dash({ darkTheme }) {
  const history = useHistory()
  const [quote, setQuote] = useState('')
  const [tenetButtonShow, setTenetButtonShow] = useState(false)

  const buttonThemeClass = darkTheme ? 'dark-theme-button' : 'light-theme-button'

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

  const navToTenetPage = e => e.keyCode === 84 && history.push('/tenet')

  const handleTenetButton = () => tenetButtonShow ? history.push('/tenet') : setTenetButtonShow(true)

  useEffect(() => {
    getQuoteOfTheDay()
    window.addEventListener('keyup', e => navToTenetPage(e))
    return () => {
      window.removeEventListener('keyup', e => navToTenetPage(e))
    }
  }, [])

  return (
    <>
      <i className={`tenet-button fab fa-superpowers secondary-color animated ${tenetButtonShow ? 'fadeIn' : 'opacity'}`} onClick={() => handleTenetButton()}></i>
      <div className="dash-container animated fadeIn">
        <div className="quote-text">{quote.quote}</div>
        <div className="quote-author">- {quote.author}</div>
        <div className="button-container secondary-color">
          <h4 className={`qotd-button ${buttonThemeClass}`} onClick={() => getQuoteOfTheDay()}>QUOTE OF THE DAY</h4>
          <h4 className={`random-quote-icon ${buttonThemeClass}`} onClick={() => getRandomQuote()}><i className="fas fa-dice"></i></h4>
        </div>
      </div>
    </>
  )
}