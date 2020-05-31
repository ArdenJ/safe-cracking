import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Combination from './Combination.js'

const testCode = [1, 5, 4, 7]

test('it renders the input code to the screen', () => {
  const { getByTestId } = render(<Combination code={testCode}/>)

  expect(getByTestId('combination')).toBeInTheDocument()
  
  for (let i = 0; i < testCode.length; i++) {
    expect(getByTestId(`code_${i}`)).toHaveTextContent(testCode[i])
  }
})

