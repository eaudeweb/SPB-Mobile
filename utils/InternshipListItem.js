import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, TouchableOpacity, Animated } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useSelector, useDispatch } from 'react-redux';
import { completeSwipeableDemo } from '../features/animations/animationsSlice';
import { internshipsActions } from '../features/internships/internshipsSlice'
import { colors, font, spacing } from '../styles/globalStyle';
import FaIcon from 'react-native-vector-icons/FontAwesome5'

export default function InternshipListItem({ navigation, internship, parentRoute, swipeable, index }) {
  const dispatch = useDispatch()
  const { animations } = useSelector(state => state)
  const { toggleAcceptedStatus, toggleInterviewStatus } = internshipsActions

  const newRoute = parentRoute === 'InternshipMain' ? 'InternshipDetail' : 'ApplicationDetail';
  const swipeRef = React.useRef()

  const PaymentInformation = ({ is_paid, payment }) => {
    let text = ''

    if (is_paid && payment.length > 0) {
      text = "PAID: " + payment + " EUR"
    } else if (is_paid) {
      text = "PAID"
    } else {
      text = "UNPAID"
    }
    return (
      <Text style={styles.detailsText}>{text}</Text>
    )
  }

  if (parentRoute === 'ApplicationsList' && index == 0) {
    if (!animations.swipeableDemo) {
      //animation that runs once, after component is loaded, to indicate that the item is horizonatally swipeable
      setTimeout((() => {
        swipeRef?.current?.openLeft()
        setTimeout(swipeRef?.current?.close, 500)
      }), 250)
      dispatch(completeSwipeableDemo())
    }
  }

  const renderLeftActions = (internship) => {
    const handleAccepted = () => {
      dispatch(toggleAcceptedStatus(internship))
      swipeRef?.current?.close()
    }
    const handleInterview = () => {
      dispatch(toggleInterviewStatus(internship))
      swipeRef?.current?.close()
    }

    return (
      <Animated.View style={[styles.swipeView, { marginLeft: 10 }]}>
        <TouchableOpacity onPress={handleAccepted}>
          <View style={[styles.swipeButton, { backgroundColor: colors.buttonBackground.green }]}>
            <FaIcon name="calendar-check" size={26} color={colors.indicators.green} />
            <Text style={[styles.swipeButtonText]}>Accepted</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleInterview}>
          <View style={[styles.swipeButton, { backgroundColor: colors.buttonBackground.yellow }]}>
            <FaIcon name="microphone" size={26} color={colors.indicators.orange} />
            <Text style={styles.swipeButtonText}>Interview</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderRightActions = () => {
    return (
      <Animated.View style={[styles.swipeView, { marginRight: 10 }]}>
        <TouchableOpacity onPress={() => alert('Cancel')}>
          <View style={[styles.swipeButton, { backgroundColor: colors.buttonBackground.red }]}>
            <FaIcon name="trash-alt" size={26} color={colors.indicators.red} />
            <Text style={[styles.swipeButtonText]}>Cancel</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('Achive')}>
          <View style={[styles.swipeButton, { backgroundColor: colors.buttonBackground.blue }]}>
            <FaIcon name="archive" size={26} color={colors.indicators.blue} />
            <Text style={styles.swipeButtonText}>Archive</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };
  const getInternshipStatusBorder = (internship) => {
    if (internship.acceptedStatus) {
      return { borderColor: styles.statusColor.green }
    } else if (internship.interviewStatus) {
      return { borderColor: styles.statusColor.yellow }

    }
  }
  const borderColor = getInternshipStatusBorder(internship)

  return (
    <Swipeable
      ref={swipeRef}
      friction={2}
      renderLeftActions={swipeable ? () => renderLeftActions(internship) : null}
      renderRightActions={swipeable ? renderRightActions : null}
    >
      <View style={[styles.internshipWrapper, borderColor]}>
        <TouchableHighlight onPress={() => navigation.navigate(newRoute, { internship })} >
          <View style={styles.innerWrapper}>
            <Text style={styles.internshipTitle}>{internship.title}</Text>
            <View style={styles.detailsWrapper}>
              <PaymentInformation is_paid={internship.is_paid} payment={internship.payment} />
              <Text style={styles.detailsText}>{internship.start_date}</Text>
              <Text style={styles.detailsText}>{internship.office_location.toUpperCase()}</Text>
            </View>
            {
              !swipeable ?
                <View>
                  <Text style={styles.applicantsLow}>APPLICANTS: LOW</Text>
                  {/* <Text style={styles.applicantsFair}>APPLICANTS: FAIR</Text>
              <Text style={styles.applicantsHigh}>APPLICANTS: HIGH</Text> */}
                </View>
                :
                ''
            }
            <Text style={styles.internshipCompany}>{internship.company.name}</Text>

            {
              !internship.acceptedStatus && !internship.interviewStatus && swipeable ?
                <View style={styles.statusTextWrapper}>
                  <FaIcon name="clipboard" size={16} color={colors.secondary.lightGrey} />
                  <Text style={styles.statusText}>Applied</Text>
                </View>
                :
                ''
            }
            {
              internship.acceptedStatus ?
                <View style={styles.statusTextWrapper}>
                  <FaIcon name="thumbs-up" size={16} color={colors.indicators.green} />
                  <Text style={[styles.statusText, styles.applicantsLow]}>Accepted</Text>
                </View>
                :
                ''
            }
            {
              internship.interviewStatus ?
                <View style={styles.statusTextWrapper}>
                  <FaIcon name="microphone" size={16} color={colors.indicators.orange} />
                  <Text style={[styles.statusText, styles.applicantsFair]}>Interview</Text>
                </View>
                :
                ''
            }
          </View>

        </TouchableHighlight>
        {internship.applied ?
          <TouchableHighlight style={{ flexDirection: 'row', marginBottom: 10 }}>
            <Text style={{ color: 'white' }}>Applied 2 weeks ago</Text>
          </TouchableHighlight>
          :
          ''
        }
      </View>
    </Swipeable >
  )
}

const styles = StyleSheet.create({
  internshipWrapper: {
    margin: 10,
    backgroundColor: colors.secondary.darkGrey,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.secondary.darkGrey,
  },
  innerWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  internshipTitle: {
    color: colors.main.white,
    fontSize: font.size.l
  },
  internshipCompany: {
    color: '#2991e3',
    fontSize: 16
  },
  detailsWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  detailsText: {
    color: colors.secondary.lightGrey,
    marginRight: 5
  },
  applicantsLow: {
    fontWeight: font.fontWeight.bold,
    color: colors.indicators.green,
  },
  applicantsFair: {
    fontWeight: font.fontWeight.bold,
    color: colors.indicators.orange,
  },
  applicantsHigh: {
    fontWeight: font.fontWeight.bold,
    color: colors.indicators.red,
  },
  swipeView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
  },
  swipeButton: {
    width: 70,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  swipeButtonText: {
    color: colors.secondary.lightGrey,
    marginTop: 5
  },
  statusTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  statusText: {
    fontSize: font.size.m,
    color: colors.secondary.lightGrey,
    marginLeft: 10
  },
  statusColor: {
    green: colors.indicators.green,
    yellow: colors.indicators.orange,
  },
  swipeIcon: {
    blue: {
      color: colors.indicators.blue
    },
    red: {
      color: colors.indicators.red
    }
  }
})
