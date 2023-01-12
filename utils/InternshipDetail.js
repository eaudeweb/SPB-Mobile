import React from 'react'
import { StyleSheet, Image, View, Text, TouchableHighlight } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { internshipsActions } from '../features/internships/internshipsSlice'
import { useDispatch } from 'react-redux'

export default function InternshipDetail({ route, navigation }) {
  const { internship } = route.params
  const { applyToInternship } = internshipsActions
  const dispatch = useDispatch()
  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableHighlight
          style={{ backgroundColor: 'red', padding: 10, marginTop: 50 }}
          onPress={() => dispatch(applyToInternship(internship))}
        >
          <Text>Apply to job</Text>
        </TouchableHighlight>
        <Ionicon name="chevron-back" size={26} color="#F26649" onPress={() => navigation.goBack()} />
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
          <Image source={internship.company.logo} style={styles.companyLogo} />
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.internshipTitle}>{internship.title}</Text>
              <Ionicon name="send" size={26} color="#F26649" onPress={() => alert('Shared!')} />
            </View>
            <Text style={styles.internshipCompany}>{internship.company.name}</Text>
          </View>
        </View>
        {internship.applied ?
          <View>
            <Text style={{ color: 'white', marginBottom: 10 }}>Applied two 2 weeks ago</Text>
          </View>
          :
          ''
        }
        <View>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>Job description:</Text>
          <Text style={styles.jobDescription}>
            {internship.description}
          </Text>
        </View>
      </View >
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    flex: 1
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
  jobDescription: {
    color: 'white',
    lineHeight: 16,
    fontSize: 16
  }
})
