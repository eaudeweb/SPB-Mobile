import React, { useState } from 'react'
import { StyleSheet, StatusBar, Image, View, Text, TouchableHighlight, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { internshipsActions } from '../features/internships/internshipsSlice'
import { useDispatch } from 'react-redux'
import { colors, font } from '../styles/globalStyle'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import reactStringReplace from 'react-string-replace';


export default function InternshipDetail({ route, navigation }) {
  const { internship } = route.params
  const { applyToInternship } = internshipsActions
  const dispatch = useDispatch()
  const styles = getStyles(useBottomTabBarHeight())

  const [currentView, setCurrentView] = useState('description')
  console.log(internship)
  const handleBarTouch = (view) => view === 'description' ? setCurrentView('description') : setCurrentView('about')

  const formatText = (text) => {
    const regex = /\*{2}(.*?)\*{2}/g
    const replacementFunction = (match, index) => <Text style={{ fontWeight: font.fontWeight.xbold }} key={index}>{match}</Text>;

    return reactStringReplace(text, regex, replacementFunction);
  }
  formatText(internship.description)
  return (
    <ScrollView>
      <View style={styles.container}>

        <View style={styles.backButtonWrapper}>
          <Ionicon name="chevron-back" size={26} style={styles.backButton} onPress={() => navigation.goBack()} />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
          <View style={styles.companyLogoWrapper}>
            <Image source={{ uri: internship.company.logo }} style={styles.companyLogo} />
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.internshipTitle}>{internship.title}</Text>
              <Ionicon name="send" size={26} color="#F26649" onPress={() => alert('Shared!')} />
            </View>
            <Text style={styles.internshipCompany}>{internship.company.name}</Text>
          </View>
        </View>
        {/* <TouchableHighlight
          style={{ backgroundColor: 'red', padding: 10, marginTop: 50 }}
          onPress={() => dispatch(applyToInternship(internship))}
        >
          <Text>Apply to job</Text>
        </TouchableHighlight> */}
        {internship.applied ?
          <View>
            <Text style={{ color: 'white', marginBottom: 10 }}>Applied two 2 weeks ago</Text>
          </View>
          :
          ''
        }
        <View>
          <View flexDirection={'row'} marginBottom={10}>
            <TouchableOpacity onPress={() => handleBarTouch('description')}>
              <View style={currentView === 'description' ? styles.activeTab : styles.tab}>
                <Text style={currentView === 'description' ? styles.activeTabText : styles.tabText}>Description</Text>
              </View>
            </TouchableOpacity >
            <TouchableOpacity onPress={() => handleBarTouch('about')}>
              <View style={currentView === 'about' ? styles.activeTab : styles.tab}>
                <Text style={currentView === 'about' ? styles.activeTabText : styles.tabText}>About company</Text>
              </View>
            </TouchableOpacity >
          </View>
          {
            currentView === 'description' ?
              <Text style={styles.jobDescription}>
                {formatText(internship.description)}
              </Text>
              :
              <Text style={styles.jobDescription}>
                {formatText(internship.company.description)}
              </Text>}
        </View>
      </View >
    </ScrollView>
  )
}
const getStyles = (bottomTabHeight) => StyleSheet.create({
  container: {
    marginHorizontal: 10,
    paddingBottom: Platform.OS === 'ios' ? bottomTabHeight + 40 : bottomTabHeight + 20
  },
  innerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  companyLogo: {
    width: 100,
    height: 75,
    resizeMode: 'contain',
  },
  companyLogoWrapper: {
    backgroundColor: colors.main.white,
    width: 110,
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 20
  },
  backButtonWrapper: {
    backgroundColor: colors.secondary.mediumGrey,
    borderRadius: 5,
    padding: 5,
    alignSelf: 'flex-start',
  },
  backButton: {
    color: colors.main.accent
  },
  internshipTitle: {
    color: 'white',
    fontSize: font.size.l
  },
  internshipCompany: {
    color: '#2991e3',
    fontSize: 16
  },
  jobDescription: {
    color: 'white',
    lineHeight: font.size.m + 1,
    fontSize: font.size.m
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
