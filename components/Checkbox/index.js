import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Checkbox({
  style,
  isChecked,
  setIsChecked,
  title
}) {
  return (
    <TouchableOpacity style={[style, styles.checkBoxWrapper]} onPress={setIsChecked}>
      <View style={styles.box} />
      {
        isChecked && (
          <View style={styles.checkIco}>
            <Text>✓</Text>
          </View>
        )
      }
      <Text>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  checkBoxWrapper: {
    position: 'relative'
  },
  box: {
    position: 'absolute',
    width: 20,
    height: 20
  },
  checkIco: {
    position: 'absolute',
    fontSize: 20,
    color: '#cd283c'
  }
});