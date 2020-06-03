import React from 'react'
import styled from '@emotion/styled'
import {Global, css} from '@emotion/core'

import Lock from './components/Lock/Lock'

export const App = () => {
  return (
    <>
    <Global styles={css`
      html, body {
        margin: 0px;
        padding: 0px;
        font-family: 'Muli', sans-serif;
        background-color: #f0f9ff;
      }
    `}/>
    <div data-testid='rootElement' style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
    }}>
      <Lock secret={[1, 5, 4, 7]} buttonLength={40}/>
    </div>
    </>
  )
}