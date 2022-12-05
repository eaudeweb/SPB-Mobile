import React from 'react'
import { useState } from 'react'
import { Pressable, TouchableWithoutFeedback, View, Text, TextInput, TouchableHighlight, Modal, Animated } from 'react-native'
import { FeedbackRadioInput } from './RadioInputs'

export default function FeedbackModal(props) {
  const { modalVisible, setModalVisible, notificationsValue, setNotificationsActive, styles } = props
  const [feedbackProvided, setFeedbackProvided] = useState(true)
  const handleSave = () => {
    setModalVisible(false)
  }
  const handleCancel = () => {
    setNotificationsActive(true)
    setModalVisible(false)
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
        <Pressable style={styles.centeredView} onPress={handleCancel}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <Text style={[styles.textStyle, { paddingVertical: 15 }]}>Can you tell us why?</Text>
              <FeedbackRadioInput feedbackProvided={feedbackProvided} setFeedbackProvided={setFeedbackProvided} />
              {feedbackProvided ?
                <View style={{ marginHorizontal: 5 }}>
                  <TextInput
                    style={styles.inputContainer}
                    placeholder={'Company name'}
                    placeholderTextColor='white'
                  />
                  <Text style={[styles.labelText, { color: '#F26649', fontSize: 12 }]}>By telling us this we announce the other companies you've applied to that you are not available for an interview.</Text>
                </View>
                :
                ''
              }
              <TouchableHighlight style={styles.saveButton} onPress={handleSave}>
                <Text style={[styles.textStyle, { fontSize: 16 }]}>Save settings</Text>
              </TouchableHighlight>
            </View>
          </TouchableWithoutFeedback>
        </Pressable>
      </Modal>
    </View>
  )
}
