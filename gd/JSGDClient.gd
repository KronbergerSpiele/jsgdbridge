extends JSGDAbstractClient
class_name JSGDClient

func init(manager: JSGDAbstractClientManager, host):
    .init(manager, host)
    
    var name = self.host.playerName
    manager.log('jsgdhost found')
    manager.log(name)

func reportScore(score):
  manager.log('client score')
  manager.log(score)
  host.reportScore(score)
