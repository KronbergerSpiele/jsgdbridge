import * as React from 'react'

import JSGDHost from '../bridge'

export type HostProps = {
  prefix: string
}

export const Host: React.FC<HostProps> = function Host({ prefix }) {
  return (
    <JSGDHost
      playerName='Johnny'
      reportScore={score => console.log('score', score)}
      prefix={prefix}
    />
  )
}
