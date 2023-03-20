import { View } from 'react-native'
import React from 'react'
import { StyleSheet, StatusBar, SafeAreaView } from 'react-native'
import InternshipDetail from '../../../utils/InternshipDetail'

export default function ApplicationDetail(props) {

  return (
    <SafeAreaView style={styles.container}>
      <InternshipDetail {...props} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
    flex: 1
  }
})