import React, { useState } from 'react'

export default function Pin() {
  const [combination, setCombination] = useState([])

  function handleCombination(event) {
    const newCombination = [...combination, event.target.id]
    setCombination(newCombination)
    if (newCombination.length === 4) {
      console.log('PINCODE', newCombination)
      setCombination([])
    }
  }

  return (
    <div className="pin-grid">
      {console.log('combination =', combination)}
      <div className="pin-container"><div id="1" className="pin" onClick={handleCombination}></div></div>
      <div className="pin-container"><div id="2" className="pin" onClick={handleCombination}></div></div>
      <div className="pin-container"><div id="3" className="pin" onClick={handleCombination}></div></div>
      <div className="pin-container"><div id="4" className="pin" onClick={handleCombination}></div></div>
      <div className="pin-container"><div id="5" className="pin" onClick={handleCombination}></div></div>
      <div className="pin-container"><div id="6" className="pin" onClick={handleCombination}></div></div>
      <div className="pin-container"><div id="7" className="pin" onClick={handleCombination}></div></div>
      <div className="pin-container"><div id="8" className="pin" onClick={handleCombination}></div></div>
      <div className="pin-container"><div id="9" className="pin" onClick={handleCombination}></div></div>
      <div className="pin-container"><div id="10" className="pin" onClick={handleCombination}></div></div>
      <div className="pin-container"><div id="11" className="pin" onClick={handleCombination}></div></div>
      <div className="pin-container"><div id="12" className="pin" onClick={handleCombination}></div></div>
    </div>
  )
}