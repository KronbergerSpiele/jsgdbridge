import { styled, useStyletron } from 'baseui'
import { AppNavBar, setItemActive, NavItemT } from 'baseui/app-nav-bar'
import { TriangleUp, TriangleLeft, TriangleRight, Overflow } from 'baseui/icon'
import { HeadingMedium } from 'baseui/typography'
import * as React from 'react'

import { Host } from './Host'

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
  const handleUserItemSelect = React.useCallback((item: any) => {
    console.log('user', item)
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
        <Centered>
          {!activeItem ? (
            <HeadingMedium>Select a game!</HeadingMedium>
          ) : activeItem.label === 'Localhost' ? (
            <Host
              prefix='http://localhost:1235'
              key='localhost'
              canvasResizePolicy={1}
            />
          ) : activeItem.label === 'Bloodfever' ? (
            <Host
              prefix='https://kronbergerspiele.github.io/bloodfever/'
              key='bloodfever'
            />
          ) : (
            <Host
              prefix='https://kronbergerspiele.github.io/kellergewoelbenlauf/'
              canvasResizePolicy={1}
              key='kg'
            />
          )}
        </Centered>
      </div>
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

const Centered = styled('div', ({ $theme }) => ({
  display: 'flex',
  flexGrow: 100,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: $theme.colors.backgroundPrimary,
}))

export default App
