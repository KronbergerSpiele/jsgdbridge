import { DarkTheme, BaseProvider } from 'baseui'
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { Client as Styletron } from 'styletron-engine-atomic'
import { Provider as StyletronProvider } from 'styletron-react'

import { App } from './App'

const Wrapper: React.FC = function Wrapper() {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={DarkTheme}>
        <App />
      </BaseProvider>
    </StyletronProvider>
  )
}

const engine = new Styletron()

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(<Wrapper />)
