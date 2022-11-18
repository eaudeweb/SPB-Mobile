import React from 'react'
import { StyleSheet, ScrollView, View, TouchableHighlight, Text } from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'

export default function WebinarListScreen({ navigation }) {
  const WebinarItem = () => {
    return (
      <TouchableHighlight style={styles.webinarContainer} onPress={() => navigation.navigate('WebinarDetail')}>
        <View style={{ paddingVertical: 20, paddingHorizontal: 10 }}>
          <View style={styles.row}>
            <Ionicon name='terminal-outline' size={26} color='#F26649' style={styles.icon} />
            <Text style={styles.text}>React Native Webinar</Text>
          </View>
          <View style={styles.row}>
            <Ionicon name='md-business' size={26} color='#F26649' style={styles.icon} />
            <Text style={styles.text}>Eau de Web</Text>
          </View>
          <View style={styles.row}>
            <Ionicon name='calendar-outline' size={26} color='#F26649' style={styles.icon} />
            <Text style={styles.text}>12/12/2022</Text>
          </View>
          <View style={styles.row}>
            <Ionicon name='time' size={26} color='#F26649' style={styles.icon} />
            <Text style={styles.text}>22:22</Text>
          </View>
          <View style={styles.row}>
            <Ionicon name='location' size={26} color='#F26649' style={styles.icon} />
            <Text style={styles.text}>strada Maior Gheorghe Sontu 8</Text>
          </View>
          <View style={[styles.row, { justifyContent: 'space-between', marginTop: 20 }]}>
            <View style={{ marginRight: 10 }}>
              <Text style={[styles.text, { fontSize: 16 }]}>Booked seats:</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicon name='md-people' size={26} color='#F26649' style={[styles.icon, { paddingRight: 0 }]} />
                <Text style={[styles.text, { fontSize: 16 }]}>150/200</Text>
              </View>
            </View>
            <TouchableHighlight style={styles.bookEventButton} onPress={() => alert('Joined event')}>
              <Text style={styles.text}>Book</Text>
            </TouchableHighlight>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
  return (
    <ScrollView style={styles.container}>
      <WebinarItem />
      <WebinarItem />
      <WebinarItem />
      <WebinarItem />
      <WebinarItem />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 10
  },
  webinarContainer: {
    backgroundColor: '#353535',
    borderRadius: 5,
    marginVertical: 10
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2
  },
  icon: {
    paddingRight: 10
  },
  text: {
    color: 'white',
    fontSize: 20
  },
  bookEventButton: {
    paddingHorizontal: 25,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: '#F26649'
  }
})
