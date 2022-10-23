import { StyleSheet } from "react-native";
import { SCREEN_WIDTH } from '../../const'
export const styles = StyleSheet.create({
  tailDatetimeCalendar: {
    width: '100%',
    height: "auto",
    backgroundColor: "#ffffff"
  },
  calendarNavi: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 6,
    backgroundColor: "#cd283c"
  },
  selectTime: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    minWidth: 150,
    color: "#fff"
  },
  calendarButton: {
    fontSize: 30,
    fontWeight: '600',
    color: "#fff",
    paddingHorizontal: 16
  },
  calendarLabel: {
    fontSize: 20,
    fontWeight: '600',
    color: "#fff"
  },
  calendarDate: {
    margin: 0,
    padding: 0
  },
  calendarDay: {
    width: '100%',
    margin: 0,
    padding: 0
  },
  tbody: {
    paddingTop: 8
  },
  tr: {
    display: 'flex',
    flexDirection: 'row'
  },
  th: {
    color: "#ffffff",
    width: (SCREEN_WIDTH - 24) / 7,
    height: 35,
    padding: 0,
    fontSize: 12,
    textAlign: "center",
    lineHeight: 35,
    backgroundColor: "#223344",

  },
  td: {
    color: "#ffffff",
    width: (SCREEN_WIDTH - 24) / 7,
    height: (SCREEN_WIDTH - 24) / 7,
    padding: 0,
    fontSize: 12,
    textAlign: "center",
    lineHeight: 35,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  today: {
    color: "#3296c8",
    borderWidth: 1,
    borderColor: "#3296c8",
    borderRadius: 5,
    padding: 12
  },
  nextDate: {
    fontWeight: '700'
  },
  prevDate: {
    opacity: 0.5
  },
  task: {
    color: "#cd283c",
    borderWidth: 1,
    borderColor: "#cd283c",
    borderRadius: 5,
    padding: 12
  },
  taskDoneAll: {
    borderWidth: 1,
    borderColor: "#5eba7d",
    borderRadius: 5,
    padding: 12
  },
  selectYear: {
    textAlign: 'center',
    width: '100%',
    paddingTop: 8
  },
  yearListWrapper: {
    justifyContent: 'center'
  },
  yearText: {
    fontSize: 18,
    fontWeight: '600'
  },
  selectMonth: {
    minWidth: 75
  },
  calendarDetailDate: {
  },
  month: {
    fontSize: 21,
    fontWeight: "600",
    lineHeight: 30,
    textAlign: 'center'
  },
  date: {
    fontSize: 66,
    fontWeight: "bold",
    lineHeight: 100,
    textAlign: 'center'
  },
  time: {
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 28
  }
})