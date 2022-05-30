extends Node
class_name JSGDManager

var host = null
var playerName = "Unknown"
var playerPowerUp = 1

signal playerNameChanged(newName)
signal playerPowerUpChanged(newPowerUp)

func info(arg):
  print("JSGDBridge: ", arg)

func _ready():
    info("initializing host")
    host = JavaScript.get_interface("jsgdhost")
    if !host:
      info("no host found")
    else:
      playerName = self.host.playerName
      playerPowerUp = float(self.host.playerPowerUp)
      info(playerName)
      info(playerPowerUp)
      host.onPlayerNameChanged = _onPlayerNameChanged_ref
      host.onPlayerPowerUpChanged = _onPowerUpChanged_ref
      
func reportScore(score):
  info('sending score to client:')
  info(score)
  if host:
    host.reportScore(score)

var _onPlayerNameChanged_ref = JavaScript.create_callback(self, "onPlayerNameChanged")
func onPlayerNameChanged(newName):
  if newName is Array:
    newName = newName[0]
  playerName = newName
  emit_signal("playerNameChanged", newName)
  
var _onPowerUpChanged_ref = JavaScript.create_callback(self, "onPowerUpChanged")
func onPowerUpChanged(newPowerUp):
  print('new power up', newPowerUp)
  if newPowerUp is Array:
    newPowerUp = newPowerUp[0]
  playerPowerUp = newPowerUp
  emit_signal("playerPowerUpChanged", newPowerUp)
