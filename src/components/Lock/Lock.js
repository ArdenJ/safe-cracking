import React, {useState, useRef} from 'react'
import styled from '@emotion/styled'

import {hookMethods} from '../../safeMachine'

import Combination from '../Combination/Combination'
import Dial from '../Dial/Dial'

const Lock = ({secret, buttonLength}) => {
  // Return an error if the code is impossible
  if (Math.max(...secret) > buttonLength) throw new Error('too many secrets, not enough buttons')

  const { updateCode, resetCode, tryCode, getCode } = hookMethods(secret)

  // Acceptance states
  const STATES = {
    DISABLED: 'Test Combination',
    PENDING: 'Test Combination',
    ERR: 'Error',
    CORRECT: 'Correct',
  }

  const [accepted, setAccepted] = useState({ state: STATES.PENDING })

  const statusButton = document.getElementById('buttbutt')
  
  // Handle changes in states on transition
  const handleCheck = () => {
    console.log(statusButton)
    const { value } = tryCode()
    switch (value) {
      case 'success': 
      setAccepted({state: STATES.CORRECT})
      statusButton.style.backgroundColor = 'green'
      break;
      case 'failure': 
      setAccepted({state: STATES.ERR})
      statusButton.style.backgroundColor = 'red'
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
    <StyledWrapper>
      <StyledContainer>
        <div className='dial'>
          <Dial ref={refCont} noOfButtons={buttonLength} button={getCode[getCode.length - 1]}/>
        </div>
        {buttons}
      </StyledContainer>
      <Combination code={getCode}/>
      <StyledButtonContainer>
        <button onClick={() => {
          statusButton.style.backgroundColor = '#001f3f'
          resetCode(refCont)
          setAccepted({state: STATES.PENDING})
        }}>
          Reset
        </button>
        <button id='buttbutt' onClick={() => handleCheck()}>
          {accepted.state}
        </button>
      </StyledButtonContainer>
    </StyledWrapper>
  )
}

export default Lock

// Styling
const StyledWrapper = styled.div`
  display: grid;
  grid-template-areas: 
    'code dial'
    'controls dial'
  ;
  width: 70vw; 
  grid-template-rows: 35% 65%;
`

const StyledContainer = styled.div`
  grid-area: dial;
  z-index: 9001;
  position: relative;
  width: 24em;
  height: 24em;
  padding: 2.8em;
  border: 1px solid #fefefe;
  border-radius: 50%;
  margin: 1.75em auto 0;
  transform: rotate(-90deg);
  background: linear-gradient(225deg, #d8e0e6, #ffffff);
  box-shadow:  -9px 9px 25px #b4bbbf, 
                9px -9px 25px #ffffff
    ;

  div {
    display: block;
    position: absolute;
    top: 50%; left: 50%;
    width: 2em; height: 2em;
    margin: -1em;
  }

  .dial {
    transform: translateX(485%) translateY(-485%) rotate(90deg);
  }

  button { display: block; width: 100%; height: 100%;
    transform: rotate(90deg);
    border: none; 
    border-radius: 50%;
    background-color: none;
    background: none;
    color: #001f3f;
  }
`

const StyledButton = styled.div(props => ({
  transform: `rotate(${props.rotation}deg) translate(14em) rotate(-${props.rotation}deg)`
}))

const StyledButtonContainer = styled.div`
  grid-area: controls;
  margin-top: 1rem;
  height: 6rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  button {
    text-transform: uppercase;
    font-weight: 400;
    font-size: 1rem;
    width: 11rem;
    height: 80%;
    background-color: #001f3f;
    border: none;
    border-radius: 10px;
    color: white;
    transition-duration: 0.3s;
  }
`