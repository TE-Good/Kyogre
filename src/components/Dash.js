import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

export default function Dash() {
  const history = useHistory()

  function handleClick() {
    console.log('click')
  }
  
  async function getQuoteOfTheDay() {
    const response = await fetch('api/quote')
    console.log('response', response)
  }

  useEffect(() => {
    console.log('useEffect')
    getQuoteOfTheDay()
  }, [])

  // Will need to call API to get info for this page.
  // IDEA: Have TENET move up and then the tenet appear underneath. Or have
  // it clickable to reveal?
  return (
    <>
      {console.log(process.env.TEST)}
      <div className="dash-container animated fadeIn">
        <div className="half-dash-wrapper">
          <h1>TENET</h1> 
        </div>
        <div className="half-dash-wrapper">
          <h5 className="back-button div-button" onClick={() => history.push('/')}>BACK</h5>
          <h1>QUOTE</h1>
          <h4 className="contextual-button div-button" onClick={handleClick}>RANDOM</h4>
        </div>
      </div>
    </>
  )
}