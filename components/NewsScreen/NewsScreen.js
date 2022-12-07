import React from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'


export default function NewsMain({ navigation }) {
  const newsList = [
    {
      originScreen: 'EVENTS',
      title: 'Pizza is coming',
      description: 'Come and get it'
    },
    {
      originScreen: 'INTERNSHIPS',
      title: '3 new React internships',
      description: 'Apply right now'
    },
    {
      originScreen: 'PROFILE',
      title: 'Add your CV',
      description: "Companies that you have applied to would not be able to see your information."
    },
    {
      originScreen: 'EVENTS',
      title: 'Pizza is coming',
      description: 'Come and get it'
    },
    {
      originScreen: 'INTERNSHIPS',
      title: '3 new React internships',
      description: 'Apply right now'
    },
    {
      originScreen: 'PROFILE',
      title: 'Add your CV',
      description: "Companies that you have applied to would not be able to see your information."
    },
    {
      originScreen: 'EVENTS',
      title: 'Pizza is coming',
      description: 'Come and get it'
    },
    {
      originScreen: 'INTERNSHIPS',
      title: '3 new React internships',
      description: 'Apply right now'
    },
    {
      originScreen: 'PROFILE',
      title: 'Add your CV',
      description: "Companies that you have applied to would not be able to see your information."
    },
  ]

  const generateListItem = (item, index) => {
    let iconName;
    switch (item.originScreen) {
      case 'COMPANIES':
        iconName = 'md-business-outline'
        break;
      case 'INTERNSHIPS':
        iconName = 'briefcase-outline'
        break;
      case 'EVENTS':
        iconName = 'desktop-outline'
        break;
      case 'PROFILE':
        iconName = 'ios-person-outline'
        break;
    }

    return (
      <TouchableOpacity
        key={index}
        onPress={() => navigation.navigate(item.originScreen)}
      >
        <View style={styles.newsItemWrap}>
          <View flexDirection={'row'} alignItems={'center'} marginBottom={10}>
            <Ionicon name={iconName} size={26} color={'white'} />
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
    <ScrollView style={styles.container}>
      <Text style={styles.header}>News</Text>
      <View>
        {newsList.map((listItem, index) => generateListItem(listItem, index))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginBottom: 20
  },
  header: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold'
  },
  newsItemWrap: {
    backgroundColor: '#353535',
    borderRadius: 5,
    marginVertical: 10,
    padding: 10
  },
  newsItemTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5
  },
  newsItemText: {
    color: 'white',
    fontSize: 16,
  }
})
