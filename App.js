import React from 'react'
import { StyleSheet } from 'react-native'
import { Router, Scene, Stack } from 'react-native-router-flux'
import TrackListPage from './components/TrackListPage'
import PlayerPage from './components/PlayerPage'

export default class App extends React.Component {
  render () {
    return (
      <Router>
        <Stack key='root'>
          <Scene key='tabbar' tabs >

            <Scene title='1'>
              <Scene key='trackListPage' component={TrackListPage} title='Track List' initial />
              <Scene key='playerPage' component={PlayerPage} title='Player' />
            </Scene>

            <Scene title='2'>
              <Scene key='trackListPage' component={TrackListPage} title='Track List' initial />
              <Scene key='playerPage' component={PlayerPage} title='Player' />
            </Scene>

            <Scene title='3'>
              <Scene key='trackListPage' component={TrackListPage} title='Track List' initial />
              <Scene key='playerPage' component={PlayerPage} title='Player' />
            </Scene>

          </Scene>
        </Stack>
      </Router>
    )
  }
}
