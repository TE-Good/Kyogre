import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

export default function Pin() {
  const [combination, setCombination] = useState([])

  const history = useHistory()

  const correctCombination = ['1', '2', '3', '4']

  function handleCombination(event) {
    // Don't add number if it's already been clicked
    if (combination.includes(event.target.id)) return null

    // Add new pin to combination
    const newCombination = [...combination, event.target.id]
    event.target.classList.add('grey')
    setCombination(newCombination)

    // Resetting the pins
    if (newCombination.length === 4) {
      console.log('PINCODE', newCombination)
      setCombination([])
      const target = event.target.parentNode.parentNode.childNodes
      setTimeout(() => target.forEach(div => console.log(div.childNodes[0].classList = 'pin')), 500)
    }

    // If the correct pins are chosen, navigate to the next page
    if (newCombination.filter(num => correctCombination.includes(num)).length === 4) return history.push('/dash')
  }

  return (
    <div className="pin-grid animated fadeIn slow">
      {console.log('combination =', combination)}
      <div className="pin-container animated bounce delay-1s fast"><div id="1" className="pin" onClick={handleCombination}></div></div>
      <div className="pin-container animated bounce delay-1s fast"><div id="2" className="pin" onClick={handleCombination}></div></div>
      <div className="pin-container animated bounce delay-1s fast"><div id="3" className="pin" onClick={handleCombination}></div></div>
      <div className="pin-container animated bounce delay-1s fast"><div id="4" className="pin" onClick={handleCombination}></div></div>
      <div className="pin-container animated bounce delay-1s fast"><div id="5" className="pin" onClick={handleCombination}></div></div>
      <div className="pin-container animated bounce delay-1s fast"><div id="6" className="pin" onClick={handleCombination}></div></div>
      <div className="pin-container animated bounce delay-1s fast"><div id="7" className="pin" onClick={handleCombination}></div></div>
      <div className="pin-container animated bounce delay-1s fast"><div id="8" className="pin" onClick={handleCombination}></div></div>
      <div className="pin-container animated bounce delay-1s fast"><div id="9" className="pin" onClick={handleCombination}></div></div>
      <div className="pin-container animated bounce delay-1s fast"><div id="10" className="pin" onClick={handleCombination}></div></div>
      <div className="pin-container animated bounce delay-1s fast"><div id="11" className="pin" onClick={handleCombination}></div></div>
      <div className="pin-container animated bounce delay-1s fast"><div id="12" className="pin" onClick={handleCombination}></div></div>
    </div>
  )
}