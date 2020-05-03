import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

export default function Pin() {
  const history = useHistory()
  const [tenetStage, setTenetStage] = useState(false)
  const [combination, setCombination] = useState([])

  const pin = process.env.PIN.split(',').map(num => Number(num))

  function handleCombination(event) {
    // Don't add number if it's already been clicked
    if (combination.includes(event.target.id)) return null

    // Add new pin to combination
    const newCombination = [...combination, Number(event.target.id) + 1]
    event.target.classList.add('grey')
    setCombination(newCombination)

    // If the correct pins are chosen, navigate to the next page
    if (newCombination.filter(num => pin.includes(num)).length === pin.length) {
      event.target.parentNode.parentNode.classList.remove('fadeIn')
      event.target.parentNode.parentNode.classList.remove('slow')
      event.target.parentNode.parentNode.classList.add('fadeOut')
      setTimeout(() => {
        console.log('tenet')
        setTenetStage(true)
      }, 500)
    }

    // Resetting the pins
    if (newCombination.length === pin.length) {
      console.log('PINCODE', newCombination)
      setCombination([])
      const target = event.target.parentNode.parentNode.childNodes
      setTimeout(() => target.forEach(div => console.log(div.childNodes[0].classList = 'pin')), 500)
    }
  }

  function handleBackClick() {
    return history.push('/dash')
  }

  return (
    <div className="tenet-container">
      <i className="tenet-back animated fadeIn fas fa-arrow-left" onClick={() => handleBackClick()}></i>
      {!tenetStage &&
        <div className="pin-grid animated fadeIn slow"> 
          {[...Array(12)].map((ele, i) => (
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