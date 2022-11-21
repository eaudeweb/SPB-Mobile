import React from 'react'
import { useState } from 'react'
import { StyleSheet, View, Text, Image, ScrollView, TouchableHighlight, Dimensions } from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import onShare from '../../utils/shareFunction'
import NotificationsModal from '../../utils/NotificationsModal'

export default function EventDetail({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <ScrollView style={styles.container}>
      <Ionicon name='chevron-back' size={26} color='#F26649' onPress={() => navigation.navigate('EventsList')} />
      <Image source={require('../../../assets/conference-placeholder.jpg')} style={styles.headerImage} />
      <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'space-between', marginVertical: 10 }}>
        <Text style={styles.eventTitle}>React Native Event</Text>
        <Ionicon name='ios-notifications-outline' size={26} color='#F26649' onPress={() => setModalVisible(true)} />
      </View >
      <View>
        <Text style={styles.eventDescription}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut sapien condimentum, dapibus nisl vel, feugiat leo. Cras dictum hendrerit purus vel consectetur. Suspendisse finibus dictum ligula nec porta. Curabitur fermentum lectus lorem, sit amet finibus ligula sollicitudin non. Nam dignissim et metus sed luctus. Vivamus tincidunt turpis sit amet eros varius, eget luctus augue varius. Duis quis massa est. Quisque consequat ultricies posuere.
        </Text>
      </View>
      <View flexDirection='row' justifyContent="space-between" alignItems='center' marginVertical={20}>
        <View>
          <TouchableHighlight style={styles.bookEventButton} onPress={() => alert('Joined event')}>
            <Text style={styles.text}>Book</Text>
          </TouchableHighlight>
        </View>
        <View>
          <Ionicon name="send" size={26} color="#F26649" onPress={() => onShare('Event')} />
        </View>
      </View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 44.466060,
          longitude: 26.082300,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{ latitude: 44.466060, longitude: 26.082300 }}
          title={"Eau de Web"}
        />

      </MapView>
      <NotificationsModal modalVisible={modalVisible} setModalVisible={setModalVisible} />

    </ScrollView >
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 10
  },
  headerImage: {
    marginTop: 10,
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    borderRadius: 10
  },
  eventTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  eventDescription: {
    color: 'white',
    fontSize: 16,
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
  },
  map: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 10
  }
})
