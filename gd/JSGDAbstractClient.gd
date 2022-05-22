extends Node
class_name JSGDAbstractClient

var manager: JSGDAbstractClientManager = null
var host = null
var playerName = "Unknown"
var playerPowerup = 1

func init(_manager: JSGDAbstractClientManager, _host):
    self.manager = _manager
    self.host = _host

func reportScore(score):
  manager.log(score)
