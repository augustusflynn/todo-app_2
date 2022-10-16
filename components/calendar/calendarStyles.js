import { StyleSheet } from "react-native";
import { SCREEN_WIDTH } from '../../const'
export const styles = StyleSheet.create({
  tailDatetimeCalendar: {
    width: '100%',
    height: "auto",
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
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
    color: "#fff"
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
  }
})