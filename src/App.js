import React from 'react'

import Lock from './components/Lock/Lock'

export const App = () => {
  return (
    <div data-testid='rootElement'>
      <h1>Beep beep boop</h1>
      <Lock secret={[1, 2, 3, 4]} buttonLength={40}/>
    </div>
  )
}
