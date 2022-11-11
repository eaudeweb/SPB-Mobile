import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'

export default function CompaniesScreen({ navigation, text }) {
  return (
    <View style={styles.container}>
      <View style={styles.jumbotron}>
        <TouchableOpacity style={styles.jumbotronCategory} onPress={() => navigation.navigate('INTERNSHIPS')}>
          <Text style={styles.jumbotronText}>35+</Text>
          <Text style={styles.jumbotronTextTitle}>INTERNSHIPS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.jumbotronCategory}>
          <Text style={styles.jumbotronText}>10+</Text>
          <Text style={styles.jumbotronTextTitle}>COMPANIES</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.jumbotronCategory} onPress={() => navigation.navigate('WEBINARS')}>
          <Text style={styles.jumbotronText}>35</Text>
          <Text style={styles.jumbotronTextTitle}>WEBINARS</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.header}>Main Partners</Text>
      <View>
        <View style={styles.imagesView}>
          <TouchableOpacity style={[styles.imageWrap, { backgroundColor: 'white', padding: 10 }]}>
            <Image source={require('../assets/bitdefender-logo.png')} style={{ width: 250, height: 'auto', aspectRatio: 80 / 11 }} />
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
        <View style={styles.imagesView}>
          <TouchableOpacity style={[styles.imageWrap, { backgroundColor: 'white', padding: 10 }]}>
            <Image source={require('../assets/bitdefender-logo.png')} style={{ width: 250, height: 'auto', aspectRatio: 80 / 11 }} />
          </TouchableOpacity>
        </View>
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
  header: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    letterSpacing: 1
  },
  imageWrap: {
    margin: 8
  },
  jumbotron: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 20
  },
  jumbotronCategory: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: '#616161',

  },
  jumbotronText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  jumbotronTextTitle: {
    color: '#F26649'
  }
})