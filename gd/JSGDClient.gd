extends JSGDAbstractClient
class_name JSGDClient

func init(manager: JSGDAbstractClientManager, host):
    .init(manager, host)
    
    if host:
      playerName = self.host.playerName
      playerPowerup = float(self.host.playerPowerup)
      manager.log(playerName)
      manager.log(playerPowerup)

func reportScore(score):
  manager.log('client score')
  manager.log(score)
  host.reportScore(score)
