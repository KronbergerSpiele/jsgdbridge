extends JSGDAbstractClientManager

var client: JSGDAbstractClient = null

func _enter_tree():
    self.log("initializing jsgdhost")
    var jsgdhost = JavaScript.get_interface("jsgdhost")
    if !jsgdhost:
        self.log("no jsgdhost found")
        self.client = JSGDAbstractClient.new()
        self.client.init(self, null)    
    else:
        self.log("jsgdhost found")
        self.client = JSGDClient.new()
        self.client.init(self, jsgdhost)
