declare global {
  interface Window {
    jsgdhost: {
      playerName: string
      reportScore(score: number): void
      playerPowerUp?: number
      onPlayerNameChanged?(): void
      onPlayerPowerUpChanged?(): void
    }
    registerGodot?(godot: any): void
  }
}
export {}
