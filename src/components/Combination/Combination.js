import React from 'react'

const Combination = ({code}) => {
const codeArray = code.map((i, index) => {
  return <div key={`item_${index}`} data-testid={`code_${index}`}>{i}</div>
})

  return (
    <div data-testid='combination'>
      {codeArray}
    </div>
  )
}

export default Combination