import JSGDHost from '@kronbergerspiele/jsgdbridge'
import * as React from 'react'
import { createRoot } from 'react-dom/client'
const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
  <div>
    <JSGDHost
      playerName='Johnny'
      reportScore={score => console.log('score', score)}
      prefix='https://kronbergerspiele.github.io/bloodfever/'
    />
  </div>
)
