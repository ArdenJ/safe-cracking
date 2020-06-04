import React from 'react'
import styled from '@emotion/styled'

const Combination = ({code}) => {
const codeArray = code.map((i, index) => {
  return <h2 key={`item_${index}`} data-testid={`code_${index}`}>{i}</h2>
})

  return (
    <StyledCombination data-testid='combination'>
      {codeArray}
    </StyledCombination>
  )
}

export default Combination

const StyledCombination = styled.div`
  display: flex; 
  justify-content: space-evenly; 
  width: 100%; 
  height: 100%; 
  grid-area: code; 
  align-items: flex-end;
`