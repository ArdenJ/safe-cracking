import React, {useEffect} from 'react'
import styled from '@emotion/styled'

const Dial = React.forwardRef(({noOfButtons, button}, ref) => {

  const getRotation = (noOfButtons) => 360 / noOfButtons
  const increments = getRotation(noOfButtons)

  useEffect(() => {
    const degrees = (button - 1) * increments

    // TODO: The test on this is a false pass - needs to be strengthened. 
    // Behaviour is fine but not as intended
    0 + degrees < (-1 * (0 - degrees)) 
    ? ref.current.style.transform = `rotate(${0 + degrees}deg)`
    : ref.current.style.transform = `rotate(${-1 * (0 - degrees)}deg)`
  }, [button])

  return (
    <StyledDial ref={ref} data-testid='dial' style={{boxSizing: 'border-box', height: 340, width: 340}}>
      <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="transparent"/>
        <line x1="20" y1="0" x2="20" y2="6" style={{ stroke: "#001f3f", strokeWidth: 1 }}/>
      </svg>
    </StyledDial>)
})

export default Dial 

const StyledDial = styled.div`
  background: linear-gradient(145deg, #ffffff, #d8e0e6);
  border: 1px solid #fefefe;
  border-radius: 50%; 
  transition-duration: 0.6s;
`