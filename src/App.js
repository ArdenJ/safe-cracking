import React from 'react'

import Lock from './components/Lock/Lock'

export const App = () => {
  return (
    <div data-testid='rootElement'>
      <h1>Beep beep boop</h1>
      <Lock secret={[1, 5, 4, 7]} buttonLength={40}/>
    </div>
  )
}
