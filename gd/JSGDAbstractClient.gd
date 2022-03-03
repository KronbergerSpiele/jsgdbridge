extends Node
class_name JSGDAbstractClient

var manager: JSGDAbstractClientManager = null
var host = null

func init(_manager: JSGDAbstractClientManager, _host):
    self.manager = _manager
    self.host = _host

func reportScore(score):
  print(score)
