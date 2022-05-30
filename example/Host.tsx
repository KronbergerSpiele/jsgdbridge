import * as React from 'react'

import JSGDHost from '../bridge'

export type HostProps = {
  prefix: string
  canvasResizePolicy?: 0 | 1
}

export const Host: React.FC<HostProps> = function Host({
  prefix,
  canvasResizePolicy = 0,
}) {
  return (
    <JSGDHost
      playerName='Johnny'
      canvasResizePolicy={canvasResizePolicy}
      reportScore={score => console.log('score', score)}
      prefix={prefix}
    />
  )
}
