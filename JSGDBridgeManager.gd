extends AbstractJSGDBridgeManager

var MockBridge = preload("MockBridge.gd")
var JSBridge = preload("JSBridge.gd")

var concreteBridge: AbstractBridge = null

func _enter_tree():
    self.log("initializing")
    var console = JavaScript.get_interface("console")
    if !console:
        self.log("not in JS context")
        self.concreteBridge = MockBridge.new()
    else:
        self.concreteBridge = JSBridge.new()
        console.log("JSGDBridge direct log")
    
    self.concreteBridge.init(self)
