import { HeadingMedium } from 'baseui/typography'
import * as React from 'react'

import JSGDHost from '../bridge'

export type HostProps = {
  playerName: string
  prefix: string
  canvasResizePolicy?: 0 | 1
  playerPowerUp: number
  reportScore(score: number): void
}

export const Host: React.FC<HostProps> = function Host({
  prefix,
  canvasResizePolicy = 0,
  playerName,
  playerPowerUp,
  reportScore,
}) {
  return (
    <JSGDHost
      playerName={playerName}
      canvasResizePolicy={canvasResizePolicy}
      reportScore={reportScore}
      prefix={prefix}
      playerPowerUp={playerPowerUp}
      NoticeBlock={HeadingMedium}
    />
  )
}
