import React, { useEffect, useState } from 'react'
import { StyleSheet, SafeAreaView, View, Text, Image, ScrollView, TouchableHighlight, StatusBar, ActivityIndicator } from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'
import NotificationsModal from '../../utils/NotificationsModal'
import { colors, font } from '../../styles/globalStyle'
import FaIcon from 'react-native-vector-icons/FontAwesome5'
import { bookEventSeat, eventsActions, unbookEventSeat } from '../../features/events/eventsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getEvents } from '../../features/events/eventsSlice'

export default function EventDetail({ props }) {
  const { updateLocalEvents } = eventsActions
  const dispatch = useDispatch()
  const [modalVisible, setModalVisible] = useState(false)
  const { navigation, route } = props
  const { events } = useSelector(state => state.events)
  const { isBookingSuccesful, isCancelSuccesful } = useSelector(state => state.events.booking)
  const { booking, isLoading } = useSelector(state => state.events)
  const [event, setEvent] = useState(route.params)
  const url = 'https://stagiipebune.ro'
  // dispatch(unbookEventSeat(event.id))
  // dispatch(updateLocalEvents({ id: event.id, new_reg_state: event.reg_state === 'pending' ? 'cancelledPending' : 'cancelled' }))

  useEffect(() => {
    const allEvents = [...events.upcoming, ...events.reserved, ...events.recordings]
    const event = allEvents.find(event => event.id === route.params.id)
    setEvent(event)
  }, [events])
  //TODO Upon loading event get event id from route.params and match it with the evens stored in redux
  const handleSeatBooking = () => {
    let newRegState = event.accepted === event.participant_limit ? 'pending' : 'accepted'
    setEvent({ ...event, reg_state: newRegState })
    dispatch(bookEventSeat(event.id))
    dispatch(getEvents())
    // dispatch(updateLocalEvents({ id: event.id, new_reg_state: newRegState }))
  }
  const handleSeatUnbooking = () => {
    setEvent({ ...event, reg_state: 'cancelled' })
    dispatch(unbookEventSeat(event.id))
    dispatch(getEvents())

  }

  const getParticipantsIconColor = () => {
    if (event.accepted === event.participant_limit) {
      return {
        color: colors.indicators.orange
      }
    } else {
      return {
        color: colors.indicators.green
      }
    }
  }
  const ActionButton = () => {
    if (event.reg_state === 'accepted') {
      return (
        <TouchableHighlight style={styles.bottomButton} onPress={() => handleSeatUnbooking()}>
          <Text style={[styles.bottomButtonText, { color: colors.main.cappuccino }]}>Withdraw</Text>
        </TouchableHighlight>
      )
    } else if (event.reg_state === 'pending') {
      return (
        <TouchableHighlight style={[styles.bottomButton, { backgroundColor: colors.secondary.mediumGrey }]} onPress={() => handleSeatUnbooking()}>
          <Text style={[styles.bottomButtonText, { color: colors.indicators.orange }]}>Withdraw</Text>
        </TouchableHighlight>
      )
    } else {
      return (
        <TouchableHighlight style={styles.bottomButton} onPress={() => handleSeatBooking()}>
          <Text style={styles.bottomButtonText}>Book Seat</Text>
        </TouchableHighlight>
      )
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View marginBottom={10}>
        <TouchableHighlight style={styles.backButtonWrapper} onPress={() => navigation.goBack()} disabled={isLoading}>
          <Ionicon name="chevron-back" size={26} style={styles.backButton} />
        </TouchableHighlight>
      </View>
      <ScrollView  >
        <Image source={{ uri: url + event.image }} style={styles.headerImage} />
        <Text style={styles.eventTitle}>{event.title}</Text>
        <View style={styles.iconWrapper}>
          <FaIcon name={'calendar-alt'} style={styles.icon} />
          <Text style={{ color: colors.secondary.lightGrey }}>{event.starts_at}</Text>
        </View>
        <View style={styles.iconWrapper}>
          <FaIcon name={'map-marker'} style={[styles.icon, { color: colors.secondary.lightGrey }]} />
          <Text style={{ color: colors.secondary.lightGrey }}>{event.location}</Text>
        </View>
        {event.panelists ?
          <View style={styles.iconWrapper}>
            <FaIcon name={'bullhorn'} style={[styles.icon, { color: colors.secondary.lightGrey }]} />
            <Text style={{ color: colors.main.accent, fontSize: font.size.m }}>{event.panelists}</Text>
          </View>
          :
          ''
        }


        <View>
          <Text style={styles.eventDescription}>{event.description}</Text>
        </View>
        <NotificationsModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
      </ScrollView >
      <View style={styles.bottomButtonsWrapper}>
        <View width={'50%'}>
          {booking.isLoading ?
            <TouchableHighlight style={styles.bottomButton} >
              <ActivityIndicator size="small" color={colors.main.accent} />
            </TouchableHighlight>
            :
            <ActionButton />
          }
        </View>
        <View width={'25%'}>
          <View style={styles.iconWrapper}>
            <FaIcon name={'users'} style={styles.icon} />
            <Text style={getParticipantsIconColor()}>{event.accepted}</Text>
            <Text style={getParticipantsIconColor()}> / {event.participant_limit}</Text>
          </View>
        </View>
      </View >
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
    marginHorizontal: 10,
    flex: 1,
  },
  headerImage: {
    marginTop: 10,
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    borderRadius: 10,
    marginBottom: 20
  },
  eventTitle: {
    color: colors.main.white,
    fontSize: font.size.xl,
    fontWeight: 'bold',
  },
  eventDescription: {
    color: colors.main.white,
    fontSize: font.size.m,
  },
  text: {
    color: colors.main.white,
    fontSize: font.size.m
  },
  bookEventButton: {
    paddingHorizontal: 25,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: '#F26649'
  },
  map: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 10
  },
  backButtonWrapper: {
    backgroundColor: colors.secondary.mediumGrey,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  backButton: {
    color: colors.main.accent,
    padding: 5,
  },
  bottomButtonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  bottomButton: {
    backgroundColor: colors.secondary.mediumGrey,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    marginVertical: 5,
  },
  bottomButtonText: {
    color: colors.main.accent,
    fontSize: font.size.m,
    fontWeight: font.fontWeight.bold,
    textAlign: 'center',
  },
  iconWrapper: {
    flexDirection: 'row',
    marginVertical: 2
  },
  icon: {
    marginRight: 10,
    fontSize: font.size.m,
    color: colors.secondary.lightGrey
  }
})
