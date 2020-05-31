import React, {useState} from 'react'

import Combination from '../Combination/Combination'
import {checkCode} from './checkCode'

const Lock = ({secret, buttonLength}) => {
  // TODO: Don't return to client throw error instead
  // Return an error in view 
  if (Math.max(...secret) > buttonLength) return (
  <h2 data-testid='error'>Error: too many secrets, not enough buttons</h2>
  )

  // Acceptance states
  const STATES = {
    PENDING: "Test Combination",
    ERR: 'error',
    CORRECT: 'correct',
  }
  
  const [accepted, setAccepted] = useState({ state: STATES.PENDING })

  const handleCheck = (secret, answer) => {
    checkCode(secret, answer) 
    ? setAccepted({state: STATES.CORRECT}) 
    : setAccepted({state: STATES.ERR})
  } 

  // Users combination state
  const [combination, setCombination] = useState({ code: [] })
  
  const handleClick = (value) => {
    if (combination.code.length >= 4) return 
    setCombination({ code: [...combination.code, value] } )
  }

 // Creates an array of 60 buttons with numbers 1..60
  const noOfButtons = buttonLength
  const buttons = new Array
  for (let i = 1; i <= noOfButtons; i++) {
    buttons.push(
      <button 
        key={`button_${i}`} 
        data-testid='lockButton' 
        onClick={() => handleClick(i)}>
          {i}
      </button>
    )
  }

  return (
    <div>
      {buttons}
      <Combination code={combination.code}/>
      <button onClick={() => {
        setCombination({code: []})
        setAccepted({state: STATES.PENDING})
        }
      }>
        Reset
      </button>
      <button onClick={() => handleCheck(secret, combination.code)}>
        {accepted.state}
      </button>
    </div>
  )
}

export default Lock