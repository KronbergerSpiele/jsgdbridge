import React, { CSSProperties } from 'react'
import useResizeObserver from 'use-resize-observer'

import Engine from './engine'
import './global.d'

export type JSGDHostProps = {
  playerName: string
  prefix: string
  canvasResizePolicy?: 0 | 1 | 2
  reportScore(score: number): void
  playerPowerUp?: number
  executable?: string
  canvasWidth?: number
  canvasHeight?: number
  NoticeBlock?: React.FC<React.PropsWithChildren<{ style?: CSSProperties }>>
}

export type Godot = any

export const JSGDHost: React.FC<JSGDHostProps> = React.memo(function JSGDHost(
  props
) {
  const {
    prefix,
    executable = 'game',
    canvasResizePolicy = 0,
    reportScore,
    playerName,
    playerPowerUp = 1,
    canvasHeight = 320,
    canvasWidth = 480,
    NoticeBlock,
  } = props

  const containerRef = React.useRef<HTMLDivElement>(null)
  const isRescaling = canvasResizePolicy === 0
  const { width: containerWidth = 320, height: containerHeight = 480 } =
    useResizeObserver<HTMLDivElement>({
      ref: containerRef,
    })

  const godotSrc = React.useMemo(() => `${prefix}/${executable}.js`, [])

  const godotRef = React.useRef(null)
  const engineRef = React.useRef<Engine | null>(null)
  const [notice, setNotice] = React.useState<string | null>(null)

  const startEngine = React.useCallback((Godot: Godot) => {
    console.log('Starting JSGDHost', props)
    const GODOT_CONFIG = {
      args: [],
      canvasResizePolicy,
      experimentalVK: false,
      fileSizes: {},
      focusCanvas: true,
      gdnativeLibs: [],
      executable,
      prefix,
      Godot,
    }

    window.jsgdhost = {
      playerName,
      reportScore,
      playerPowerUp,
    }

    const engine = new Engine(GODOT_CONFIG)
    engineRef.current = engine

    if (!Engine.isWebGLAvailable()) setNotice('WebGL not available')
    else
      engine
        .startGame({
          onProgress(current, total) {
            setNotice(`loading: ${current} bytes`)
          },
        })
        .then(() => {
          setNotice(null)
        })
        .catch((err: any) => {
          console.log(err)
          setNotice(err)
        })
  }, [])

  const registerGodot = React.useCallback((Godot: Godot) => {
    console.log('register godot')
    console.log(Godot)
    godotRef.current = Godot
    window.registerGodot = undefined
    startEngine(Godot)
  }, [])

  const fetchEngine = React.useCallback(() => {
    console.log('fetching engine')
    fetch(godotSrc)
      .then(r => r.text())
      .then(godotScript => {
        const withoutEngine = godotScript.replace(
          /^if \(typeof exports === 'object'.*/ms,
          ''
        )
        const withSetter = `
              ${withoutEngine}
              registerGodot(Godot);
            `
        window.registerGodot = registerGodot

        const script = document.createElement('script')
        script.innerHTML = withSetter
        containerRef.current?.appendChild(script)
      })
  }, [])

  React.useEffect(() => {
    fetchEngine()
  }, [])

  React.useEffect(() => {
    window.jsgdhost?.onPlayerNameChanged?.(playerName)
  }, [playerName])

  React.useEffect(() => {
    window.jsgdhost?.onPlayerPowerUpChanged?.(playerPowerUp)
  }, [playerPowerUp])

  const renderedNotice = notice ? (
    NoticeBlock ? (
      <NoticeBlock
        style={{
          position: 'absolute',
        }}
      >
        {notice}
      </NoticeBlock>
    ) : (
      <p
        style={{
          position: 'absolute',
        }}
      >
        {notice}
      </p>
    )
  ) : null

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
      }}
      ref={containerRef}
    >
      {renderedNotice}
      <canvas
        id='canvas'
        height={isRescaling ? containerHeight : canvasHeight}
        width={isRescaling ? containerWidth : canvasWidth}
        style={{ position: 'absolute', outline: 'none' }}
      >
        HTML5 canvas appears to be unsupported in the current browser. Please
        try updating or use a different browser.
      </canvas>
    </div>
  )
})

export default JSGDHost
