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
      <View style={[styles.box, { borderColor: isChecked ? "#cd283c" : "#fff" }]} />
      {
        isChecked && (
          <View style={styles.checkIco}>
            <Text style={styles.checkIcoText}>✓</Text>
          </View>
        )
      }
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  checkBoxWrapper: {
    position: 'relative',
    display: "flex",
    flexDirection: 'row',
    alignItems: 'center'
  },
  box: {
    width: 20,
    height: 20,
    borderWidth: 1,
    marginRight: 6
  },
  checkIco: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
  },
  checkIcoText: {
    fontSize: 15,
    color: '#cd283c'
  },
  title: {
    color: "#fff",
    fontSize: 20
  }
});