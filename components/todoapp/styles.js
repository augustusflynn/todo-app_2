import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  todoApp: {
    marginTop: 12
  },
  todoAppTitle: {
    fontSize: 24,
    lineHeight: 30,
    color: "#fff",
    textAlign: "center"
  },
  search: {
    marginVertical: 12
  },
  statusWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  empty: {
    marginTop: 12
  },
  emptyText: {
    textAlign: "center",
    fontSize: 21,
    color: "red"
  },
  todoAppForm: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: "space-between"
  },
  todoAppBtnCreate: {
    backgroundColor: "#cd283c",
    marginLeft: 8,
    paddingHorizontal: 24,
    display: 'flex',
    justifyContent: 'center'
  },
  todoAppBtnCreateText: {
    color: "#fff",
    textAlign: "center"
  },
  createTaskInput: {
    flex: 1
  },
  taskList: {
    marginTop: 12
  },
  task: {
    display: 'flex',
    flexDirection: "row"
  },
  todoLabel: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%"
  },
  taskAction: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8
  }
});