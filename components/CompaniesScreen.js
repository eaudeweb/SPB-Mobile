import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'

export default function CompaniesScreen({ navigation, text }) {
  return (
    <View style={styles.container}>
      {/* <Text style={{ color: 'white', fontSize: 36 }}>Companies</Text> */}
      <View style={styles.imagesView}>
        <TouchableOpacity style={[styles.imageWrap, { backgroundColor: 'white', padding: 10 }]}>
          <Image source={require('../assets/bitdefender-logo.png')} style={{ width: 300, height: 'auto', aspectRatio: 80 / 11 }} />
        </TouchableOpacity>
      </View>
      <View style={styles.imagesView}>
        <TouchableOpacity style={styles.imageWrap}>
          <Image source={require('../assets/IBM_logo.png')} style={{ width: 150, height: 'auto', aspectRatio: 5 / 2 }} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageWrap}>
          <Image source={require('../assets/edw-logo.png')} style={{ width: 100, height: 100 }} />
        </TouchableOpacity>
      </View>
      <View style={styles.imagesView}>
        <TouchableOpacity style={styles.imageWrap}>
          <Image source={require('../assets/edw-logo.png')} style={{ width: 100, height: 100 }} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageWrap}>
          <Image source={require('../assets/IBM_logo.png')} style={{ width: 150, height: 'auto', aspectRatio: 5 / 2 }} />
        </TouchableOpacity>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  imagesView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageWrap: {
    margin: 8
  }
})