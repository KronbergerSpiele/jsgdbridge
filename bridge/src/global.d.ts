declare global {
  interface Window {
    jsgdhost: {}
    registerGodot?(godot: any): void
  }
}
export {}
