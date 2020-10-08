import React, { useState, useEffect } from 'react'
import isEqual from 'lodash.isequal'


export default function Pin({ setTenetStage, darkTheme }) {
  const [combination, setCombination] = useState(new Set())
  const [isPinCorrect, setIsPinCorrect] = useState(false)

  const pinCombination = new Set(process.env.PIN.split(',').map(num => Number(num)))

  const pinThemeClass = darkTheme ? 'dark-theme-pin' : 'light-theme-pin'

  function handleCombination(event) {
    // User input pin
    const pinInput = Number(event.target.id)
    const selectedCombination = new Set([...combination, pinInput])
    setCombination(selectedCombination)

    // If the selected pin correct -> continue. Else, if the length is the same -> reset.
    if (isEqual(pinCombination, selectedCombination)) {
      setIsPinCorrect(true)
      setTimeout(() => setTenetStage(true), 500)
    } else if (selectedCombination.size === pinCombination.size) {
      setCombination(new Set())
    }
  }

  return (
    <div className={`pin-grid animated ${isPinCorrect ? 'fadeOut' : 'fadeIn slow'}`}>
      {[...Array(12)].map((num, i) => (
        <div key={i} className="pin-container">
          <div id={i} className={`pin ${pinThemeClass} ${combination.has(i) ? 'grey' : ''}`} onClick={handleCombination}></div>
        </div>
      ))}
    </div>
  )
}
