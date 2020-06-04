import {Machine, assign} from 'xstate'
import {useMachine} from '@xstate/react'

const updateCode = assign((context, event) => {
  if (event.value === undefined || typeof event.value !== 'number') return 
  if (context.code.length === 4) return 
  context.code = [...context.code, event.value]
})

const resetCode = assign(context => context.code = [])

const assertCorrect = context => context.code === context.secret
const assertIncorrect = context => context.code !== context.secret

const assertLength = context => context.code.length === 4

const safeMachine = (secret) => Machine({
  id: 'safe',
  initial: 'idle',
  context: {
    code: [],
    secret
  },
  states: {
    idle: {
      // entry: { actions: 'resetCode' }, // TODO: This would make code a little dryer
      on: {
        ENTER_CODE: { actions: 'updateCode' },
        TRY: { target: 'trying' },
        RESET: { actions: 'resetCode' },
      }
    },
    trying: {
      on: {
        '': [
          { target: 'success', cond: context => JSON.stringify(context.code) === JSON.stringify(context.secret) },
          { target: 'failure', cond: context => JSON.stringify(context.code) !== JSON.stringify(context.secret) },
        ]
      },
    },
    success: {
      // type: 'final', // <- TODO: invoke a new child machine to fetch 🐰
      on: {
        RESET: {
          target: 'idle',
          actions: 'resetCode'
        }
      }
    },
    failure: {
      on: {
        RESET: {
          target: 'idle',
          actions: 'resetCode'
        }
      }
    }
  }
}, {
  actions: {
    updateCode,
    resetCode,
  },
  guards: {
    assertCorrect,
    assertIncorrect,
    assertLength,
  }
});

// State Machine & hook
export const hookMethods = (secret) => {
  const MACHINE = safeMachine(secret)
  const [current, send] = useMachine(MACHINE)
    
  // Event methods
  const updateCode = (val) => send("ENTER_CODE", {value: val})
  const resetCode = (ref) => {
    ref.current.style.transform = `rotate(0deg)`
    send("RESET")
  }
  const tryCode = () => send("TRY")
  const getCode = current.context.code

  return { updateCode, resetCode, tryCode, getCode }
}