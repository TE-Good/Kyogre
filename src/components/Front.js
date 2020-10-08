import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'


export default function Front({ darkTheme }) {
  const history = useHistory()
  const [fadeIn, setFadeIn] = useState(true)

  const buttonThemeClass = darkTheme ? 'dark-theme-button' : 'light-theme-button'

  useEffect(() => {
    setTimeout(() => setFadeIn(false),2000)
    setTimeout(() => history.push('/dash'), 2500)
  }, [])

  return (
    <div className="front-container">
      <div className="front-main">
        <h1 className={`animated ${fadeIn ? 'fadeIn' : 'fadeOut'}`}>KYOGRE</h1>
      </div>
      <div className="front-bottom animated fadeIn">
        <i className={`fas fa-forward ${buttonThemeClass}`} onClick={() => history.push('/dash')}></i>
      </div>
    </div>
  )
}