import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, View, Text, TouchableHighlight, TouchableOpacity, ActivityIndicator } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Ionicon from 'react-native-vector-icons/Ionicons'
import {
  applyToInternship,
  getStudentInternships,
  withdrawFromInternship,
  resetApplicationStatus,
  updateLocalInternshipApplied,
  updateLocalInternshipWithdrew,
  updateLocalApplicationsApplied,
  updateLocalApplicationsWithdrew
} from '../features/internships/internshipsSlice'
import { useSelector, useDispatch } from 'react-redux';
import { colors, font } from '../styles/globalStyle'
import reactStringReplace from 'react-string-replace';
import Toast from 'react-native-toast-message';
import onShare from '../utils/shareFunction'
import moment from 'moment'
import FaIcon from 'react-native-vector-icons/FontAwesome5'
import Markdown from 'react-native-markdown-display';

export default function InternshipDetail({ route, navigation }) {
  const { application } = useSelector(state => state.internships)
  const [internship, setInternship] = useState(route.params.internship)
  const dispatch = useDispatch()
  const base_url = 'https://stagiipebune.ro'
  const [currentView, setCurrentView] = useState('description')
  const handleBarTouch = (view) => view === 'description' ? setCurrentView('description') : setCurrentView('about')

  const handleApplyPress = () => {
    const payload = {
      companyId: internship.company.id,
      jobId: internship.id
    }
    // dispatch(updateLocalInternshipApplied(internship))
    // dispatch(getStudentInternships())

    dispatch(applyToInternship(payload))
  }
  const handleWithdrawPress = () => {
    const payload = {
      companyId: internship.company.id,
      jobId: internship.id
    }
    // dispatch(updateLocalInternshipWithdrew(internship))
    dispatch(withdrawFromInternship(payload))
  }
  useEffect(() => {

  }, [])
  useEffect(() => {
    if (application.isApplySuccess) {
      Toast.show({
        type: 'success',
        text1: 'Applied successfully',
      });

      setInternship({ ...internship, applied: new Date().toString() })
      dispatch(updateLocalInternshipApplied(internship))
      dispatch(updateLocalApplicationsApplied(internship))
    }
    if (application.isWithdrawSuccess) {
      Toast.show({
        type: 'error',
        text1: 'Withdrew successfully',
      });
      setInternship({ ...internship, applied: '' })
      dispatch(updateLocalInternshipWithdrew(internship))
      dispatch(updateLocalApplicationsWithdrew(internship))
    }
    if (application.isError) {
      Toast.show({
        type: 'error',
        text1: 'Could not perform action',
      });
    }
    dispatch(resetApplicationStatus())

  }, [application])
  const canWithdraw = () => {
    const currentUnix = moment(new Date()).valueOf()
    const applicationTime = moment(internship.applied).valueOf()
    const result = moment(currentUnix - applicationTime).valueOf()
    if (result >= 86400000) {
      return false
    } else {
      return true
    }
  }

  const PaymentInformation = ({ is_paid, payment }) => {
    let text = ''
    if (is_paid && payment.length > 0) {
      text = "PAID: " + payment
    } else if (is_paid) {
      text = "PAID"
    } else {
      text = "UNPAID"
    }
    return (
      <View flexDirection={'row'} marginVertical={5}>
        <FaIcon name={'wallet'} style={[styles.icon, { color: colors.secondary.lightGrey }]} />
        <Text style={[styles.jobDescription, { color: colors.secondary.lightGrey, marginHorizontal: 5 }]}>{text}</Text>
      </View>)
  }

  return (
    <View style={styles.container}>
      <View marginBottom={10}>
        <TouchableHighlight style={styles.backButtonWrapper} onPress={() => navigation.goBack()}>
          <Ionicon name="chevron-back" size={26} style={styles.backButton} />
        </TouchableHighlight>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
          <View style={styles.companyLogoWrapper}>
            <Image source={{ uri: internship.company.logo }} style={styles.companyLogo} />
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.internshipTitle}>{internship.title}</Text>
            </View>
          </View>
        </View>
        {internship.applied ?
          <Text style={[styles.jobDescription, { color: colors.secondary.lightGrey, marginBottom: 10 }]}>Applied {moment(internship.applied).fromNow()}</Text>
          :
          ''
        }
        {internship.office_location ?
          <View flexDirection={'row'} marginVertical={5}>
            <FaIcon name={'building'} style={[styles.icon, { color: colors.secondary.lightGrey }]} />
            <Text style={[styles.jobDescription, { color: colors.secondary.lightGrey, marginHorizontal: 5 }]}>{internship.office_location?.toUpperCase()}</Text>
          </View>
          :
          ''
        }

        {/* {internship.is_paid ?
          <PaymentInformation is_paid={internship.is_paid} payment={internship.payment} />
          :
          ''
        } */}

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
              <View>
                <Markdown style={markdownStyle} >
                  {internship.description}
                </Markdown>

              </View>
              :
              <View>

                <Markdown style={markdownStyle} >
                  {internship.company.description}
                </Markdown>
              </View>
          }
        </View>
      </ScrollView>
      <View style={styles.bottomButtonsWrapper}>
        <View width={'60%'}>
          {
            internship.applied.length === 0 ?
              <TouchableHighlight style={styles.bottomButton} onPress={handleApplyPress} disabled={application.isLoading}>
                <View>
                  {application.isLoading ?
                    <ActivityIndicator size="small" color={colors.main.cappuccino} />
                    :
                    <Text style={styles.bottomButtonText}>Apply</Text>
                  }
                </View>
              </TouchableHighlight>
              :
              canWithdraw() ?
                <TouchableHighlight style={styles.bottomButton} onPress={handleWithdrawPress} disabled={application.isLoading}>
                  <View>
                    {application.isLoading ?
                      <ActivityIndicator size="small" color={colors.main.accent} />
                      :
                      <Text style={[styles.bottomButtonText, { color: colors.main.cappuccino }]}>Withdraw</Text>
                    }
                  </View>
                </TouchableHighlight>
                :
                ''
          }
        </View>
        {internship.url ?
          <View width={'30%'}>
            <TouchableHighlight style={styles.bottomButton} onPress={() => onShare(base_url + internship.url)}>
              <View flexDirection={'row'} alignItems={'center'}>
                <Text style={[styles.bottomButtonText, { marginRight: 10, color: colors.secondary.lightGrey }]}>Share</Text>
                <Ionicon name="send" size={16} color={colors.secondary.lightGrey} />
              </View>
            </TouchableHighlight>
          </View>
          :
          ''
        }

      </View >
      <Toast />
    </View >
  )
}

const markdownStyle = StyleSheet.create({
  paragraph: {
    color: colors.main.white,
    fontSize: font.size.m,
    fontFamily: 'Basier Square Regular'
  },
  bullet_list: {
    color: colors.main.white,
    fontSize: font.size.m,
  },
  strong: {
    color: colors.main.accent,
    fontSize: font.size.m,
    fontFamily: 'Basier Square Bold',
  },
  heading1: {
    color: colors.main.accent,
    fontSize: font.size.l,
    fontFamily: 'Basier Square Medium'
  },
  heading2: {
    color: colors.main.accent,
    fontFamily: 'Basier Square Medium'
  },
  heading3: {
    color: colors.main.accent,
    fontFamily: 'Basier Square Medium',

  }
})
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    height: '100%'
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
    alignSelf: 'flex-start',
  },
  backButton: {
    color: colors.main.accent,
    padding: 5,
  },
  internshipTitle: {
    color: 'white',
    fontSize: font.size.l,
    fontFamily: 'Basier Square Medium'

  },
  jobDescription: {
    color: 'white',
    lineHeight: font.size.m + 1,
    fontSize: font.size.m,
    fontFamily: 'Basier Square Regular'
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
    fontFamily: 'Basier Square Medium'
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
    fontFamily: 'Basier Square Bold'
  },
  bottomButtonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    backgroundColor: 'transparent'

  },
  bottomButton: {
    backgroundColor: colors.secondary.mediumGrey,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    marginVertical: 5,
  },
  bottomButtonText: {
    color: colors.main.accent,
    fontSize: font.size.m,
    fontFamily: 'Basier Square Medium',
    textAlign: 'center',
  }
})
