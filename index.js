class JSGDBridge {
  /**
   * Create a JSGDBridge Instance on your main frame
   * Pass it into the iframe running the game
   * @param {string} playerName
   */
  constructor(playerName) {
    this.playerName = playerName;
  }
}

window.JSGDBridge = JSGDBridge;
