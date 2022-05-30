declare global {
  interface Window {
    jsgdhost?: {
      playerName: string
      reportScore(score: number): void
      playerPowerUp?: number
      onPlayerNameChanged?(value: string): void
      onPlayerPowerUpChanged?(value: number): void
    }
    registerGodot?(godot: any): void
  }
}
export {}
