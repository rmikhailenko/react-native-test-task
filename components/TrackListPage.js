import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import { Actions } from 'react-native-router-flux'


export default class TrackListPage extends React.Component {
  state = {
    items: [
       {
          id: 0,
          artist: 'Comfort Fit', 
          title: 'Sorry',
          image: 'assets/favicon.png'
       },
       {
          id: 1,
          artist: 'Comfort Fit', 
          title: 'Sorry',
          image: 'assets/favicon.png'
       },
       {
          id: 2,
          artist: 'Comfort Fit', 
          title: 'Sorry',
          image: 'assets/favicon.png'
       },
       {
          id: 3,
          artist: 'Comfort Fit', 
          title: 'Sorry',
          image: 'assets/favicon.png'
       }
    ]
 }

 render() {
    return (
       <View>
          {
             this.state.items.map((item, index) => (
                <TouchableOpacity 
                   key = {item.id}
                   style = {styles.container}
                   onPress = {() => Actions.playerPage()}>
                   <Text style = {styles.text}>
                      {item.title}
                   </Text>
                      <Text style={styles.artist}>
                        {item.artist}
                      </Text>
                </TouchableOpacity>
             ))
          }
       </View>
    )
 }
}

const styles = StyleSheet.create ({
  container: {
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1
  },
  text: {
    paddingLeft: 20,
    fontSize: 20,
    fontFamily: 'Roboto',
    color: '#000000'
  },
  artist: {
    paddingLeft: 20,
    fontFamily: 'Roboto',
    fontSize: 15,
    color: '#676767'
  }
})