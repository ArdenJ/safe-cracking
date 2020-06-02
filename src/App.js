import React from 'react'
import styled from '@emotion/styled'

import Lock from './components/Lock/Lock'

export const App = () => {
  return (
    <div data-testid='rootElement' style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      // alignItems: 'center'
    }}>
      <Lock secret={[1, 5, 4, 7]} buttonLength={40}/>
    </div>
  )
}