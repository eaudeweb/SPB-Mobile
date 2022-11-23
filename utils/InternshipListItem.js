import { View, Text, StyleSheet, ScrollView, Image, TouchableHighlight, Animated, Touchable } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Ionicon from 'react-native-vector-icons/Ionicons'

export default function InternshipListItem({ navigation, internship, parentRoute }) {
  const newRoute = parentRoute === 'InternshipMain' ? 'InternshipDetail' : 'ApplicationDetail';
  const renderLeftActions = (progress, dragX) => {
    return (
      <Animated.View style={[styles.swipeView, { marginLeft: 10 }]}>
        <View style={[styles.swipeButton, { backgroundColor: '#4CAF50' }]}>
          <Ionicon name="checkbox-outline" size={26} color="white" />
          <Text style={[styles.swipeButtonText]}>Accepted</Text>
        </View>
        <View style={[styles.swipeButton, { backgroundColor: '#6C757D' }]}>
          <Ionicon name="mic-outline" size={26} color="white" />
          <Text style={styles.swipeButtonText}>Interview</Text>
        </View>
      </Animated.View>
    );
  };

  const renderRightActions = (progress, dragX) => {
    return (
      <Animated.View style={[styles.swipeView, { marginRight: 10 }]}>
        <View style={[styles.swipeButton, { backgroundColor: '#F44336' }]}>
          <Ionicon name="close-circle-outline" size={26} color="white" />
          <Text style={[styles.swipeButtonText]}>Cancel</Text>
        </View>
        <View style={[styles.swipeButton, { backgroundColor: '#2196F3' }]}>
          <Ionicon name="archive-outline" size={26} color="white" />
          <Text style={styles.swipeButtonText}>Archive</Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <Swipeable renderLeftActions={internship.swipeable ? renderLeftActions : null} renderRightActions={internship.swipeable ? renderRightActions : null}>
      <View style={styles.internshipWrapper}>
        <TouchableHighlight onPress={() => navigation.navigate(newRoute, { internship })} >
          <View style={styles.innerWrapper}>
            <Image source={internship.companyLogo} style={styles.companyLogo} />
            <View>
              <Text style={styles.internshipTitle}>{internship.title}</Text>
              <Text style={styles.internshipCompany}>{internship.company}</Text>
            </View>
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
    backgroundColor: '#212121'
  },
  innerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  companyLogo: {
    width: 75,
    height: 75,
    resizeMode: 'contain',
    marginRight: 20,
  },
  internshipTitle: {
    color: 'white',
    fontSize: 18
  },
  internshipCompany: {
    color: '#2991e3',
    fontSize: 16
  },
  swipeView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20
  },
  swipeButton: {
    width: 75,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  swipeButtonText: {
    color: 'white'
  }
})
