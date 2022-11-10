import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={{ color: 'white', fontSize: 36 }}>Profile</Text>
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