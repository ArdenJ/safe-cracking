import { interpret } from 'xstate'

import {safeMachine} from './safeMachine.js'


describe('we can use the machine', () => {
  const secret = [4, 5, 1, 8]
  const { send, state } = interpret(safeMachine(secret)).start()
  const codeState = state.context.code

  it('to update the code', () => {
    send({type: "ENTER_CODE"}, {value: 1}),
    expect(codeState.join('')).toMatch(`1`)
  });
});