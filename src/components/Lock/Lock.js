import React, {useState, useEffect, useRef} from 'react'
import {useMachine} from '@xstate/react'
import emotion from 'emotion'
import styled from '@emotion/styled'

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
      <StyledButton rotation={(360 / noOfButtons) * (i - 1)}>
      <button 
      key={`button_${i}`} 
      data-testid='lockButton' 
      onClick={() => handleClick(i)}
      >
          {i}
      </button>
      </StyledButton>
    )
  }
  
  return (
    <div>
      <Combination code={getCode}/>
      <StyledContainer>
        <div className='dial'>
          <Dial ref={refCont} noOfButtons={buttonLength} button={getCode[getCode.length - 1]}/>
        </div>
        {buttons}
      </StyledContainer>
      <button onClick={() => {
        resetCode()
        setAccepted({state: STATES.PENDING})
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


const StyledButton = styled.div(props => ({
  transform: `rotate(${props.rotation}deg) translate(14em) rotate(-${props.rotation}deg)`
}))

const StyledContainer = styled.div`
    position: relative;
    width: 24em;
    height: 24em;
    padding: 2.8em;
    border: dashed 1px;
    border-radius: 50%;
    margin: 1.75em auto 0;
    transform: rotate(-90deg);

  div {
    display: block;
    position: absolute;
    top: 50%; left: 50%;
    width: 2em; height: 2em;
    margin: -1em;
  }

  .dial {
    transform: translateX(250%) translateY(-250%) rotate(90deg);
  }

  button { display: block; width: 100%; height: 100%;
    transform: rotate(90deg);
    border: none; 
    border-radius: 50%;
    background-color: #11142a;
    color: white;

  }
`

// apply the .deg class to each item within a .container 