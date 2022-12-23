import React from 'react'
import { SafeAreaView, StyleSheet, View, Text, StatusBar, ScrollView, TouchableOpacity, Image, Platform } from 'react-native'
import SvgLogo from '../assets/SvgLogo'
import LoopText from 'react-native-loop-text'
import { colors, font, spacing } from "../styles/globalStyle"
import { Dimensions } from 'react-native'

export default function CompaniesScreen({ navigation }) {
  const companies = [
    {
      name: 'Bitdefender',
      logo: 'https://stagiipebune.ro/media/cache/5d/a6/5da6b1cb48dc35bddd5d92d55812473c.png',
      mainPartner: true,
      notifications: 1
    },
    {
      name: 'Eau de Web',
      logo: 'https://stagiipebune.ro/media/cache/79/9b/799b16bb7b473aff55253544c84b2565.png',
      mainPartner: false,
      notifications: 0
    },
    {
      name: 'Deutsche Bank',
      logo: 'https://stagiipebune.ro/media/cache/bf/81/bf81c3539d702e1cf4c90d49a79098e4.png',
      mainPartner: false,
      notifications: 6
    },
    {
      name: 'Bearing Point',
      logo: 'https://stagiipebune.ro/media/cache/4f/f5/4ff53f12a023aee13ea96ae98ef007a0.png',
      mainPartner: false,
      notifications: '9+'
    },
    {
      name: 'CrowdStrike',
      logo: 'https://stagiipebune.ro/media/cache/26/66/266664be79cb74909c63d51669044b1b.png',
      mainPartner: false,
      notifications: false
    },
    {
      name: 'Eau de Web',
      logo: 'https://stagiipebune.ro/media/cache/79/9b/799b16bb7b473aff55253544c84b2565.png',
      mainPartner: false,
      notifications: 0
    },
    {
      name: 'Deutsche Bank',
      logo: 'https://stagiipebune.ro/media/cache/bf/81/bf81c3539d702e1cf4c90d49a79098e4.png',
      mainPartner: false,
      notifications: 6
    },
    {
      name: 'Bearing Point',
      logo: 'https://stagiipebune.ro/media/cache/4f/f5/4ff53f12a023aee13ea96ae98ef007a0.png',
      mainPartner: false,
      notifications: '9+'
    },
    {
      name: 'CrowdStrike',
      logo: 'https://stagiipebune.ro/media/cache/26/66/266664be79cb74909c63d51669044b1b.png',
      mainPartner: false,
      notifications: false
    },
    {
      name: 'Eau de Web',
      logo: 'https://stagiipebune.ro/media/cache/79/9b/799b16bb7b473aff55253544c84b2565.png',
      mainPartner: false,
      notifications: 0
    },
    {
      name: 'Deutsche Bank',
      logo: 'https://stagiipebune.ro/media/cache/bf/81/bf81c3539d702e1cf4c90d49a79098e4.png',
      mainPartner: false,
      notifications: 6
    }
  ]
  const jumbotronTextArr = [
    <Text style={styles.infoTextDescription}><Text style={styles.infoTextNumber}>15+ </Text>COMPANIES</Text>,
    <Text style={styles.infoTextDescription}><Text style={styles.infoTextNumber}>35+ </Text>INTERNSHIPS</Text>,
    <Text style={styles.infoTextDescription}><Text style={styles.infoTextNumber}>20+ </Text>WEBINARS`</Text>
  ]

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
                <LoopText textArray={jumbotronTextArr} duration={1500} delay={200} />
              </View>
              <View style={styles.companiesWrapper}>
                {companies.map((company, index) => (
                  <TouchableOpacity
                    style={company.mainPartner ? styles.partnerCompanyWrapper : styles.companyWrapper}
                    key={index}
                    onPress={() => alert(company.name)}
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
