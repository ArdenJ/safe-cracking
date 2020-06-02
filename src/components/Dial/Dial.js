import React, {useEffect} from 'react'

const Dial = React.forwardRef(({noOfButtons, button}, ref) => {

  const getRotation = (noOfButtons) => 360 / noOfButtons
  const increments = getRotation(noOfButtons)

  useEffect(() => {
    const degrees = (button - 1) * increments
    0 + degrees < (-1 * (0 - degrees)) 
    ? ref.current.style.transform = `rotate(${0 + degrees}deg)`
    : ref.current.style.transform = `rotate(${-1 * (0 - degrees)}deg)`
  }, [button])

  return <div ref={ref} data-testid='dial' style={{height: 200, width: 200, border: '2px solid purple', transitionDuration: '0.6s'}}>
            <svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
          <circle cx="5" cy="5" r="2" />
          <line
            x1="5"
            y1="3"
            x2="5"
            y2="3.2"
            style={{ stroke: "rgb(255,0,0)", strokeWidth: 0.4 }}
          />
        </svg>
  </div>
})

export default Dial 