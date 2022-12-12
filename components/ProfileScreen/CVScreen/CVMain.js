import React from 'react'
import { ScrollView, StyleSheet, View, Text, Image } from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'
import * as Progress from 'react-native-progress';

export default function CVMain() {
  const AboutCategory = ({ category, categoryName }) => {
    return (
      <View style={categoryStyle.outerWrapper}>
        <View style={categoryStyle.innerWrapper}>
          <View style={styles.textWrap}>
            {category?.length ?
              <Ionicon name={'checkmark-circle-outline'} style={categoryStyle.checkMarkIcon} />
              :
              <Ionicon name={'close-circle-outline'} style={categoryStyle.closeIcon} />
            }
            <Text style={styles.infoText}>{categoryName}:</Text>
          </View>
          <View style={categoryStyle.textListWrap}>
            {category?.map((item, index) => <Text key={index} style={categoryStyle.testListItem}> {item}</Text>)}
          </View>
        </View>
      </View>
    )
  }

  const EducationComponent = ({ data }) => {
    const EducationItem = ({ item }) => {
      return (
        <View style={categoryStyle.outerWrapper}>
          <View style={categoryStyle.innerWrapper}>
            <View style={{ flex: 2, alignItems: 'center' }}>
              <Text style={styles.infoTextBold}>{item.startYear} - {item.gradulationYear}</Text>
            </View>
            <View style={{ flex: 3 }}>
              <Text style={styles.infoTextBold}>{item.institution}</Text>
              <Text style={styles.infoText}>Specialization: {item.specialization}</Text>
            </View>
          </View>
        </View>
      )
    }

    return (
      <View>
        <Text style={styles.infoTextBold}>EDUCATION</Text>
        {data?.map((item, index) => <EducationItem item={item} key={index} />)}
      </View>
    )
  }
  const ExperienceComponent = ({ data }) => {
    const ExperienceItem = ({ item }) => {
      return (
        <View style={categoryStyle.outerWrapper}>
          <View style={categoryStyle.innerWrapper}>
            <View style={{ flex: 2, alignItems: 'center' }}>
              <Text style={styles.infoTextBold}>{item.period}</Text>
            </View>
            <View style={{ flex: 3 }}>
              <Text style={styles.infoTextBold}>{item.position} @ {item.company}</Text>
              <Text style={styles.infoText}>{item.description}</Text>
            </View>
          </View>
        </View>
      )
    }

    return (
      <View>
        <Text style={styles.infoTextBold}>EXPERIENCE</Text>
        {data?.map((item, index) => <ExperienceItem item={item} key={index} />)}
      </View>
    )
  }
  const ExtraComponenet = ({ data }) => {
    const ExtraItem = ({ item }) => {
      return (
        <View style={categoryStyle.outerWrapper}>
          <View style={categoryStyle.innerWrapper}>
            <View style={{ flex: 2, alignItems: 'center' }}>
              <Text style={styles.infoTextBold}>{item.period}</Text>
            </View>
            <View style={{ flex: 3 }}>
              <Text style={styles.infoTextBold}>{item.title}</Text>
              <Text style={styles.infoText}>{item.description}</Text>
            </View>
          </View>
        </View>
      )
    }
    return (
      <View>
        <Text style={styles.infoTextBold}>PROJECTS & EXTRACURRICULAR ACTIVITIES</Text>
        {data?.map((item, index) => <ExtraItem item={item} key={index} />)}
      </View>
    )
  }
  const profile = {
    name: 'Gabriel Hazi',
    phoneNumber: '0761234567',
    email: 'hazigabriel@edw.ro',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8-7P2nXb6mo36Iq2N9W6ebtmvUaHOZ_VnkQ&usqp=CAU',
    about: {
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Aenean gravida pulvinar risus, ultrices iaculis mi faucibus eu.',
      skills: ['React', 'React-Native', 'Git', 'Googling stuff'],
      languages: ['English'],
      hobbies: ['Cycling', 'Cooking'],
      prefferedClasses: []
    },
    education: [
      {
        institution: 'EDW University',
        specialization: 'Faculty of ReactJs',
        startYear: '2022',
        gradulationYear: '2022'
      },
      {
        institution: 'EDW University',
        specialization: 'Faculty of React Native',
        startYear: '2022',
        gradulationYear: '2022'
      },
    ],
    experience: [
      {
        period: '2022',
        position: 'Frontend developer',
        company: 'Eau de Web',
        description: 'Really cool stuff'
      }
    ],
    extras: [
      {
        period: '2022-',
        title: 'Falling off the bike enthusist',
        description: 'Fell off the bike after encountering a piece of road left on the pavement, 10/10 would not repeat'
      },
    ]
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.cvWrap}>
          <View style={styles.section}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <Image source={{ uri: profile.avatar }} style={styles.avatar} />
              <View>
                <Text style={styles.nameText}>{profile.name}</Text>
                <View flexDirection='row' alignItems='center'>
                  <Text style={[styles.infoText, { color: '#F26649' }]}>TOP 10%</Text>
                  <Ionicon name={'arrow-up-outline'} size={26} color={'#4CAF50'} />
                </View>
              </View>
              <View>
                <Progress.Circle
                  size={40}
                  progress={0.99}
                  borderWidth={0}
                  thickness={4}
                  showsText={true}
                  textStyle={{ color: 'white', fontSize: 11, fontWeight: 'bold' }}
                  color={'#F26649'}
                />
              </View>
            </View>
            <View style={{ flexDirection: 'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center', paddingBottom: 10 }}>
              <Text style={styles.quotationMark}>“</Text>
              <Text style={[styles.infoText, { flex: 10, textAlign: 'center' }]}>{profile.about.description}</Text>
              <Text style={[styles.quotationMark, { alignSelf: 'flex-end' }]}>”</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicon name={'call-outline'} size={26} color={'#0871D9'} />
                <Text style={[styles.infoText, { color: '#0871D9', marginHorizontal: 5 }]}>{profile.phoneNumber}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicon name={'mail-outline'} size={26} color={'#0871D9'} />
                <Text style={[styles.infoText, { color: '#0871D9', marginHorizontal: 5 }]}>{profile.email}</Text>
              </View>
            </View>
          </View>
          <View style={styles.section}>
            <AboutCategory category={profile.about.skills} categoryName="Skills" />
            <AboutCategory category={profile.about.hobbies} categoryName="Hobbies:" />
            <AboutCategory category={profile.about.languages} categoryName="Languages" />
            <AboutCategory category={profile.about.prefferedClasses} categoryName="Favorite Classes" />
          </View>
          <View style={styles.section}>
            <EducationComponent data={profile.education} />
          </View>
          <View style={styles.section}>
            <ExperienceComponent data={profile.experience} />
          </View>
          <View style={styles.section}>
            <ExtraComponenet data={profile.extras} />
          </View>
        </View>
        <View style={styles.infoWrap}>
          <Text style={styles.infoText}>CV can be edited on our website</Text>
        </View>
      </View>
    </ScrollView >
  )
}

const categoryStyle = StyleSheet.create({
  outerWrapper: {
    marginVertical: 10
  },
  innerWrapper: {
    flexDirection: 'row',
  },
  checkMarkIcon: {
    fontSize: 26,
    color: '#4CAF50'
  },
  closeIcon: {
    fontSize: 26,
    color: '#F44336'
  },
})

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    paddingVertical: 10
  },
  cvWrap: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#424242",
    padding: 10
  },
  section: {
    borderBottomColor: '#323232',
    borderBottomWidth: 2,
    paddingBottom: 10,
    marginBottom: 10
  },
  avatar: {
    height: 100,
    width: 100,
    resizeMode: 'cover',
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#F26649'

  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5
  },
  textWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  infoWrap: {
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoTextBold: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  infoText: {
    color: 'white',
    fontSize: 16,
  },
  quotationMark: {
    color: '#cccccc',
    fontSize: 30,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  }
})
