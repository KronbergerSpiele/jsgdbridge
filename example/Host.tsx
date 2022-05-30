import { HeadingMedium } from 'baseui/typography'
import * as React from 'react'

import JSGDHost from '../bridge'

export type HostProps = {
  playerName: string
  prefix: string
  canvasResizePolicy?: 0 | 1
  playerPowerUp: number
}

export const Host: React.FC<HostProps> = function Host({
  prefix,
  canvasResizePolicy = 0,
  playerName,
  playerPowerUp,
}) {
  return (
    <JSGDHost
      playerName={playerName}
      canvasResizePolicy={canvasResizePolicy}
      reportScore={score => console.log('score', score)}
      prefix={prefix}
      playerPowerUp={playerPowerUp}
      NoticeBlock={HeadingMedium}
    />
  )
}
