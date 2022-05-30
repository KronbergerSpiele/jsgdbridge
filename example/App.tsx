import { styled, useStyletron } from 'baseui'
import { AppNavBar, setItemActive, NavItemT } from 'baseui/app-nav-bar'
import { TriangleLeft, TriangleRight, Overflow, Upload } from 'baseui/icon'
import { HeadingMedium } from 'baseui/typography'
import * as React from 'react'

import { Host } from './Host'

export const App: React.FC = function App() {
  const [css] = useStyletron()
  const [activeItem, setActiveItem] = React.useState<NavItemT | null>(null)
  const [mainItems, setMainItems] = React.useState<NavItemT[]>([
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
        })}
      >
        <div
          className={css({
            boxSizing: 'border-box',
            width: '100%',
          })}
        >
          <AppNavBar
            title="Johnny's Playground"
            mainItems={mainItems}
            userItems={userItems}
            onMainItemSelect={handleMainItemSelect}
            onUserItemSelect={handleUserItemSelect}
            username='Johnny Goslar'
            userImgUrl=''
          />
        </div>
        <Centered>
          {!activeItem ? (
            <HeadingMedium>Select a game!</HeadingMedium>
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

const Centered = styled('div', ({ $theme }) => ({
  display: 'flex',
  flexGrow: 100,
  justifyContent: 'center',
  alignItems: 'center',
  borderTopColor: $theme.colors.backgroundSecondary,
  borderTopWidth: '2px',
  borderTopStyle: 'solid',
  backgroundColor: $theme.colors.backgroundPrimary,
}))

export default App
