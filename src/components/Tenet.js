import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import Pin from './Pin'

export default function Tenet({ darkTheme, switchToLightTheme, switchToDarkTheme }) {
  const history = useHistory()
  const [tenetStage, setTenetStage] = useState(false)
  
  const handleBackClick = () => history.push('/dash')

  return (
    <div className="tenet-container">
      <i className="tenet-back light-theme-button animated fadeIn fas fa-arrow-left" onClick={() => handleBackClick()}></i>
      {!tenetStage && <Pin setTenetStage={setTenetStage} darkTheme={darkTheme} switchToLightTheme={switchToLightTheme} switchToDarkTheme={switchToDarkTheme}/>}
      {tenetStage &&
        process.env.TENET.split('/ ').map((line, i) => (
          <div key={i} className="tenet-line animated fadeIn">{line}</div>)
        )}
    </div>
  )
}