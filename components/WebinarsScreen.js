import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default function WebinarsScreen() {
  return (
    <View style={styles.container}>
      <Text style={{ color: 'white', fontSize: 36 }}>Webinars</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})