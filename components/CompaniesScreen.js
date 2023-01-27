import React from 'react'
import { SafeAreaView, StyleSheet, View, Text, StatusBar, ScrollView, TouchableOpacity, Image, Platform } from 'react-native'
import SvgLogo from '../assets/SvgLogo'
import LoopText from 'react-native-loop-text'
import { colors, font, spacing } from "../styles/globalStyle"
import { Dimensions } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { resetFilters, getInternshipsByCompany } from '../features/internships/internshipsSlice';

export default function CompaniesScreen({ navigation }) {
  const { companies } = useSelector(state => state.companies)
  const dispatch = useDispatch()

  //TODO move to store
  const jumbotronTextArr = [
    <Text style={styles.infoTextDescription}><Text style={styles.infoTextNumber}>15+ </Text>COMPANIES</Text>,
    <Text style={styles.infoTextDescription}><Text style={styles.infoTextNumber}>35+ </Text>INTERNSHIPS</Text>,
    <Text style={styles.infoTextDescription}><Text style={styles.infoTextNumber}>20+ </Text>WEBINARS</Text>
  ]
  const handleClick = (companyName) => {
    // dispatch(getInternshipsByCompany(companyName))
    navigation.navigate('Internships')
  }
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <SvgLogo style={styles.logo} />
        <View style={styles.scrollViewWrapper}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={false}
            bounces={false}
          >
            <View>
              <View style={styles.jumbotron}>
                {/* TODO no magic numbers */}
                <LoopText textArray={jumbotronTextArr} duration={1500} delay={200} />
              </View>
              <View style={styles.companiesWrapper}>
                {companies.map((company, index) => (
                  //TODO go to internships filtered by company
                  <TouchableOpacity
                    style={company.mainPartner ? styles.partnerCompanyWrapper : styles.companyWrapper}
                    key={index}
                    onPress={() => handleClick(company.name)}
                  >
                    {company.notifications ?
                      <View style={styles.companyNotificationWrapper}>
                        <Text style={styles.companyNotificationText}>{company.notifications}</Text>
                      </View>
                      :
                      ''
                    }
                    <Image source={{ uri: company.logo }} style={styles.companyLogo} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      </View >
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  logo: {
    marginTop: Platform.OS === "ios" ? 30 : StatusBar.currentHeight + 30,
    height: 20,
  },
  jumbotron: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15
  },
  infoTextDescription: {
    color: colors.main.accent,
    fontSize: font.size.xl,
    fontWeight: font.fontWeight.bold
  },
  infoTextNumber: {
    color: colors.secondary.cream,
    fontSize: font.size.xl,
    fontWeight: font.fontWeight.bold
  },
  scrollViewWrapper: {
    width: '100%',
    height: Dimensions.get('window').height * 0.82,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    overflow: 'hidden',
  },
  companiesWrapper: {
    backgroundColor: colors.main.white,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: spacing.s,
    paddingBottom: Platform.OS === "ios" ? 90 : 60,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  partnerCompanyWrapper: {
    width: '100%',
    padding: 10,
  },
  companyWrapper: {
    width: '50%',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: colors.secondary.cream
  },
  companyLogo: {
    width: '100%',
    height: 'auto',
    aspectRatio: 2 / 1,
  },
  companyNotificationWrapper: {
    alignSelf: 'flex-end',
    backgroundColor: colors.secondary.cream,
    padding: 2,
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    zIndex: 10,
    position: 'absolute',
    margin: 10
  },
  companyNotificationText: {
    color: colors.secondary.mediumGrey,
    fontSize: font.size.xs,
    fontWeight: font.fontWeight.xbold
  },
  horizontalLine: {
    borderTopWidth: 1,
    borderTopColor: colors.secondary.cream,
    width: '100%'
  }
})
