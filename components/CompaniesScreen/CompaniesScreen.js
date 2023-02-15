import React from 'react'
import { SafeAreaView, StyleSheet, View, Text, StatusBar, ScrollView, TouchableOpacity, Image, Platform } from 'react-native'
import SvgLogo from '../../assets/SvgLogo'
import LoopText from 'react-native-loop-text'
import { colors, font, spacing } from "../../styles/globalStyle"
import { Dimensions } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import Loading from './Loading'
import { getInternshipsBySearch } from '../../features/internships/internshipsSlice'
import { filtersActions } from '../../features/filters/filtersSlice'

export default function CompaniesScreen({ navigation }) {
  const { companies, isLoading } = useSelector(state => state.companies)
  const { events } = useSelector(state => state.events)
  const { internships } = useSelector(state => state.internships)
  const dispatch = useDispatch()
  const wrapperLoadingHeight = () => {
    if (companies?.length == 0) {
      return {
        minHeight: Dimensions.get('window').height * 0.82 - 100,
      }
    }
  }

  const roundToLowest5 = (number) => {
    const roundedNumber = Math.round(number / 5) * 5
    if (roundedNumber <= 5) {
      return parseInt(number)
    } else if (roundedNumber > number) {
      return `${Math.round((number - 5) / 5) * 5}+`
    } else {
      return `${roundedNumber}+`
    }
  }
  const internshipsNumber = roundToLowest5(internships?.length)
  const companiesNumber = roundToLowest5(companies.mainPartners?.length + companies.partners?.length)
  const eventsNumber = events.upcoming?.length > 0 ? roundToLowest5(events.upcoming?.length + events.reserved?.length) : 0

  //TODO move to store
  const jumbotronTextArr = [
    <Text style={styles.infoTextDescription}><Text style={styles.infoTextNumber}>{companiesNumber} </Text>COMPANIES</Text>,
    <Text style={styles.infoTextDescription}><Text style={styles.infoTextNumber}>{internshipsNumber} </Text>INTERNSHIPS</Text>,
    <Text style={styles.infoTextDescription}><Text style={styles.infoTextNumber}>{eventsNumber} </Text>EVENTS</Text>
  ]
  const handlePress = (company) => {
    const newFilters = {
      category: '',
      location: '',
      company: company,
      search: ''
    }
    dispatch(filtersActions.updateFilterList(newFilters))
    dispatch(getInternshipsBySearch(newFilters))
    navigation.navigate('Internships')
  }

  const Company = ({ company, isMainPartner, index }) => {
    return (
      <TouchableOpacity
        style={isMainPartner ? styles.partnerCompanyWrapper : [styles.companyWrapper, index === companies.length - 1 ? { borderBottomWidth: 0 } : '']}
        key={index}
        onPress={() => handlePress(company)}
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
    )
  }
  const renderCompanies = () => {
    return (
      <>
        {companies.mainPartners?.map((company, index) => <Company company={company} isMainPartner={true} key={index} index={index} />)}
        {companies.partners?.map((company, index) => <Company company={company} isMainPartner={false} key={index} index={index} />)}
      </>
    )
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
              <View style={[styles.companiesWrapper, wrapperLoadingHeight()]}>
                {isLoading ?
                  <Loading />
                  :
                  renderCompanies()
                }

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
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary.cream
  },
  companyWrapper: {
    width: '50%',
    padding: 10,
    // TODO FIX THIS
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary.cream
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
