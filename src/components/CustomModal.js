import { Pressable, ScrollView, StyleSheet, Text, View, Modal, TouchableHighlight, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'

const CustomModal = ({ options, handleOptionPress, selectedValue }) => {
  const [modalVisible, setModalVisible] = useState(false);


  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };


  const handleBackdropPress = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableHighlight style={styles.selectedValue} onPress={toggleModal}>
        <Text style={styles.selectedValueText}>{selectedValue}</Text>
      </TouchableHighlight>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleModal}
      >
        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <View style={styles.modalBackdrop}>
            <View style={styles.modalContainer}>
              {options?.map((option, index) => {
                return (
                  <TouchableHighlight key={index} style={styles.option} onPress={() => {
                    handleOptionPress(option)
                    toggleModal()
                  }}>
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableHighlight>
                )
              })}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  )
}

export default CustomModal

const styles = StyleSheet.create({
  selectedValue: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  selectedValueText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    position: "absolute",
    top: "35%",
    width: "80%",
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 10,
  },
  option: {
    padding: 10,
  },
  optionText: {
    fontSize: 16,
  },
})