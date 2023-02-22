import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, View, Text, Image } from 'react-native'
import { useSelector } from 'react-redux';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

export default function CVMain() {
  const styles = getStyles(useBottomTabBarHeight())
  const { data } = useSelector(state => state.profile)


  const AboutCategory = ({ category, categoryName }) => {
    return (
      <View style={categoryStyle.outerWrapper}>
        <View style={categoryStyle.innerWrapper}>
          <View style={styles.textWrap}>
            <Text style={styles.infoText}>{categoryName}:</Text>
          </View>
          <View style={categoryStyle.textListWrap}>
            {category?.map((item, index) => <Text key={index} style={{ flexWrap: 'wrap', color: 'white', }}>{item}{category.length - 1 === index ? '' : ', '}</Text>)}
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
        <Text style={styles.infoTextBold}>EDUCATION</Text>
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
        <Text style={styles.infoTextBold}>PROJECTS & EXTRACURRICULAR ACTIVITIES</Text>
        {data?.map((item, index) => <ExtraItem item={item} key={index} />)}
      </View>
    )
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.cvWrap}>
          <View style={styles.section}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 10 }}>
              <Image source={{ uri: data?.picture }} style={styles.avatar} />
              <View  >
                <Text style={styles.nameText}>{data.user?.first_name} {data.user?.last_name}</Text>
                {/* <View flexDirection='row' alignItems='center'>
                  <Text style={[styles.infoText, { color: '#F26649' }]}>TOP 10%</Text>
                  <Ionicon name={'arrow-up-outline'} size={26} color={'#4CAF50'} />
                </View> */}
              </View>
              {/* <View>
                <Progress.Circle
                  size={40}
                  progress={0.5}
                  borderWidth={0}
                  thickness={4}
                  showsText={true}
                  textStyle={{ color: 'white', fontSize: 11, fontWeight: 'bold' }}
                  color={'#F26649'}
                />
              </View> */}
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
            {data.hobbies?.length ? <AboutCategory category={data.data.hobbies} categoryName="Hobbies" /> : ''}
            {data.languages?.length ? <AboutCategory category={data.languages} categoryName="Languages" /> : ''}
            {data.prefered_courses?.length ?
              <View style={categoryStyle.outerWrapper}>
                <View style={categoryStyle.innerWrapper}>
                  <View style={styles.textWrap}>
                    <Text style={styles.infoText}>Prefered classes:</Text>
                  </View>
                  <View style={categoryStyle.textListWrap}>
                    <Text style={{ color: 'white', }}>{data.prefered_courses} </Text>
                  </View>
                </View>
              </View>
              :
              ''}
          </View>
          {data.education?.length ? <EducationComponent data={data.education} /> : ''}
          {data.job_history?.length ? <ExperienceComponent data={data.job_history} /> : ''}
          {data.projects?.length ? <ExtraComponenet data={data.projects} /> : ''}
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
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 10
  }
})

const getStyles = (bottomTabHeight) => StyleSheet.create({
  container: {
    marginHorizontal: 10,
    paddingBottom: Platform.OS === 'ios' ? bottomTabHeight : bottomTabHeight + 10
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
