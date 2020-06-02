import React from 'react'

const Combination = ({code}) => {
const codeArray = code.map((i, index) => {
  return <h2 key={`item_${index}`} data-testid={`code_${index}`}>{i}</h2>
})

  return (
    <div data-testid='combination' style={{display: 'flex', justifyContent: 'space-evenly'}}>
      {codeArray}
    </div>
  )
}

export default Combination