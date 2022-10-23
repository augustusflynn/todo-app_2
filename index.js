import { AppRegistry, SafeAreaView, TouchableOpacity, Text, Alert } from 'react-native';
import { name as appName } from './app.json';
import { CalendarMonth, CalendarDate } from "./components/calendar";
import moment from "moment";
import CommonStyles from './commonStyles';
import React, { useState } from 'react'

function App() {
  const [displaySetting, setDisplaySetting] = useState("M") // "M{date}" || "D{date}" 
  const [filter, setFilter] = React.useState({
    limit: 20,
    skip: 0,
    filter: {},
    searchText: "",
    startDate: moment().startOf('month').toDate(),
    endDate: moment().endOf('month').toDate()
  });
  const [currentDateObj, setCurrentDateObj] = useState(moment())

  const props = {
    filter: filter,
    setFilter: setFilter,
    setDisplaySetting: setDisplaySetting,
    displaySetting: displaySetting,
    currentDateObj: currentDateObj,
    setCurrentDateObj: setCurrentDateObj
  }

  return (
    <SafeAreaView style={CommonStyles.body}>
      {
        displaySetting.indexOf("M") > -1 ? (
          <CalendarMonth {...props} />
        ) : (
          <CalendarDate {...props} />
        )
      }
    </SafeAreaView>
  );
}

AppRegistry.registerComponent(appName, () => App);
