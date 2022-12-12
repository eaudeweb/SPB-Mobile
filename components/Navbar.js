import React from 'react'
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native'
import { useNavigate } from 'react-router'
// import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

function Navbar() {
  const navigate = useNavigate()

  return (
    <View style={styles.navbarWrap}>
      <TouchableHighlight style={styles.navbarItemWrap} onPress={() => navigate('/companies')}>
        <View style={styles.navbarItem}>
          <MaterialIcon name="corporate-fare" size={26} color="white" />
          <Text style={styles.text}>COMPANIES  </Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight style={styles.navbarItemWrap} onPress={() => navigate('/internships')}>
        <View style={styles.navbarItem}>
          <IonIcon name="briefcase-outline" size={26} color="white" />
          <Text style={styles.text}>INTERNSHIPS</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight style={styles.navbarItemWrap} onPress={() => navigate('/webinars')}>
        <View style={styles.navbarItem}>
          <MaterialIcon name="laptop" size={26} color="white" />
          <Text style={styles.text}>WEBINARS</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight style={styles.navbarItemWrap} onPress={() => navigate('/profile')}>
        <View style={styles.navbarItem}>
          <IonIcon name="person-outline" size={26} color="white" />
          <Text style={styles.text}>PROFILE</Text>
        </View>
      </TouchableHighlight>

    </View >
  )
}

const styles = StyleSheet.create({
  navbarWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#121212'
  },
  navbarItemWrap: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    paddingTop: 10
  },
  navbarItem: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12
  }
})
export default Navbar