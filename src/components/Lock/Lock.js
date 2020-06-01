import React, {useState} from 'react'
import {useMachine} from '@xstate/react'

import Combination from '../Combination/Combination'
import { safeMachine } from '../../safeMachine'


const Lock = ({secret, buttonLength}) => {
  // TODO: Don't return to client throw error instead
  // Return an error in view 
  if (Math.max(...secret) > buttonLength) throw new Error('too many secrets, not enough buttons')

  // Acceptance states
  const STATES = {
    PENDING: "Test Combination",
    ERR: 'error',
    CORRECT: 'correct',
  }

  const MACHINE = safeMachine(secret)
  const [current, send] = useMachine(MACHINE)
  
  const updateCode = (val) => send("ENTER_CODE", {value: val})
  const resetCode = () => send("RESET")
  const tryCode = () => send("TRY")
  const getCode = current.context.code
  
  const [accepted, setAccepted] = useState({ state: STATES.PENDING })
  
  const handleCheck = () => {
    const { value } = tryCode()
    switch (value) {
      case 'success': 
      setAccepted({state: STATES.CORRECT})
      break;
      case 'failure': 
      setAccepted({state: STATES.ERR})
      break;
      case 'idle':
        default: 
        setAccepted({ state: STATES.PENDING })
        break;
      } 
    } 

  const handleClick = (value) => {
    if (getCode.length >= 4) return 
    updateCode(value)
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
      <Combination code={getCode}/>
      <button onClick={() => {
        resetCode()
        setAccepted({state: STATES.PENDING}) // TODO: clean this up
      }}>
        Reset
      </button>
      <button onClick={() => handleCheck()}>
        {accepted.state}
      </button>
    </div>
  )
}

export default Lock