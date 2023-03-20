import React, { useState, useEffect } from 'react'
import { ScrollView, SafeAreaView, StyleSheet, View, Text, Image } from 'react-native'
import { useSelector } from 'react-redux';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { colors, font } from '../../../styles/globalStyle'
import FaIcon from 'react-native-vector-icons/FontAwesome5'
import * as Progress from 'react-native-progress';

export default function CVMain() {
  const styles = getStyles(useBottomTabBarHeight())
  const { data } = useSelector(state => state.profile)
  const [cvPercentage, setCvPercentage] = useState(0)

  useEffect(() => {
    if (data.complete_percentage) {
      if (data.complete_percentage === 100) {
        setCvPercentage(data.complete_percentage)
      } else {
        setCvPercentage(data.complete_percentage / 100)
      }
    } else {
    }
  }, [data])
  const AboutCategory = ({ category, categoryName }) => {
    return (
      <View style={categoryStyle.outerWrapper}>
        <View style={categoryStyle.innerWrapper}>
          <View style={styles.textWrap}>
            <Text style={[styles.infoText, styles.categoryText]}>{categoryName}:</Text>
          </View>
          <View style={categoryStyle.textListWrap}>
            {category?.map((item, index) => <Text key={index} style={styles.infoText}>{item}{category.length - 1 === index ? '' : ', '}</Text>)}
          </View>
        </View>
      </View>
    )
  }

  const EducationComponent = ({ data }) => {
    const EducationItem = ({ item }) => {
      return (
        <View style={styles.section}>
          <View style={categoryStyle.outerWrapper}>
            <View style={categoryStyle.innerWrapper}>
              <View style={{ flex: 2, alignItems: 'flex-start' }}>
                <Text style={styles.infoTextBold}>{item.start_year} - {item.end_year}</Text>
              </View>
              <View style={{ flex: 5 }}>
                <Text style={styles.infoTextBold}>{item.institution}</Text>
                <Text style={[styles.infoText, { fontSize: 16 }]}>Specialization in: {item.speciality}</Text>
              </View>
            </View>
          </View>
        </View>
      )
    }

    return (
      <View>
        <Text style={[styles.infoTextBold, styles.categoryText]}>EDUCATION</Text>
        {data.map((item, index) => <EducationItem item={item} key={index} />)}
      </View>
    )
  }
  const ExperienceComponent = ({ data }) => {
    const ExperienceItem = ({ item }) => {
      return (
        <View style={styles.section}>
          <View style={categoryStyle.outerWrapper}>
            <View style={categoryStyle.innerWrapper}>
              <View style={{ flex: 2, alignItems: 'center' }}>
                <Text style={styles.infoTextBold}>{item.period}</Text>
              </View>
              <View style={{ flex: 5, marginLeft: 10 }}>
                <Text style={styles.infoTextBold}>{item.position} @ {item.company}</Text>
                <Text style={styles.infoText}>{item.description}</Text>
              </View>
            </View>
          </View>
        </View>
      )
    }

    return (
      <View>
        <Text style={[styles.infoTextBold, styles.categoryText]}>EXPERIENCE</Text>
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
            <View style={{ flex: 5, marginLeft: 10 }}>
              <Text style={styles.infoTextBold}>{item.title}</Text>
              <Text style={styles.infoText}>{item.description}</Text>
            </View>
          </View>
        </View>
      )
    }
    return (
      <View>
        <Text style={[styles.infoTextBold, styles.categoryText]}>PROJECTS & EXTRACURRICULAR ACTIVITIES</Text>
        {data?.map((item, index) => <ExtraItem item={item} key={index} />)}
      </View>
    )
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.cvWrap}>
            <View style={styles.section}>
              <View flexDirection='row' justifyContent={'center'} style={{ marginBottom: 20 }}>
                <Text style={[styles.infoText, { fontSize: font.size.s, color: '#F26649' }]}>{data.top_percentage}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 10 }}>
                <Image source={{ uri: data.picture }} style={styles.avatar} />
                <View style={{ maxWidth: '70%' }}>
                  <Text style={styles.nameText}>{data.user?.first_name} {data.user?.last_name}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', width: '100%', flexWrap: 'wrap', justifyContent: 'center', paddingBottom: 10 }}>
                <Text style={styles.quotationMark}>“</Text>
                <Text style={[styles.infoText, { flex: 10, textAlign: 'center' }]}>{data?.about_me}</Text>
                <Text style={[styles.quotationMark, { alignSelf: 'flex-end' }]}>”</Text>
              </View>
              <View>
                <Text style={styles.infoText}>{data.faculty?.name}</Text>
                <Text style={styles.infoText}>{data.faculty?.university}</Text>
                <Text style={styles.infoText}>Last year grade: {data.faculty?.last_grade}</Text>

              </View>
            </View>
            <View style={styles.section}>
              {data.skills?.length ? <AboutCategory category={data.skills} categoryName="Skills" /> : ''}
              {data.hobbies?.length ?
                <View style={categoryStyle.outerWrapper}>
                  <View style={categoryStyle.innerWrapper}>
                    <View style={styles.textWrap}>
                      <Text style={[styles.infoText, styles.categoryText]}>Hobbies::</Text>
                    </View>
                    <View style={categoryStyle.textListWrap}>
                      <Text style={styles.infoText}>{data.hobbies} </Text>
                    </View>
                  </View>
                </View>
                :
                ''}
              {data.languages?.length ? <AboutCategory category={data.languages} categoryName="Languages" /> : ''}
              {data.prefered_courses?.length ?
                <View style={categoryStyle.outerWrapper}>
                  <View style={categoryStyle.innerWrapper}>
                    <View style={styles.textWrap}>
                      <Text style={[styles.infoText, styles.categoryText]}>Prefered classes:</Text>
                    </View>
                    <View style={categoryStyle.textListWrap}>
                      <Text style={styles.infoText}>{data.prefered_courses} </Text>
                    </View>
                  </View>
                </View>
                :
                ''
              }
            </View>
            {data.education?.length ? <EducationComponent data={data.education} /> : ''}
            {data.job_history?.length ? <ExperienceComponent data={data.job_history} /> : ''}
            {data.projects?.length ? <ExtraComponenet data={data.projects} /> : ''}
          </View>
          <View style={styles.infoWrap}>
            <View flexDirection={'row'} alignItems={'center'}>
              <Text style={[styles.infoText, { marginRight: 10 }]}>Completation status</Text>
              <Progress.Circle
                size={40}
                progress={cvPercentage}
                borderWidth={0}
                thickness={3}
                showsText={true}
                textStyle={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}
                color={'#F26649'}
              />
            </View>
            <Text style={[styles.infoText, { margin: 10 }]}>CV can be edited on our website</Text>

          </View>
        </View>
      </ScrollView >
    </SafeAreaView>
  )
}

const categoryStyle = StyleSheet.create({
  outerWrapper: {
    marginVertical: 10,
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
  textListWrap: {
    flex: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 10
  }
})

const getStyles = (bottomTabHeight) => StyleSheet.create({
  container: {
    marginHorizontal: 10,
    paddingBottom: Platform.OS === 'ios' ? 0 : bottomTabHeight + 10
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
    borderColor: '#F26649',
    backgroundColor: 'white'

  },
  nameText: {
    fontSize: font.size.l,
    color: 'white',
    marginBottom: 5,
    fontFamily: 'Basier Square Medium'
  },
  textWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    flex: 2
  },
  categoryText: {
    fontFamily: 'Basier Square Bold',
    color: colors.main.accent,
  },
  infoWrap: {
    marginTop: 20,
    marginBottom: Platform.OS === 'ios' ? bottomTabHeight : 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoTextBold: {
    color: 'white',
    fontSize: font.size.m,
    fontFamily: 'Basier Square Bold',
  },
  infoText: {
    color: 'white',
    fontSize: font.size.m,
    fontFamily: 'Basier Square Regular',
  },
  quotationMark: {
    color: colors.main.white,
    fontSize: font.size.xl,
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Basier Square Bold',
  }
})
