import React from 'react'
import { StyleSheet, SafeAreaView, Text, View, ScrollView, TouchableOpacity, StatusBar } from 'react-native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import FaIcon from 'react-native-vector-icons/FontAwesome5'
import { colors, font } from '../../styles/globalStyle'

export default function NewsMain({ navigation }) {
  const styles = getStyles(useBottomTabBarHeight())

  const newsList = [
    {
      originScreen: 'Companies',
      title: 'Pizza is coming',
      description: 'Come and get it'
    },
    {
      originScreen: 'Internships',
      title: '3 new React internships',
      description: 'Apply right now'
    },
    {
      originScreen: 'Profile',
      title: 'Add your CV',
      description: "Companies that you have applied to would not be able to see your information."
    },
    {
      originScreen: 'Calendar',
      title: 'Pizza is coming',
      description: 'Come and get it'
    },
    {
      originScreen: 'Internships',
      title: '3 new React internships',
      description: 'Apply right now'
    },
    {
      originScreen: 'Profile',
      title: 'Add your CV',
      description: "Companies that you have applied to would not be able to see your information."
    },
    {
      originScreen: 'Calendar',
      title: 'Pizza is coming',
      description: 'Come and get it'
    },
    {
      originScreen: 'Internships',
      title: '3 new React internships',
      description: 'Apply right now'
    },
    {
      originScreen: 'Profile',
      title: 'Add your CV',
      description: "Companies that you have applied to would not be able to see your information."
    },
  ]

  const generateListItem = (item, index) => {
    let iconName;
    switch (item.originScreen) {
      case 'Companies':
        iconName = 'building'
        break;
      case 'Internships':
        iconName = 'briefcase'
        break;
      case 'Calendar':
        iconName = 'desktop'
        break;
      case 'Profile':
        iconName = 'user'
        break;
    }

    return (
      <TouchableOpacity
        key={index}
        onPress={() => navigation.navigate(item.originScreen)}
      >
        <View style={styles.newsItemWrap}>
          <View flexDirection={'row'} alignItems={'center'} marginBottom={10}>
            <FaIcon name={iconName} size={18} color={colors.main.accent} />
            <Text style={styles.newsItemTitle}>{item.title}</Text>
          </View>
          <View>
            <Text style={styles.newsItemText}>{item.description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>News</Text>
        <View style={styles.innerContainer}>
          {newsList.map((listItem, index) => generateListItem(listItem, index))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const getStyles = (bottomTabHeight) => StyleSheet.create({
  container: {
    marginTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
    marginHorizontal: 10
  },
  innerContainer: {
    paddingBottom: Platform.OS === 'ios' ? bottomTabHeight : bottomTabHeight + 10,
  },
  header: {
    color: colors.main.white,
    fontSize: font.size.xl,
    fontWeight: 'bold'
  },
  newsItemWrap: {
    backgroundColor: colors.secondary.darkGrey,
    borderRadius: 5,
    marginVertical: 10,
    padding: 10
  },
  newsItemTitle: {
    color: colors.main.white,
    fontSize: font.size.l,
    fontWeight: 'bold',
    marginLeft: 10
  },
  newsItemText: {
    color: colors.main.white,
    fontSize: font.size.m

  }
})
