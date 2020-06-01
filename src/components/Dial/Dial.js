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

  return <div ref={ref} data-testid='dial' style={{height: '100px', width: 100, backgroundColor: 'green', transitionDuration: '0.6s'}}>ksjfh</div>
})

export default Dial 