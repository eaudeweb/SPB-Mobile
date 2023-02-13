import React from 'react'
import { useState } from 'react'
import { StyleSheet, SafeAreaView, View, Text, Image, ScrollView, TouchableHighlight, StatusBar, ActivityIndicator } from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'
import NotificationsModal from '../../utils/NotificationsModal'
import { colors, font } from '../../styles/globalStyle'
import FaIcon from 'react-native-vector-icons/FontAwesome5'
import { bookEventSeat, unbookEventSeat } from '../../features/events/eventsSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function EventDetail({ props }) {
  const dispatch = useDispatch()
  const [modalVisible, setModalVisible] = useState(false)
  const { navigation, route } = props
  const { booking } = useSelector(state => state.events)
  const event = route.params
  const url = 'https://staging.stagiipebune.ro'
  const handleSeatBooking = () => {
    dispatch(bookEventSeat(event.id))
  }
  const handleSeatUnbooking = () => {
    dispatch(unbookEventSeat(event.id))
  }
  return (
    <SafeAreaView style={styles.container}>
      <View marginBottom={10}>
        <TouchableHighlight style={styles.backButtonWrapper} onPress={() => navigation.goBack()}>
          <Ionicon name="chevron-back" size={26} style={styles.backButton} />
        </TouchableHighlight>
      </View>
      <ScrollView  >
        <Image source={{ uri: url + event.image }} style={styles.headerImage} />
        <Text style={styles.eventTitle}>{event.title}</Text>
        <View>
          <Text style={styles.eventDescription}>{event.description}</Text>
        </View>
        <View flexDirection={'row'} marginTop={10}>
          <Text style={styles.text}> Panelists: {event.panelists}</Text>
        </View>

        <NotificationsModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
      </ScrollView >
      <View style={styles.bottomButtonsWrapper}>
        {/* <View width={'60%'}>
          {internship.can_apply !== 'already_applied' ?
            <TouchableHighlight style={styles.bottomButton} onPress={handleApplyPress}>
              <View>
                {application.isLoading ?
                  <ActivityIndicator size="small" color={colors.main.cappuccino} />
                  :
                  <Text style={styles.bottomButtonText}>Apply</Text>
                }
              </View>
            </TouchableHighlight>
            :
            <TouchableHighlight style={styles.bottomButton} onPress={handleWithdrawPress}>
              <View>
                {application.isLoading ?
                  <ActivityIndicator size="small" color={colors.main.accent} />
                  :
                  <Text style={[styles.bottomButtonText, { color: colors.main.cappuccino }]}>Withdraw</Text>
                }
              </View>
            </TouchableHighlight>
          }
        </View> */}
        <View width={'50%'}>
          <TouchableHighlight style={styles.bottomButton} onPress={() => handleSeatBooking()}>
            {booking.isLoading ?
              <ActivityIndicator size="small" color={colors.main.accent} />
              :
              <Text style={styles.bottomButtonText}>Book Seat</Text>

            }
          </TouchableHighlight>
        </View>
        <View width={'25%'}>
          <TouchableHighlight style={styles.bottomButton} onPress={() => alert("Ding")}>
            <View style={{ alignItems: 'center' }}>
              <FaIcon name={'bell'} size={20} color={colors.secondary.lightGrey} />
            </View>
          </TouchableHighlight>
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
  }
})
