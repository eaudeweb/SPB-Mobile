import React from 'react'
import { StyleSheet, View, Text, Image, TouchableHighlight, ScrollView } from 'react-native'
import InternshipListItem from '../../utils/InternshipListItem'

export default function InternshipsAvailable({ navigation }) {
  const internships = [
    {
      company: 'Eau de Web',
      companyLogo: require('../../assets/edw-logo.png'),
      categories: ['Front end'],
      city: 'Bucharest',
      title: 'Front end internship',
      jd: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed molestie urna. Nam porta bibendum ultrices. Duis eu varius purus. Nam rhoncus diam a diam vestibulum, rutrum aliquam neque rhoncus. Nullam arcu arcu, interdum vitae egestas eget, vestibulum sed mi. Sed eu sem arcu. Quisque at vulputate nisl, at tempor leo. Morbi eu felis quis nisl fringilla hendrerit. Donec malesuada ligula in augue vestibulum, in elementum mauris laoreet. Pellentesque dictum, lacus at scelerisque facilisis, lorem dui tincidunt mi, a tempor tellus velit sed erat. Integer vitae ante nisl. Sed quis augue iaculis, consectetur nisi vel, efficitur lorem. Sed in suscipit nisl, ut ultricies ipsum. Nunc sollicitudin ante id nibh placerat ullamcorper ut eu eros.',
      applied: false,
      swipeable: false
    },
    {
      company: 'Eau de Web',
      companyLogo: require('../../assets/edw-logo.png'),
      categories: ['Backend'],
      city: 'Bucharest',
      title: 'Backend internship',
      jd: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed molestie urna. Nam porta bibendum ultrices. Duis eu varius purus. Nam rhoncus diam a diam vestibulum, rutrum aliquam neque rhoncus. Nullam arcu arcu, interdum vitae egestas eget, vestibulum sed mi. Sed eu sem arcu. Quisque at vulputate nisl, at tempor leo. Morbi eu felis quis nisl fringilla hendrerit. Donec malesuada ligula in augue vestibulum, in elementum mauris laoreet. Pellentesque dictum, lacus at scelerisque facilisis, lorem dui tincidunt mi, a tempor tellus velit sed erat. Integer vitae ante nisl. Sed quis augue iaculis, consectetur nisi vel, efficitur lorem. Sed in suscipit nisl, ut ultricies ipsum. Nunc sollicitudin ante id nibh placerat ullamcorper ut eu eros.',
      applied: false,
      swipeable: false

    },
    {
      company: 'IBM',
      companyLogo: require('../../assets/IBM_logo.png'),
      categories: ['Front end'],
      city: 'Bucharest',
      title: 'Front end internship',
      jd: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed molestie urna. Nam porta bibendum ultrices. Duis eu varius purus. Nam rhoncus diam a diam vestibulum, rutrum aliquam neque rhoncus. Nullam arcu arcu, interdum vitae egestas eget, vestibulum sed mi. Sed eu sem arcu. Quisque at vulputate nisl, at tempor leo. Morbi eu felis quis nisl fringilla hendrerit. Donec malesuada ligula in augue vestibulum, in elementum mauris laoreet. Pellentesque dictum, lacus at scelerisque facilisis, lorem dui tincidunt mi, a tempor tellus velit sed erat. Integer vitae ante nisl. Sed quis augue iaculis, consectetur nisi vel, efficitur lorem. Sed in suscipit nisl, ut ultricies ipsum. Nunc sollicitudin ante id nibh placerat ullamcorper ut eu eros.',
      applied: false,
      swipeable: false
    },
    {
      company: 'IBM',
      companyLogo: require('../../assets/IBM_logo.png'),
      categories: ['Front end'],
      city: 'Bucharest',
      title: 'UX Internship',
      jd: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed molestie urna. Nam porta bibendum ultrices. Duis eu varius purus. Nam rhoncus diam a diam vestibulum, rutrum aliquam neque rhoncus. Nullam arcu arcu, interdum vitae egestas eget, vestibulum sed mi. Sed eu sem arcu. Quisque at vulputate nisl, at tempor leo. Morbi eu felis quis nisl fringilla hendrerit. Donec malesuada ligula in augue vestibulum, in elementum mauris laoreet. Pellentesque dictum, lacus at scelerisque facilisis, lorem dui tincidunt mi, a tempor tellus velit sed erat. Integer vitae ante nisl. Sed quis augue iaculis, consectetur nisi vel, efficitur lorem. Sed in suscipit nisl, ut ultricies ipsum. Nunc sollicitudin ante id nibh placerat ullamcorper ut eu eros.',
      applied: false,
      swipeable: false
    },
    {
      company: 'Eau de Web',
      companyLogo: require('../../assets/edw-logo.png'),
      categories: ['Backend'],
      city: 'Bucharest',
      title: 'Backend internship',
      jd: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed molestie urna. Nam porta bibendum ultrices. Duis eu varius purus. Nam rhoncus diam a diam vestibulum, rutrum aliquam neque rhoncus. Nullam arcu arcu, interdum vitae egestas eget, vestibulum sed mi. Sed eu sem arcu. Quisque at vulputate nisl, at tempor leo. Morbi eu felis quis nisl fringilla hendrerit. Donec malesuada ligula in augue vestibulum, in elementum mauris laoreet. Pellentesque dictum, lacus at scelerisque facilisis, lorem dui tincidunt mi, a tempor tellus velit sed erat. Integer vitae ante nisl. Sed quis augue iaculis, consectetur nisi vel, efficitur lorem. Sed in suscipit nisl, ut ultricies ipsum. Nunc sollicitudin ante id nibh placerat ullamcorper ut eu eros.',
      applied: false,
      swipeable: false
    },
  ]

  return (
    <ScrollView>
      {internships.map(internship => <InternshipListItem navigation={navigation} internship={internship} />)}
    </ScrollView>
  )
}
