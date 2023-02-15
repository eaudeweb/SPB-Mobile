import React from 'react'
import { StyleSheet, View, TouchableHighlight, Text, ActivityIndicator } from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { colors, font } from '../styles/globalStyle'
import FaIcon from 'react-native-vector-icons/FontAwesome5'
import { Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { eventsActions } from '../features/events/eventsSlice'
import { bookEventSeat, unbookEventSeat } from '../features/events/eventsSlice'

const EventListItem = ({ event, props }) => {
  const childrenScreen = event.type === 'event' ? 'EventDetail' : 'WebinarDetail'
  const { updateLocalEvents } = eventsActions
  const { booking } = useSelector(state => state.events)
  const { navigation } = props
  const dispatch = useDispatch()

  const handleSeatBooking = () => {
    dispatch(bookEventSeat(event.id))
    dispatch(updateLocalEvents({ id: event.id, newQueue: 'reserved' }))
  }
  const handleSeatUnbooking = () => {
    dispatch(unbookEventSeat(event.id))
    dispatch(updateLocalEvents({ id: event.id, newQueue: 'upcoming' }))
  }

  return (
    <TouchableHighlight
      style={styles.eventContainer}
      onPress={() => navigation.navigate('EventDetail', event)}
    >
      <View style={styles.innerContainer}>
        <View>
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.companyName}>{event.company.name}</Text>
          <View style={styles.horizontalContainer}>
            <View>
              <View style={styles.timeInformationContainer}>
                <FaIcon name={'calendar-alt'} size={font.size.s} style={styles.timeInformationIcon} />
                <Text style={styles.timeInformationText}>{event.starts_at}</Text>
              </View>
              <View style={styles.seatingContainer}>
                <FaIcon name={'users'} size={font.size.s} style={styles.seatingIcon} />
                <Text style={styles.seatingText}>{event.remaining}</Text>
              </View>
            </View>
            <View>
              {
                event.reg_state == "accepted" ?
                  <TouchableHighlight style={styles.bookEventButton} onPress={() => handleSeatUnbooking()}>
                    <Text style={[styles.buttonText, { color: colors.main.cappuccino }]}>Withdraw</Text>
                  </TouchableHighlight>
                  :
                  <TouchableHighlight style={styles.bookEventButton} onPress={() => handleSeatBooking()}>
                    <Text style={styles.buttonText}>Book Seat</Text>
                  </TouchableHighlight>
              }
            </View>
          </View>

        </View>

      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  eventContainer: {
    backgroundColor: colors.secondary.darkGrey,
    borderRadius: 10,
    marginVertical: 10
  },
  innerContainer: {
    padding: 10,
    flexDirection: 'row'
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: Dimensions.get('window').width - 40 // 10 x 2 horizontal padding + 10 x2 parent margin
  },
  title: {
    color: colors.main.white,
    fontSize: font.size.l,
    fontWeight: font.fontWeight.bold
  },
  companyName: {
    color: colors.main.accent,
    fontSize: font.size.m,
    fontWeight: font.fontWeight.xbold
  },
  timeInformationIcon: {
    size: font.size.m,
    color: colors.secondary.lightGrey,
    marginRight: 5
  },
  timeInformationContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeInformationText: {
    color: colors.secondary.lightGrey,
    fontSize: font.size.s,
    marginRight: 5
  },
  seatingContainer: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  seatingIcon: {
    color: colors.indicators.green,
    marginRight: 5
  },
  seatingText: {
    color: colors.indicators.green,
    fontSize: font.size.s,
  },
  bookEventButton: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 10,
    backgroundColor: colors.buttonBackground.orange
  },
  buttonText: {
    fontSize: font.size.m,
    color: colors.secondary.cream,
    fontWeight: font.fontWeight.bold
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

})

export default EventListItem
