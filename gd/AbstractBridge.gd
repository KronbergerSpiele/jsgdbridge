extends Node
class_name AbstractBridge

var manager: AbstractJSGDBridgeManager = null

func init(manager: AbstractJSGDBridgeManager):
    self.manager = manager
