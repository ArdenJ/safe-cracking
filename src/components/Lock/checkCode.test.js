import { checkCode } from './checkCode'

const testSecret = [1, 2, 3, 4]

const tests = [
  { testSecret, attempt: testSecret, expected: true },
  { testSecret, attempt: [1, 2, 3, 4], expected: true },
  { testSecret, attempt: [4, 3, 2, 1], expected: false },
  { testSecret, attempt: undefined, expected: false },
  { testSecret, attempt: "false", expected: false },
]

describe("it validates whether the attempt matches the secret", () => {
  test.each(tests)("it returns a boolean", (test) => {
    expect(checkCode(test.testSecret, test.attempt)).toBe(test.expected)
  })
})
