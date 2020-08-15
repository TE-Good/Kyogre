import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getQuote } from '../redux/actions'

export default function Dash() {
  const history = useHistory()
  const dispatch = useDispatch()
  const [quote, setQuote] = useState('')
  const [tenetButtonShow, setTenetButtonShow] = useState(false)

  const storeQuote = useSelector(state => state)
  console.log(storeQuote)

  function handleClick() {
    getRandomQuote()
  }

  // async function getQuoteOfTheDay() {
  //   const response = await fetch('/api/quote')
  //   const data = await response.json()
  //   setQuote(data)
  // }

  function getQuoteOfTheDay() {
    getQuote()
    // setQuote(data) // replace this by directly using storeQuote.quote & storeQuote.author in the JSX
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
    if (!e.target.classList.contains('opacity')) return history.push('/tenet')
    if (!tenetButtonShow) return e.target.classList.remove('opacity', 'fadeIn')
    setTenetButtonShow(true)
  }


  return (
    <>
      <i className="tenet-button fab fa-superpowers secondary-color animated opacity" onClick={e => handleTenetButton(e)}></i>
      <div className="dash-container animated fadeIn">
        <div className="quote-text">{quote.quote}</div>
        <div className="quote-author">- {quote.author}</div>
        <div className="button-container secondary-color">
          <h4 className="qotd-button light-theme-button" onClick={() => getQuoteOfTheDay()}>QUOTE OF THE DAY</h4>
          <h4 className="random-quote-icon light-theme-button" onClick={handleClick}><i className="fas fa-dice"></i></h4>
        </div>
      </div>
    </>
  )
}