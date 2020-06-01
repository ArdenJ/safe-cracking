import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Lock from './Lock'
import {SECRET} from '../../safeMachine'

const testCode = [1, 5, 4, 7]

describe("it renders a lock", () => {
  test("the lock contains a series of buttons", () => {
    const { getAllByTestId } = render(<Lock secret={testCode} buttonLength={60}/>)

    const buttonArray = getAllByTestId('lockButton')
    expect(buttonArray[0]).toHaveTextContent(/1/)
  })
})

describe("it requires 4 numbers only", () => {
  test("and accepts a combination", () => {
    const { getByTestId, getByText } = render(<Lock secret={testCode} buttonLength={60}/>)

    const butt = getByText('1')
    fireEvent.click(butt)
    
    const combination = getByTestId('combination')
    expect(combination).toHaveTextContent(testCode[0])
  })
    
  test("and accepts 4 numbers", () => {
    const { getByTestId, getByText } = render(<Lock secret={testCode} buttonLength={60}/>)

    const buttons = testCode.map(i => getByText(`${i}`))

    buttons.forEach((i, index) => {
      fireEvent.click(i)
      const combination = getByTestId('combination')
      expect(combination).toHaveTextContent(testCode.slice(0, index+1).join(''))
    })
  })

  test("and won't accept more than four numbers", () => {
    const { getByText, getByTestId } = render(<Lock secret={testCode} buttonLength={60}/>)
    fireEvent.click(getByText(`${10}`))
    fireEvent.click(getByText(`${13}`))
    fireEvent.click(getByText(`${26}`))
    fireEvent.click(getByText(`${33}`))
    fireEvent.click(getByText(`${39}`))

    const combination = getByTestId('combination')
    // 10132633 - as it doesn't accept more than 4 numbers
    expect(combination).toHaveTextContent(`10132633`)
  })
})


describe("it evaluates whether the code is correct", () => {

  it("and returns 'error' if the code is wrong or empty", () => {
    const { getByText } = render(<Lock secret={testCode} buttonLength={60}/>)

    fireEvent.click(getByText(/Test Combination/i))
    expect(getByText(/error/i)).toBeInTheDocument()
  })

  it("and returns 'correct' if the code is accepted", () => {
    const { getByText, getByTestId } = render(<Lock secret={testCode} buttonLength={60}/>)

    for (let i of testCode) fireEvent.click(getByText(`${i}`))
    expect(getByTestId('combination')).toHaveTextContent(testCode.join(''))

    fireEvent.click(getByText(/test combination/i))
    expect(getByText(/correct/i)).toBeInTheDocument()
  })
}) 

describe("it resets when the reset button is pressed", () => {

  it("it empties the last combination of numbers", () => {
    const {getByText, getByTestId} = render (<Lock secret={testCode} buttonLength={60}/>)

    const combination = getByTestId('combination')
    for (let i of testCode) fireEvent.click(getByText(`${i}`))
    expect(combination).toHaveTextContent(testCode.join(''))

    fireEvent.click(getByText(/reset/i))
    expect(combination).toHaveTextContent('')
  })

  it("and sets the Test Combination back to 'Test Combination", () => {
    const {getByText} = render(<Lock secret={testCode} buttonLength={60}/>)

    const testButton = getByText(/test combination/i)
    fireEvent.click(testButton)
    expect(getByText('error')).toBeInTheDocument()
    
    const resetButton = getByText(/reset/i)
    fireEvent.click(resetButton)
    expect(getByText(/test combination/i)).toBeInTheDocument()
  })
})