import { styled, useStyletron } from 'baseui'
import { AppNavBar, setItemActive, NavItemT } from 'baseui/app-nav-bar'
import { Card, StyledBody, StyledAction } from 'baseui/card'
import { Checkbox, LABEL_PLACEMENT } from 'baseui/checkbox'
import { TriangleUp, TriangleLeft, TriangleRight, Overflow } from 'baseui/icon'
import { Input } from 'baseui/input'
import { Slider } from 'baseui/slider'
import { HeadingMedium } from 'baseui/typography'
import * as React from 'react'

import { Host } from './Host'
import { Score } from './Score'

export const App: React.FC = function App() {
  const [css, theme] = useStyletron()
  const [activeItem, setActiveItem] = React.useState<NavItemT | null>(null)
  const [mainItems, setMainItems] = React.useState<NavItemT[]>([
    { icon: TriangleUp, label: 'Localhost' },
    { icon: TriangleLeft, label: 'Kellergewoelbenlauf' },
    { icon: TriangleRight, label: 'Bloodfever' },
  ])
  const userItems = React.useMemo(
    () => [{ icon: Overflow, label: 'Settings' }],
    []
  )
  const handleMainItemSelect = React.useCallback((item: NavItemT) => {
    setMainItems(prev => {
      setActiveItem(item)
      return setItemActive(prev, item)
    })
  }, [])
  const handleUserItemSelect = React.useCallback((item: any) => {}, [])
  const [playerName, setPlayerName] = React.useState('Unknown')
  const [rawPowerUp, setPowerUp] = React.useState([1])
  const [playerPowerUp] = rawPowerUp

  const [activeScore, setActiveScore] = React.useState<null | number>(null)

  const [isSharingEnabled, setIsSharingEnabled] = React.useState(false)

  const onReportScore = React.useCallback(
    (score: number) => {
      console.log('game reported score', score)
      console.log({ isSharingEnabled, score })

      isSharingEnabled && setActiveScore(score)
    },
    [isSharingEnabled]
  )

  const handleScoreCompleted = React.useCallback(() => {
    setActiveScore(null)
  }, [])

  return (
    <React.Fragment>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          width: '100vw',
          backgroundColor: theme.colors.backgroundPrimary,
        })}
      >
        <Nav>
          <AppNavBar
            title="Johnny's Playground"
            mainItems={mainItems}
            userItems={userItems}
            onMainItemSelect={handleMainItemSelect}
            onUserItemSelect={handleUserItemSelect}
            username='Johnny Goslar'
            userImgUrl=''
          />
        </Nav>
        <Settings>
          <Card
            title='Name'
            overrides={{
              Root: { style: () => ({ flexGrow: 0 }) },
            }}
          >
            <StyledBody>
              <Input
                value={playerName}
                onChange={(e: any) => setPlayerName(e.target.value)}
                placeholder='Name'
                clearOnEscape
              />
            </StyledBody>
          </Card>
          <Card
            title='Speed'
            overrides={{
              Root: { style: () => ({ flexGrow: 1 }) },
            }}
          >
            <StyledBody>
              <Slider
                value={rawPowerUp}
                min={0}
                max={3}
                step={0.1}
                onChange={({ value }) => value && setPowerUp(value)}
                onFinalChange={({ value }) => console.log(value)}
                persistentThumb
              />
            </StyledBody>
          </Card>
          <Card
            title='Misc'
            overrides={{
              Root: { style: () => ({ flexGrow: 0 }) },
            }}
          >
            <StyledBody>
              <Checkbox
                checked={isSharingEnabled}
                onChange={(e: any) => setIsSharingEnabled(e.target.checked)}
                labelPlacement={LABEL_PLACEMENT.right}
              >
                Enable score sharing
              </Checkbox>
              <Checkbox
                checked={true}
                onChange={(e: any) => {}}
                labelPlacement={LABEL_PLACEMENT.right}
              >
                Sound
              </Checkbox>
            </StyledBody>
          </Card>
        </Settings>
        <Centered>
          {!activeItem ? (
            <HeadingMedium>Select a game!</HeadingMedium>
          ) : activeItem.label === 'Localhost' ? (
            <Host
              prefix='http://localhost:1235'
              key='localhost'
              canvasResizePolicy={1}
              playerName={playerName}
              playerPowerUp={playerPowerUp}
              reportScore={onReportScore}
            />
          ) : activeItem.label === 'Bloodfever' ? (
            <Host
              prefix='https://kronbergerspiele.github.io/bloodfever/'
              key='bloodfever'
              playerName={playerName}
              playerPowerUp={playerPowerUp}
              reportScore={onReportScore}
            />
          ) : (
            <Host
              prefix='https://kronbergerspiele.github.io/kellergewoelbenlauf/'
              canvasResizePolicy={1}
              playerName={playerName}
              playerPowerUp={playerPowerUp}
              reportScore={onReportScore}
              key='kg'
            />
          )}
        </Centered>
      </div>
      <Score score={activeScore} onCompleted={handleScoreCompleted} />
    </React.Fragment>
  )
}

const Nav = styled('div', ({ $theme }) => ({
  borderBottomColor: $theme.colors.backgroundSecondary,
  borderBottomWidth: '2px',
  borderBottomStyle: 'solid',
  boxSizing: 'border-box',
  width: '100%',
}))

const Settings = styled('div', ({ $theme }) => ({
  borderBottomColor: $theme.colors.backgroundSecondary,
  borderBottomWidth: '2px',
  borderBottomStyle: 'solid',
  boxSizing: 'border-box',
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  gap: $theme.sizing.scale300,
  padding: $theme.sizing.scale300,
  justifyContent: 'center',
}))

const Centered = styled('div', ({ $theme }) => ({
  display: 'flex',
  flexGrow: 100,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: $theme.colors.backgroundPrimary,
}))

export default App
