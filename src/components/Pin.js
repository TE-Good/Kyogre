import React, { useState } from 'react'


export default function Pin({ setTenetStage }) {
  const [combination, setCombination] = useState([])

  function handleCombination(event) {
    // Don't add number if it's already been clicked
    if (combination.includes(event.target.id)) return null
    
    const pin = process.env.PIN.split(',').map(num => Number(num))

    // Add new pin to combination
    const newCombination = [...combination, Number(event.target.id) + 1]
    event.target.classList.add('grey')
    setCombination(newCombination)

    // If the correct pins are chosen, navigate to the next page
    if (newCombination.length === pin.length && [...new Set([...pin, ...newCombination])].length === pin.length) {
      event.target.parentNode.parentNode.classList.remove('fadeIn')
      event.target.parentNode.parentNode.classList.remove('slow')
      event.target.parentNode.parentNode.classList.add('fadeOut')
      setTimeout(() => setTenetStage(true), 500)
    }

    // Resetting the pins
    if (newCombination.length === pin.length) {
      setCombination([])
      const target = event.target.parentNode.parentNode.childNodes
      setTimeout(() => target.forEach(div => div.childNodes[0].classList = 'pin'), 500)
    }
  }

  return (
    <div className="pin-grid animated fadeIn slow"> 
      {[...Array(12)].map((num, i) => (
        <div key={i} className="pin-container">
          <div id={i} className="pin dark-theme-pin" onClick={handleCombination}></div>
        </div>
      ))}
    </div>
  )
}
