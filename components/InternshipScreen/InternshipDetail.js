import React from 'react'
import { StyleSheet, Image, View, Text } from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'


export default function InternshipDetail({ route, navigation }) {
  // access the params sent by route via route.params
  return (
    <View style={styles.container}>
      <Ionicon name="chevron-back" size={26} color="#F26649" onPress={() => navigation.goBack()} />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
        <Image source={require('../../assets/edw-logo.png')} style={styles.companyLogo} />
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.internshipTitle}>Frontend Internship</Text>
            <Ionicon name="send" size={26} color="#F26649" onPress={() => alert('Shared!')} />
          </View>
          <Text style={styles.internshipCompany}>Eau de Web</Text>
        </View>
      </View>
      <View>
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>Job description:</Text>
        <Text style={styles.jobDescription}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris porttitor, lorem porta dictum lobortis, libero ante placerat magna, sed sagittis sem nulla et massa. Morbi sit amet erat tempus, dignissim diam non, consequat diam. In quam urna, lobortis volutpat leo sit amet, convallis egestas odio. In maximus augue eu ante mattis molestie. Aliquam feugiat lacus vel bibendum placerat. Suspendisse ac dui in purus accumsan commodo. In convallis eros sed augue venenatis, quis viverra quam sollicitudin. Quisque et auctor felis, vel luctus nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id est vel quam rutrum sodales vitae id risus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
        </Text>
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    flex: 1
  },
  internshipWrapper: {

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
  },
  jobDescription: {
    color: 'white',
    lineHeight: 16,
    fontSize: 16
  }
})
