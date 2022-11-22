import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image, TouchableHighlight, Animated, Touchable } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Ionicon from 'react-native-vector-icons/Ionicons'

export default function ApplicationsMain({ navigation }) {
  const internships = [
    {
      company: 'Eau de Web',
      companyLogo: require('../../../assets/edw-logo.png'),
      categories: ['Front end'],
      city: 'Bucharest',
      title: 'Front end internship',
      jd: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed molestie urna. Nam porta bibendum ultrices. Duis eu varius purus. Nam rhoncus diam a diam vestibulum, rutrum aliquam neque rhoncus. Nullam arcu arcu, interdum vitae egestas eget, vestibulum sed mi. Sed eu sem arcu. Quisque at vulputate nisl, at tempor leo. Morbi eu felis quis nisl fringilla hendrerit. Donec malesuada ligula in augue vestibulum, in elementum mauris laoreet. Pellentesque dictum, lacus at scelerisque facilisis, lorem dui tincidunt mi, a tempor tellus velit sed erat. Integer vitae ante nisl. Sed quis augue iaculis, consectetur nisi vel, efficitur lorem. Sed in suscipit nisl, ut ultricies ipsum. Nunc sollicitudin ante id nibh placerat ullamcorper ut eu eros.',
    },

    {
      company: 'Eau de Web',
      companyLogo: require('../../../assets/edw-logo.png'),
      categories: ['Backend'],
      city: 'Bucharest',
      title: 'Backend internship',
      jd: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed molestie urna. Nam porta bibendum ultrices. Duis eu varius purus. Nam rhoncus diam a diam vestibulum, rutrum aliquam neque rhoncus. Nullam arcu arcu, interdum vitae egestas eget, vestibulum sed mi. Sed eu sem arcu. Quisque at vulputate nisl, at tempor leo. Morbi eu felis quis nisl fringilla hendrerit. Donec malesuada ligula in augue vestibulum, in elementum mauris laoreet. Pellentesque dictum, lacus at scelerisque facilisis, lorem dui tincidunt mi, a tempor tellus velit sed erat. Integer vitae ante nisl. Sed quis augue iaculis, consectetur nisi vel, efficitur lorem. Sed in suscipit nisl, ut ultricies ipsum. Nunc sollicitudin ante id nibh placerat ullamcorper ut eu eros.',

    },
    {
      company: 'IBM',
      companyLogo: require('../../../assets/IBM_logo.png'),
      categories: ['Front end'],
      city: 'Bucharest',
      title: 'Front end internship',
      jd: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed molestie urna. Nam porta bibendum ultrices. Duis eu varius purus. Nam rhoncus diam a diam vestibulum, rutrum aliquam neque rhoncus. Nullam arcu arcu, interdum vitae egestas eget, vestibulum sed mi. Sed eu sem arcu. Quisque at vulputate nisl, at tempor leo. Morbi eu felis quis nisl fringilla hendrerit. Donec malesuada ligula in augue vestibulum, in elementum mauris laoreet. Pellentesque dictum, lacus at scelerisque facilisis, lorem dui tincidunt mi, a tempor tellus velit sed erat. Integer vitae ante nisl. Sed quis augue iaculis, consectetur nisi vel, efficitur lorem. Sed in suscipit nisl, ut ultricies ipsum. Nunc sollicitudin ante id nibh placerat ullamcorper ut eu eros.',

    },
    {
      company: 'IBM',
      companyLogo: require('../../../assets/IBM_logo.png'),
      categories: ['Front end'],
      city: 'Bucharest',
      title: 'UX Internship',
      jd: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed molestie urna. Nam porta bibendum ultrices. Duis eu varius purus. Nam rhoncus diam a diam vestibulum, rutrum aliquam neque rhoncus. Nullam arcu arcu, interdum vitae egestas eget, vestibulum sed mi. Sed eu sem arcu. Quisque at vulputate nisl, at tempor leo. Morbi eu felis quis nisl fringilla hendrerit. Donec malesuada ligula in augue vestibulum, in elementum mauris laoreet. Pellentesque dictum, lacus at scelerisque facilisis, lorem dui tincidunt mi, a tempor tellus velit sed erat. Integer vitae ante nisl. Sed quis augue iaculis, consectetur nisi vel, efficitur lorem. Sed in suscipit nisl, ut ultricies ipsum. Nunc sollicitudin ante id nibh placerat ullamcorper ut eu eros.',
    },
    {
      company: 'Eau de Web',
      companyLogo: require('../../../assets/edw-logo.png'),
      categories: ['Front end'],
      city: 'Bucharest',
      title: 'Front end internship',
      jd: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed molestie urna. Nam porta bibendum ultrices. Duis eu varius purus. Nam rhoncus diam a diam vestibulum, rutrum aliquam neque rhoncus. Nullam arcu arcu, interdum vitae egestas eget, vestibulum sed mi. Sed eu sem arcu. Quisque at vulputate nisl, at tempor leo. Morbi eu felis quis nisl fringilla hendrerit. Donec malesuada ligula in augue vestibulum, in elementum mauris laoreet. Pellentesque dictum, lacus at scelerisque facilisis, lorem dui tincidunt mi, a tempor tellus velit sed erat. Integer vitae ante nisl. Sed quis augue iaculis, consectetur nisi vel, efficitur lorem. Sed in suscipit nisl, ut ultricies ipsum. Nunc sollicitudin ante id nibh placerat ullamcorper ut eu eros.',
    },

    {
      company: 'Eau de Web',
      companyLogo: require('../../../assets/edw-logo.png'),
      categories: ['Backend'],
      city: 'Bucharest',
      title: 'Backend internship',
      jd: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed molestie urna. Nam porta bibendum ultrices. Duis eu varius purus. Nam rhoncus diam a diam vestibulum, rutrum aliquam neque rhoncus. Nullam arcu arcu, interdum vitae egestas eget, vestibulum sed mi. Sed eu sem arcu. Quisque at vulputate nisl, at tempor leo. Morbi eu felis quis nisl fringilla hendrerit. Donec malesuada ligula in augue vestibulum, in elementum mauris laoreet. Pellentesque dictum, lacus at scelerisque facilisis, lorem dui tincidunt mi, a tempor tellus velit sed erat. Integer vitae ante nisl. Sed quis augue iaculis, consectetur nisi vel, efficitur lorem. Sed in suscipit nisl, ut ultricies ipsum. Nunc sollicitudin ante id nibh placerat ullamcorper ut eu eros.',

    },
    {
      company: 'IBM',
      companyLogo: require('../../../assets/IBM_logo.png'),
      categories: ['Front end'],
      city: 'Bucharest',
      title: 'Front end internship',
      jd: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed molestie urna. Nam porta bibendum ultrices. Duis eu varius purus. Nam rhoncus diam a diam vestibulum, rutrum aliquam neque rhoncus. Nullam arcu arcu, interdum vitae egestas eget, vestibulum sed mi. Sed eu sem arcu. Quisque at vulputate nisl, at tempor leo. Morbi eu felis quis nisl fringilla hendrerit. Donec malesuada ligula in augue vestibulum, in elementum mauris laoreet. Pellentesque dictum, lacus at scelerisque facilisis, lorem dui tincidunt mi, a tempor tellus velit sed erat. Integer vitae ante nisl. Sed quis augue iaculis, consectetur nisi vel, efficitur lorem. Sed in suscipit nisl, ut ultricies ipsum. Nunc sollicitudin ante id nibh placerat ullamcorper ut eu eros.',

    },
    {
      company: 'IBM',
      companyLogo: require('../../../assets/IBM_logo.png'),
      categories: ['Front end'],
      city: 'Bucharest',
      title: 'UX Internship',
      jd: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed molestie urna. Nam porta bibendum ultrices. Duis eu varius purus. Nam rhoncus diam a diam vestibulum, rutrum aliquam neque rhoncus. Nullam arcu arcu, interdum vitae egestas eget, vestibulum sed mi. Sed eu sem arcu. Quisque at vulputate nisl, at tempor leo. Morbi eu felis quis nisl fringilla hendrerit. Donec malesuada ligula in augue vestibulum, in elementum mauris laoreet. Pellentesque dictum, lacus at scelerisque facilisis, lorem dui tincidunt mi, a tempor tellus velit sed erat. Integer vitae ante nisl. Sed quis augue iaculis, consectetur nisi vel, efficitur lorem. Sed in suscipit nisl, ut ultricies ipsum. Nunc sollicitudin ante id nibh placerat ullamcorper ut eu eros.',
    }
  ]

  const renderLeftActions = (progress, dragX) => {
    return (
      <Animated.View style={[styles.swipeView, { marginLeft: 10 }]}>
        <View style={[styles.swipeButton, { backgroundColor: '#4CAF50' }]}>
          <Ionicon name="checkbox-outline" size={26} color="white" />
          <Text style={[styles.swipeButtonText]}>Accepted</Text>
        </View>
        <View style={[styles.swipeButton, { backgroundColor: '#F26649' }]}>
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

  const InternshipItem = ({ internship }) => {
    return (
      <Swipeable renderLeftActions={renderLeftActions} renderRightActions={renderRightActions}>
        <View style={styles.internshipWrapper}>
          <TouchableHighlight onPress={() => navigation.navigate('InternshipDetail', { test: 'Bine' })} >
            <View style={styles.innerWrapper}>
              <Image source={internship.companyLogo} style={styles.companyLogo} />
              <View>
                <Text style={styles.internshipTitle}>{internship.title}</Text>
                <Text style={styles.internshipCompany}>{internship.company}</Text>
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={{ flexDirection: 'row', marginBottom: 10 }}>
            <Text style={{ color: 'white' }}>Applied 2 weeks ago</Text>
          </TouchableHighlight>
        </View>
      </Swipeable >
    )
  }
  return (
    <ScrollView>
      {internships.map(internship => <InternshipItem internship={internship} />)}
    </ScrollView>
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
