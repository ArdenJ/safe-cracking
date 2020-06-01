import React, {useState, useEffect, useRef} from 'react'
import {useMachine} from '@xstate/react'

import Combination from '../Combination/Combination'
import { safeMachine } from '../../safeMachine'

import Dial from '../Dial/Dial'

const Lock = ({secret, buttonLength}) => {

  // Return an error if the code is impossible
  if (Math.max(...secret) > buttonLength) throw new Error('too many secrets, not enough buttons')


  // TODO: abstract to meta hook
  // State Machine & hook
  const MACHINE = safeMachine(secret)
  const [current, send] = useMachine(MACHINE)
  
  // Event methods
  const updateCode = (val) => send("ENTER_CODE", {value: val})
  const resetCode = () => {
    refCont.current.style.transform = `rotate(0deg)`
    send("RESET")
  }
  const tryCode = () => send("TRY")
  const getCode = current.context.code
  

  // Acceptance states
  const STATES = {
    PENDING: "Test Combination",
    ERR: 'error',
    CORRECT: 'correct',
  }

  const [accepted, setAccepted] = useState({ state: STATES.PENDING })
  
  // Evaluate state
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


  // Evaluate code on click  
  const handleClick = (value) => {
    if (getCode.length >= 4) return 
    updateCode(value)
  }

  // Button reference
  const refCont = useRef(null)
 
  // Creates an array of 60 buttons with numbers 1..60
  const noOfButtons = buttonLength
  const buttons = new Array
  for (let i = 1; i <= noOfButtons; i++) {
    buttons.push(
      <button 
      ref={refCont}
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
        setAccepted({state: STATES.PENDING})
      }}>
        Reset
      </button>
      <button onClick={() => handleCheck()}>
        {accepted.state}
      </button>
      <Dial ref={refCont} noOfButtons={buttonLength} button={getCode[getCode.length - 1]} />
    </div>
  )
}

export default Lock