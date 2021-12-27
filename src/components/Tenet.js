import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import Pin from './Pin'

export default function Tenet({ darkTheme }) {
  const history = useHistory()
  const [tenetStage, setTenetStage] = useState(false)

  const buttonThemeClass = darkTheme ? 'dark-theme-button' : 'light-theme-button'
  
  const handleBackClick = () => history.push('/dash')

  return (
    <div className="tenet-container">
      <i className={`tenet-back ${buttonThemeClass} animated fadeIn fas fa-arrow-left`} onClick={() => handleBackClick()}></i>
      {!tenetStage && <Pin setTenetStage={setTenetStage} darkTheme={darkTheme} />}
      {tenetStage &&
        process.env.TENET.split('/ ').map((line, i) => (
          <div key={i} className="tenet-line animated fadeIn">{line}</div>)
        )}
    </div>
  )
}