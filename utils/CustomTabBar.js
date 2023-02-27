import React, { useEffect } from 'react'
import { useState } from 'react'
import { SafeAreaView, TouchableOpacity, StyleSheet, Text, StatusBar, Animated, View } from 'react-native'
import { colors, font } from '../styles/globalStyle'

const CustomTabBar = ({ screens, navigation, display }) => {
  const [selectedTab, setSeletedTab] = useState('')
  const styles = getStyles(display)
  const currentTabIndex = navigation.getState().index

  useEffect(() => {
    setSeletedTab(screens[0])
  }, [])

  useEffect(() => {
    //when swiping through the screen the selectedTab is not updated, 
    //therefore we get the current screen index and update the selected tab
    const currentIndex = navigation.getState().index

    setSeletedTab(screens[currentIndex])
  }, [currentTabIndex])

  const handlePress = (option) => {
    setSeletedTab(option)
    navigation.navigate(option.screen)
  }
  const TabItem = ({ option }) => (
    <TouchableOpacity onPress={() => handlePress(option)}>
      <View style={option.name === selectedTab.name ? styles.activeTab : styles.tab}>
        <Text style={option.name === selectedTab.name ? styles.activeTabText : styles.tabText}>{option.name}</Text>
      </View>
    </TouchableOpacity >
  )
  return (
    <SafeAreaView style={styles.container}>
      {screens?.map((option, index) => <TabItem option={option} key={index} />)}
    </SafeAreaView>
  )
}
const getStyles = (displayTabBar) => StyleSheet.create({
  container: {
    marginTop: Platform.OS === "ios" ? 50 : StatusBar.currentHeight + 20,
    marginHorizontal: 10,
    marginBottom: 10,
    flexDirection: 'row',
    display: displayTabBar ? 'flex' : 'none'
  },

  tab: {
    backgroundColor: colors.secondary.mediumGrey,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    marginVertical: 5
  },
  tabText: {
    color: colors.secondary.lightGrey,
    fontSize: font.size.m,
    fontWeight: font.fontWeight.bold
  },
  activeTab: {
    backgroundColor: colors.buttonBackground.orange,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    marginVertical: 5
  },
  activeTabText: {
    color: colors.main.cappuccino,
    fontSize: font.size.m,
    fontWeight: font.fontWeight.bold
  }
})

export default CustomTabBar
