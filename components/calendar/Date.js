import moment from 'moment';
import React from 'react'
import TodoApp from '../todoapp';
import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from './calendarStyles'

function Date({
  setDisplaySetting, displaySetting,
  currentDateObj, setCurrentDateObj,
  filter, setFilter
}) {
  const onPrev = () => {
    const newDate = moment(currentDateObj.subtract(1, 'day'))
    setCurrentDateObj(newDate)
    setFilter(prev => ({
      ...prev,
      startDate: newDate.startOf('date').toDate(),
      endDate: newDate.endOf('date').toDate()
    }))
  }

  const onNext = () => {
    const newDate = moment(currentDateObj.add(1, 'day'))
    setCurrentDateObj(newDate)
    setFilter(prev => ({
      ...prev,
      startDate: newDate.startOf('date').toDate(),
      endDate: newDate.endOf('date').toDate()
    }))
  }

  return (
    <>
      <View style={styles.tailDatetimeCalendar}>
        <View style={styles.calendarNavi}>
          <TouchableOpacity
            onPress={onPrev}
          >
            <Text
              style={[styles.calendarButton, styles.buttonPrev]}
            >‹</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setDisplaySetting(`M`)
              setFilter({
                limit: 20,
                skip: 0,
                filter: {},
                searchText: "",
                startDate: moment(currentDateObj).startOf('month').toDate(),
                endDate: moment(currentDateObj).endOf('month').toDate()
              })
            }}
          >
            <Text
              style={styles.calendarLabel}
            >Quay lại</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onNext}>
            <Text
              style={[styles.calendarButton, styles.buttonNext]}
            >›</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.calendarDetailDate}>
          <View>
            <Text style={styles.month}>
              {currentDateObj.format("MM/YYYY")}
            </Text>
          </View>
          <View>
            <Text style={styles.date}>
              {currentDateObj.get("D")}
            </Text>
          </View>
        </View>
      </View>


      <TodoApp
        currentDateObj={currentDateObj}
        filter={filter}
        setFilter={setFilter}
        displaySetting={displaySetting}
      />
    </>
  )
}

export default Date