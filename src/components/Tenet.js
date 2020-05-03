import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

export default function Pin() {
  const history = useHistory()
  const [tenetStage, setTenetStage] = useState(false)
  const [combination, setCombination] = useState([])
  
  function handleCombination(event) {
    // Don't add number if it's already been clicked
    if (combination.includes(event.target.id)) return null
    
    const pin = process.env.PIN.split(',').map(num => Number(num))

    // Add new pin to combination
    const newCombination = [...combination, Number(event.target.id) + 1]
    event.target.classList.add('grey')
    setCombination(newCombination)

    console.log(new Set([...pin, ...newCombination]))
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

  const handleBackClick = () => history.push('/dash')

  return (
    <div className="tenet-container">
      <i className="tenet-back animated fadeIn fas fa-arrow-left" onClick={() => handleBackClick()}></i>
      {!tenetStage &&
        <div className="pin-grid animated fadeIn slow"> 
          {[...Array(12)].map((num, i) => (
            <div key={i} className="pin-container"><div id={i} className="pin" onClick={handleCombination}></div></div>
          ))}
        </div>
      }
      {tenetStage &&
        process.env.TENET.split('/ ').map((line, i) => <div key={i} className="tenet-line animated fadeIn">{line}</div>)
      }
    </div>
  )
}