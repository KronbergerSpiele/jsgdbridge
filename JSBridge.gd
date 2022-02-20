extends AbstractBridge
class_name JSBridge

var host

func init(manager: AbstractJSGDBridgeManager):
    .init(manager)

    self.host = JavaScript.get_interface("jsgdbridge")
    var name = self.host.playerName
    manager.log(name)
