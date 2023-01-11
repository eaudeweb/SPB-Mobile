import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Animated } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useSelector, useDispatch } from 'react-redux';
import { completeSwipeableDemo } from '../features/animations/animationsSlice';
import { colors, font, spacing } from '../styles/globalStyle';
import FaIcon from 'react-native-vector-icons/FontAwesome5'

export default function InternshipListItem({ navigation, internship, parentRoute, swipeable, index }) {
  const dispatch = useDispatch()
  const { animations } = useSelector(state => state)
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

  const renderLeftActions = () => {
    return (
      <Animated.View style={[styles.swipeView, { marginLeft: 10 }]}>
        <TouchableHighlight onPress={() => alert("Accepted")}>
          <View style={[styles.swipeButton, { backgroundColor: colors.buttonBackground.green }]}>
            <FaIcon name="calendar-check" size={26} color={colors.indicators.green} />
            <Text style={[styles.swipeButtonText]}>Accepted</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => alert("Interview")}>
          <View style={[styles.swipeButton, { backgroundColor: colors.buttonBackground.yellow }]}>
            <FaIcon name="clipboard" size={26} color={colors.indicators.orange} />
            <Text style={styles.swipeButtonText}>Interview</Text>
          </View>
        </TouchableHighlight>
      </Animated.View>
    );
  };

  const renderRightActions = () => {
    return (
      <Animated.View style={[styles.swipeView, { marginRight: 10 }]}>
        <TouchableHighlight onPress={() => alert('Cancel')}>
          <View style={[styles.swipeButton, { backgroundColor: colors.buttonBackground.red }]}>
            <FaIcon name="trash-alt" size={26} color={colors.indicators.red} />
            <Text style={[styles.swipeButtonText]}>Cancel</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => alert('Achive')}>
          <View style={[styles.swipeButton, { backgroundColor: colors.buttonBackground.blue }]}>
            <FaIcon name="archive" size={26} color={colors.indicators.blue} />
            <Text style={styles.swipeButtonText}>Archive</Text>
          </View>
        </TouchableHighlight>
      </Animated.View>
    );
  };

  return (
    <Swipeable
      ref={swipeRef}
      friction={2}
      renderLeftActions={swipeable ? renderLeftActions : null}
      renderRightActions={swipeable ? renderRightActions : null}
    >
      <View style={styles.internshipWrapper}>
        <TouchableHighlight onPress={() => navigation.navigate(newRoute, { internship })} >
          <View style={styles.innerWrapper}>
            <Text style={styles.internshipTitle}>{internship.title}</Text>
            <View style={styles.detailsWrapper}>
              <PaymentInformation is_paid={internship.is_paid} payment={internship.payment} />
              <Text style={styles.detailsText}>{internship.start_date}</Text>
              <Text style={styles.detailsText}>{internship.office_location.toUpperCase()}</Text>
            </View>
            <View>
              <Text style={styles.aplicantsLow}>APLICANTS: LOW</Text>
              {/* <Text style={styles.aplicantsFair}>APLICANTS: FAIR</Text>
              <Text style={styles.aplicantsHigh}>APLICANTS: HIGH</Text> */}
            </View>
            <Text style={styles.internshipCompany}>{internship.company.name}</Text>
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
  },
  innerWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 15

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
  aplicantsLow: {
    fontWeight: font.fontWeight.bold,
    color: colors.indicators.green,
  },
  aplicantsFair: {
    fontWeight: font.fontWeight.bold,
    color: colors.indicators.orange,
  },
  aplicantsHigh: {
    fontWeight: font.fontWeight.bold,
    color: colors.indicators.red,
  },
  swipeView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
  },
  swipeButton: {
    width: 60,
    margin: 5,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 10

  },
  swipeButtonText: {
    color: colors.secondary.lightGrey,
    marginTop: 5
  },
  swipeIcon: {
    blue: {
      color: colors.indicators.blue
    },
    red: {
      color: colors.indicators.red
    },

  }
})
