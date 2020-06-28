import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'


export default function Front() {
  const history = useHistory()

  const [fadeIn, setFadeIn] = useState(true)

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
        <i className="fas fa-forward light-theme-button" onClick={() => history.push('/dash')}></i>
      </div>
    </div>
  )
}