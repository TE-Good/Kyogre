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

    // If the correct pins are chosen, navigate to the next page
    if (newCombination.filter(num => correctCombination.includes(num)).length === 4) {
      event.target.parentNode.parentNode.classList.remove('fadeIn')
      event.target.parentNode.parentNode.classList.remove('slow')
      event.target.parentNode.parentNode.classList.add('fadeOut')
      setTimeout(() => {
        return history.push('/dash')
      }, 500)
    }

    // Resetting the pins
    if (newCombination.length === 4) {
      console.log('PINCODE', newCombination)
      setCombination([])
      const target = event.target.parentNode.parentNode.childNodes
      setTimeout(() => target.forEach(div => console.log(div.childNodes[0].classList = 'pin')), 500)
    }
  } 

  return (
    <div className="pin-grid animated fadeIn slow">
      {[...Array(12)].map((ele, i) => (
        <div key={i} className="pin-container animated bounce delay-1s fast"><div id={i} className="pin" onClick={handleCombination}></div></div>
      ))}
    </div>
  )
}