import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default function CompaniesScreen({ navigation, text }) {
  return (
    <View style={styles.container}>
      <Text style={{ color: 'white', fontSize: 36 }}>Companies</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
    alignItems: 'center',
    justifyContent: 'center'
  }
})