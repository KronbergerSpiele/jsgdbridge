class Engine {
  constructor(config: object)
  static isWebGLAvailable(): boolean
  startGame(callbacks: { onProgress(current: number, total: number): void })
}
// eslint-disable-next-line no-redeclare
declare const Engine: Engine
export default Engine
