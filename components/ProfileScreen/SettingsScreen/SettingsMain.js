import React from 'react'
import { useState } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableHighlight } from 'react-native'
import FeedbackModal from './FeedbackModal'
import { NotificationsRadioInput } from './RadioInputs'

export default function SettingsMain() {
  const [notificationsActive, setNotificationsActive] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Contact details</Text>
      <View>
        <View>
          <Text style={styles.labelText}>First name</Text>
          <TextInput
            style={styles.inputContainer}
            placeholder={'Gabriel'}
            placeholderTextColor='white'
          />
        </View>
        <View>
          <Text style={styles.labelText}>Last name</Text>
          <TextInput
            style={styles.inputContainer}
            placeholder={'Hazi'}
            placeholderTextColor='white'
          />
        </View>
        <View>
          <Text style={styles.labelText}>Phone number</Text>
          <TextInput
            style={styles.inputContainer}
            placeholder={'076123456'}
            placeholderTextColor='white'
          />
        </View>
        <View>
          <Text style={styles.labelText}>Email</Text>
          <TextInput
            style={styles.inputContainer}
            placeholder={'hazigabriel@edw.ro'}
            placeholderTextColor='white'
          />
        </View>
      </View>
      <View>
        <TouchableHighlight style={styles.button}>
          <Text style={styles.labelText}>Change password</Text>
        </TouchableHighlight>
      </View>
      <View>
        <Text style={styles.headerText}>Notifications</Text>
        <NotificationsRadioInput setModalVisible={setModalVisible} notificationsActive={notificationsActive} setNotificationsActive={setNotificationsActive} />
      </View>
      <FeedbackModal modalVisible={modalVisible} setModalVisible={setModalVisible} notificationsActive={notificationsActive} setNotificationsActive={setNotificationsActive} styles={styles} />
    </View >

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginBottom: 20
  },
  headerText: {
    fontSize: 22,
    color: 'white',
    marginVertical: 15
  },
  labelText: {
    color: 'white',
    fontSize: 16,
    marginVertical: 5
  },
  inputContainer: {
    borderWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#757575',
    borderRadius: 5,
    backgroundColor: '#424242',
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16
  },
  button: {
    backgroundColor: '#4D565D',
    paddingHorizontal: 10,
    paddingVertical: 7,
    alignSelf: 'flex-start',
    borderWidth: 2,
    borderColor: '#30363b',
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 10
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "#424242",
    borderRadius: 10,
    width: '90%',
    alignItems: "center",
    paddingVertical: 16
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 5
  }
})
