import React from 'react'
import { StyleSheet, View, TouchableHighlight, Text } from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'

const EventListItem = ({ event, navigation }) => {
  const childrenScreen = event.type === 'event' ? 'EventDetail' : 'WebinarDetail'

  return (
    <TouchableHighlight
      style={styles.eventContainer}
      onPress={() => navigation.navigate(childrenScreen)}
    >
      <View style={{ paddingVertical: 20, paddingHorizontal: 10 }}>
        <View style={styles.row}>
          <Ionicon name='terminal-outline' size={26} color='#F26649' style={styles.icon} />
          <Text style={styles.text}>{event.name}</Text>
        </View>
        <View style={styles.row}>
          <Ionicon name='md-business' size={26} color='#F26649' style={styles.icon} />
          <Text style={styles.text}>{event.company}</Text>
        </View>
        <View style={styles.row}>
          <Ionicon name='calendar-outline' size={26} color='#F26649' style={styles.icon} />
          <Text style={styles.text}>{event.date}</Text>
        </View>
        <View style={styles.row}>
          <Ionicon name='time' size={26} color='#F26649' style={styles.icon} />
          <Text style={styles.text}>{event.time}</Text>
        </View>
        {event.type === 'event' ?
          <View style={styles.row}>
            <Ionicon name='location' size={26} color='#F26649' style={styles.icon} />
            <Text style={styles.text}>{event.address}</Text>
          </View>
          :
          ''
        }
        <View style={[styles.row, { justifyContent: 'space-between', marginTop: 20 }]}>
          <View style={{ marginRight: 10 }}>
            <Text style={[styles.text, { fontSize: 16 }]}>Booked seats:</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicon name='md-people' size={26} color='#F26649' style={[styles.icon, { paddingRight: 0 }]} />
              <Text style={[styles.text, { fontSize: 16 }]}>{event.availableSeats}</Text>
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

const styles = StyleSheet.create({
  eventContainer: {
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

export default EventListItem
