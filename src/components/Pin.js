import React, { useState, useEffect } from 'react'
import isEqual from 'lodash.isequal'


export default function Pin({ setTenetStage, darkTheme, switchToLightTheme, switchToDarkTheme }) {
  const [combination, setCombination] = useState(new Set())
  const [isPinCorrect, setIsPinCorrect] = useState(false)
  
  const pinCombination = new Set(process.env.PIN.split(',').map(num => Number(num)))

  function handleCombination(event) {
    // User input pin
    const pinInput = Number(event.target.id)
    const newCombination = new Set([...combination, pinInput])
    setCombination(newCombination)

    if (isEqual(pinCombination, newCombination)) {
      setIsPinCorrect(true)
      setTimeout(() => setTenetStage(true), 500)
    } else if (newCombination.size === pinCombination.size) {
      setCombination(new Set())
    }
  }

  // Theme toggle
  useEffect(() => {
    if (!darkTheme) switchToDarkTheme()
    if (darkTheme) switchToLightTheme()
  }, [])

  return (
    <div className={`pin-grid animated ${isPinCorrect ? 'fadeOut' : 'fadeIn slow'}`}>
      {[...Array(12)].map((num, i) => (
        <div key={i} className="pin-container">
          <div id={i} className={`pin light-theme-pin ${combination.has(i) ? 'grey' : ''}`} onClick={handleCombination}></div>
        </div>
      ))}
    </div>
  )
}
