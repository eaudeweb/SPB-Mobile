import React from 'react'
import { useState } from 'react'
import { Alert, Modal, StyleSheet, Text, Pressable, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

export default function NotificationsModal(props) {
  const { modalVisible, setModalVisible } = props
  const [notificationValue, setNotificationValue] = useState(null)

  const options = [
    {
      key: 'daily',
      text: 'Daily'
    },
    {
      key: 'weekly',
      text: 'Weekly'
    },
    {
      key: 'never',
      text: 'Never'
    },
  ]

  const RadioButton = ({ options }) => {
    return (
      <View style={{ width: '100%', paddingHorizontal: 30 }}>
        {options?.map(option => {
          return (
            <TouchableOpacity key={option.key} style={radioStyle.container} onPress={() => setNotificationValue(option.key)}>
              <Text style={radioStyle.radioText}>{option.text}</Text>
              <View
                style={radioStyle.radioCircle}
              >
                {notificationValue === option.key && <View style={radioStyle.selectedRb} />}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    )
  }
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
              <Text style={[styles.textStyle, { paddingVertical: 15 }]}>Notifications</Text>
              <RadioButton options={options} />
              <View style={styles.saveButton}>
                <Text style={[styles.textStyle, { fontSize: 16 }]}>Save settings</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

const radioStyle = StyleSheet.create({
  container: {
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '700'
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#9e9e9e',
    alignItems: 'center',
    justifyContent: 'center',
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
