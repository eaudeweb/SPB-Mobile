import React, { useEffect } from 'react'
import { useState } from 'react'
import { StyleSheet, Pressable, TouchableWithoutFeedback, View, Text, TextInput, TouchableHighlight, TouchableOpacity, Modal } from 'react-native'

export default function SettingsMain() {
  const [notificationsActive, setNotificationsActive] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)

  const notificationOptions = [
    {
      key: true,
      text: 'On'
    },
    {
      key: false,
      text: 'Off'
    }
  ]
  const RadioButton = ({ options }) => {
    const handleRadioPress = (option) => {
      setNotificationsActive(option.key)
      if (!option.key) {
        setModalVisible(true)
      }
    }
    return (
      <View style={{ width: '100%' }}>
        {options?.map(option => {
          return (
            <TouchableOpacity key={option.key} style={radioStyle.container} onPress={() => handleRadioPress(option)}>
              <View
                style={radioStyle.radioCircle}
              >
                {notificationsActive === option.key && <View style={radioStyle.selectedRb} />}
              </View>
              <Text style={radioStyle.radioText}>{option.text}</Text>

            </TouchableOpacity>
          );
        })}
      </View>
    )
  }
  const ExitModal = () => {
    const exitOptions = [
      {
        key: 'true',
        text: 'I got an internship'
      },
      {
        key: 'no',
        text: 'No'
      }
    ]

    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <Pressable style={styles.centeredView} onPress={() => setModalVisible(false)}>
            <TouchableWithoutFeedback>
              <View style={styles.modalView}>
                <Text style={[styles.textStyle, { paddingVertical: 15 }]}>Can you tell us why?</Text>
                <RadioButton options={exitOptions} />
                <View style={styles.saveButton}>
                  <Text style={[styles.textStyle, { fontSize: 16 }]}>Save settings</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Pressable>
        </Modal>
      </View>
    )
  }

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
        <TouchableHighlight style={styles.button} onPress={() => alert(modalVisible)}>
          <Text style={styles.labelText}>Change password</Text>
        </TouchableHighlight>
      </View>
      <View>
        <Text style={styles.headerText}>Notifications</Text>
        <RadioButton options={notificationOptions} />
      </View>
      <ExitModal />
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

const radioStyle = StyleSheet.create({
  container: {
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  radioText: {
    fontSize: 20,
    color: 'white',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#9e9e9e',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20
  },
  selectedRb: {
    width: 15,
    height: 15,
    borderRadius: 50,
    backgroundColor: '#F26649',
  },
  result: {
    marginTop: 20,
    color: 'white',
    fontWeight: '600',
    backgroundColor: '#F3FBFE',
  },
});
