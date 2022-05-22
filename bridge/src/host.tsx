import React from 'react'

import Engine from './engine'
import './global.d'

export type JSGDHostProps = {
  playerName: string
  prefix: string
  canvasResizePolicy?: 0 | 1 | 2
  reportScore(score: number): void
  playerPowerup?: number
  executable?: string
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
    playerPowerup = 1,
  } = props

  const containerRef = React.useRef<HTMLDivElement>(null)

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
      playerPowerup,
    }

    const engine = new Engine(GODOT_CONFIG)
    engineRef.current = engine

    if (!Engine.isWebGLAvailable()) setNotice('WebGL not available')
    else
      engine
        .startGame({
          onProgress(current, total) {
            setNotice(`loading: ${current}/${total}`)
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

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
      ref={containerRef}
    >
      <canvas id='canvas' height={320} width={480} style={{}}>
        HTML5 canvas appears to be unsupported in the current browser. Please
        try updating or use a different browser.
      </canvas>
      {notice ? <p>{notice}</p> : null}
    </div>
  )
})

export default JSGDHost
