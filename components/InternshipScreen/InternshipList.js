import React from 'react'
import { StyleSheet, View, Text, Image, TouchableHighlight, ScrollView } from 'react-native'

export default function InternshipsAvailable({ navigation }) {
  const Internship1 = () => {
    return (
      <TouchableHighlight onPress={() => navigation.navigate('InternshipDetail', { test: 'Bine' })} style={styles.internshipWrapper}>
        <View style={styles.innerWrapper}>
          <Image source={require('../../assets/edw-logo.png')} style={styles.companyLogo} />
          <View>
            <Text style={styles.internshipTitle}>Frontend Internship</Text>
            <Text style={styles.internshipCompany}>Eau de Web</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
  const Internship2 = () => {
    return (
      <TouchableHighlight onPress={() => navigation.navigate('InternshipDetail', { test: 'Bine' })} style={styles.internshipWrapper}>
        <View style={styles.innerWrapper}>
          <Image source={require('../../assets/IBM_logo.png')} style={styles.companyLogo} />
          <View>
            <Text style={styles.internshipTitle}>Python Internship</Text>
            <Text style={styles.internshipCompany}>IBM</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  return (
    <ScrollView>
      <Internship1 />
      <Internship1 />
      <Internship2 />
      <Internship1 />
      <Internship1 />
      <Internship2 />
      <Internship1 />
      <Internship1 />
      <Internship2 />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  internshipWrapper: {
    margin: 10
  },
  innerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  companyLogo: {
    width: 75,
    height: 75,
    resizeMode: 'contain',
    marginRight: 20,
  },
  internshipTitle: {
    color: 'white',
    fontSize: 18
  },
  internshipCompany: {
    color: '#2991e3',
    fontSize: 16
  }
})