import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Dial from './Dial'

test("it renders a dial", () => {
  const ref = {
    current: <button>beep boop</button>
  }
  const { getByTestId } = render(<Dial ref={ref} noOfButtons={10} button={5}/>)

  const dial = getByTestId('dial')
  expect(dial).toBeInTheDocument()
})

test("it can rotate to equally distant points on the perimter", () => {
  const ref = {
    current: <button>beep boop</button>
  }
  const { getByTestId } = render(<Dial ref={ref} noOfButtons={10} button={2}/>)

  const dial = getByTestId('dial')
  expect(dial).toHaveStyle('transform: rotate(36deg)')
})


// This should be an integration test?
describe("the rotation of the dial can be updated", () => {
  test("when a button is clicked", () => {
    const ref = {
      current: <button>beep boop</button>
    }

    let int = null
    const {getByTestId} = render(<Dial ref={ref} noOfButtons={10} button={int}/>)
    const dial = getByTestId('dial')

    expect(dial).not.toHaveStyle('transform: rotate(180deg)')
    int = 5
    expect(dial).toHaveStyle('transform: rotate(-36deg)')
  })
})